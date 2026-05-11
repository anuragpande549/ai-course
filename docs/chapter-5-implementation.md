# Chapter 5: Implementation

---

## 5.1 Source Code

This chapter presents the key source code segments of AI Course Generator, organised by module. The complete codebase is available in the project repository.

---

### 5.1.1 Database Configuration — Neon + Drizzle ORM (`configs/db.jsx`)

```javascript
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle({ client: sql });
```

**Explanation:** The `db` object is a Drizzle ORM instance connected to Neon's serverless PostgreSQL driver via the `DATABASE_URL` environment variable. This single export is shared across all API routes for type-safe database queries.

---

### 5.1.2 Database Schema Definition (`configs/schema.js`)

```javascript
import { pgTable, serial, varchar, json, boolean, integer } from "drizzle-orm/pg-core";

// Table 1: Course List
export const courseList = pgTable("course_list", {
  id: serial("id").primaryKey(),
  courseId: varchar("course_id").notNull().unique(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level").notNull(),
  courseOutput: json("course_output").notNull(),
  createdBy: varchar("created_by").notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
});

// Table 2: Course Chapters
export const courseChapters = pgTable("course_chapters", {
  id: serial("id").primaryKey(),
  courseId: varchar("course_id").notNull(),
  chapterId: integer("chapter_id").notNull(),
  chapterName: varchar("chapter_name").notNull(),
  content: json("content").notNull(),
  videoId: varchar("video_id").notNull(),
});
```

**Explanation:** Drizzle ORM's type-safe schema definition eliminates the need for raw SQL in migrations. The `json` column type allows flexible storage of AI-generated structured content without requiring additional schema migrations as the AI output format evolves.

---

### 5.1.3 Google Gemini AI Model Configuration (`configs/AiModel.js`)

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
});

export const GenerateCourseLayout_AI = model;
export const GenerateChapterContent_AI = model;
```

**Explanation:** A single model instance (`gemini-2.5-flash-lite`) is instantiated and exported under two semantic aliases. The `gemini-2.5-flash-lite` model is selected for its optimal balance of generation speed, instruction-following accuracy, and cost efficiency.

---

### 5.1.4 Course Layout Generation API (`app/api/generate-layout/route.js`)

```javascript
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { courseList } from '@/configs/schema';
import { v4 as uuidv4 } from 'uuid';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';

export async function POST(request) {
    try {
        const body = await request.json();
        const { topic, description, difficulty, category, level, createdBy } = body;

        const prompt = `
            You are an expert course creator. Generate a comprehensive course layout based on:
            - Topic: ${topic}
            - Description: ${description}
            - Difficulty Level: ${difficulty || level}

            Output the result STRICTLY as a raw JSON object matching this schema:
            {
                "courseName": "String",
                "description": "String",
                "chapters": [
                    {
                        "chapterName": "String",
                        "about": "String",
                        "duration": "String (e.g., '2 Hours')"
                    }
                ]
            }
        `;

        const result = await GenerateCourseLayout_AI.generateContent(prompt);
        let responseText = result.response.text();
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const courseLayoutJson = JSON.parse(responseText);

        const newCourseId = uuidv4();

        await db.insert(courseList).values({
            courseId: newCourseId,
            name: courseLayoutJson.courseName,
            category: category || "General",
            level: difficulty || level,
            courseOutput: courseLayoutJson,
            createdBy: createdBy || "unknown_user",
            isPublished: false
        });

        return NextResponse.json({
            success: true,
            courseId: newCourseId,
            layout: courseLayoutJson
        });

    } catch (error) {
        console.error("Phase 1 API Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate layout" },
            { status: 500 }
        );
    }
}
```

---

### 5.1.5 Chapter Content Generation API with Retry Logic (`app/api/generate-chapter/route.js`)

```javascript
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { courseChapters } from '@/configs/schema';
import { GenerateChapterContent_AI } from '@/configs/AiModel';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function searchYouTube(query) {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    if (!YOUTUBE_API_KEY) return null;

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`;
    try {
        const res = await fetch(searchUrl);
        const data = await res.json();
        return data.items?.[0]?.id?.videoId || null;
    } catch (error) {
        console.error("YouTube fetch error:", error);
        return null;
    }
}

export async function POST(request) {
    try {
        const { courseId, courseName, chapterName, about, chapterIndex } = await request.json();

        const prompt = `
            You are an expert educator. Write detailed content for chapter "${chapterName}" about "${about}".
            This is part of course "${courseName}".
            
            Output STRICTLY as raw JSON matching this schema:
            {
                "title": "String",
                "detailedExplanation": "String (multi-paragraph markdown)",
                "codeExamples": [
                    { "language": "String", "code": "String" }
                ]
            }
        `;

        let responseText = "";
        let retries = 3;

        while (retries > 0) {
            try {
                const result = await GenerateChapterContent_AI.generateContent(prompt);
                responseText = result.response.text();
                break;
            } catch (aiError) {
                if (aiError?.status === 429 || aiError?.message?.includes("429")) {
                    retries -= 1;
                    if (retries === 0) throw new Error("Max retries reached for Gemini API");
                    await sleep(15000);
                } else {
                    throw aiError;
                }
            }
        }

        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const chapterContentJson = JSON.parse(responseText);

        const searchQuery = `${courseName} ${chapterName} tutorial in hindi english`;
        const videoId = await searchYouTube(searchQuery);

        await db.insert(courseChapters).values({
            courseId: courseId,
            chapterId: chapterIndex,
            chapterName: chapterName,
            content: chapterContentJson,
            videoId: videoId || ""
        });

        return NextResponse.json({ success: true, message: `Chapter ${chapterIndex} generated!` });

    } catch (error) {
        console.error("Chapter Generation Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to generate chapter" },
            { status: 500 }
        );
    }
}
```

---

### 5.1.6 Course Player Component (`app/course/[courseId]/CoursePlayer.jsx`)

```jsx
'use client'
import React, { useState } from 'react'
import { PlayCircle, Menu, X, ArrowLeft, BookOpen, Code } from 'lucide-react'
import Link from 'next/link'

export default function CoursePlayer({ course, chapters }) {
    const [activeChapter, setActiveChapter] = useState(chapters[0]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const layout = course.courseOutput;

    return (
        <div className='flex flex-col h-screen bg-white'>
            {/* Top Navbar */}
            <div className='h-14 bg-slate-900 text-white flex items-center justify-between px-4'>
                <div className='flex items-center gap-4'>
                    <Link href="/dashboard"><ArrowLeft className='w-5 h-5' /></Link>
                    <h1 className='font-bold text-sm md:text-base truncate'>{course.name}</h1>
                </div>
            </div>

            <div className='flex flex-1 overflow-hidden'>
                {/* Left: Video & Content */}
                <div className='flex-1 overflow-y-auto'>
                    <div className='w-full bg-black aspect-video'>
                        {activeChapter.videoId && (
                            <iframe
                                width="100%" height="100%"
                                src={`https://www.youtube.com/embed/${activeChapter.videoId}?autoplay=1`}
                                allowFullScreen
                            />
                        )}
                    </div>
                    <div className='max-w-4xl mx-auto p-6'>
                        <h2 className='text-2xl font-bold mb-6'>{activeChapter.chapterName}</h2>
                        <p className='text-slate-700 leading-relaxed whitespace-pre-line'>
                            {activeChapter.content.detailedExplanation}
                        </p>
                        {activeChapter.content.codeExamples?.map((ex, i) => (
                            <div key={i} className='mb-6 rounded-lg overflow-hidden border'>
                                <div className='bg-slate-800 text-slate-300 text-xs px-4 py-2 font-mono'>
                                    {ex.language}
                                </div>
                                <pre className='bg-slate-50 p-4 overflow-x-auto text-sm'>
                                    <code>{ex.code}</code>
                                </pre>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Chapter Sidebar */}
                <div className='w-80 bg-white border-l flex flex-col'>
                    <div className='p-4 font-bold border-b bg-slate-50'>Course Content</div>
                    <div className='overflow-y-auto flex-1'>
                        {chapters.map((chap, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveChapter(chap)}
                                className={`w-full text-left p-4 border-b flex items-start gap-3 hover:bg-slate-50
                                    ${activeChapter.chapterId === chap.chapterId ? 'bg-indigo-50' : ''}`}
                            >
                                <PlayCircle className='w-5 h-5 text-indigo-600 mt-1' />
                                <div>
                                    <h4 className='text-sm font-medium'>{idx + 1}. {chap.chapterName}</h4>
                                    <p className='text-xs text-slate-500'>{layout.chapters[idx]?.duration || '10 min'}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
```

---

## 5.2 Integration of Modules / Files

The following table describes how the major modules interact within the application:

### Table 5.1 — Module-to-File Mapping

| Module | File(s) | Depends On | Exposes |
|--------|---------|-----------|---------|
| **AI Model** | `configs/AiModel.js` | `@google/generative-ai`, `.env` | `GenerateCourseLayout_AI`, `GenerateChapterContent_AI` |
| **Database** | `configs/db.jsx`, `configs/schema.js` | `drizzle-orm`, `@neondatabase/serverless`, `.env` | `db`, `courseList`, `courseChapters` |
| **Layout API** | `app/api/generate-layout/route.js` | `AiModel.js`, `db.jsx`, `schema.js`, `uuid` | `POST /api/generate-layout` |
| **Chapter API** | `app/api/generate-chapter/route.js` | `AiModel.js`, `db.jsx`, `schema.js`, YouTube API | `POST /api/generate-chapter` |
| **Course API** | `app/api/course/route.js` | `db.jsx`, `schema.js` | `GET /api/course?courseId=...` |
| **User Courses API** | `app/api/user-courses/route.js` | `db.jsx`, `schema.js` | `GET /api/user-courses?createdBy=...` |
| **Update Layout API** | `app/api/update-layout/route.js` | `db.jsx`, `schema.js` | `PATCH /api/update-layout` |
| **Delete Course API** | `app/api/delete-course/route.js` | `db.jsx`, `schema.js` | `DELETE /api/delete-course?courseId=...` |
| **Create Course Page** | `app/dashboard/create-course/page.jsx` | `CourseContext`, `/api/generate-layout` | Multi-step wizard UI |
| **Course Player Page** | `app/course/[courseId]/page.jsx` | `/api/course`, `CoursePlayer.jsx` | Rendered course player |
| **Dashboard** | `app/dashboard/_components/Dashboard.jsx` | `/api/user-courses`, Clerk | User's course library view |
| **Authentication** | `app/(auth)/sign-in`, `app/(auth)/sign-up` | Clerk SDK | Login / registration pages |
| **Landing Page** | `app/page.tsx`, `app/_components/*.jsx` | Framer Motion, Lucide React | Marketing landing page |

### Table 5.2 — API Response: `/api/generate-layout`

| Field | Type | Example Value |
|-------|------|--------------|
| `success` | Boolean | `true` |
| `courseId` | String (UUID) | `"a1b2c3d4-..."` |
| `layout.courseName` | String | `"Python for Beginners"` |
| `layout.description` | String | `"A complete introduction to Python..."` |
| `layout.chapters[]` | Array | `[{ chapterName, about, duration }]` |

### Table 5.3 — API Response: `/api/generate-chapter`

| Field | Type | Example Value |
|-------|------|--------------|
| `success` | Boolean | `true` |
| `message` | String | `"Chapter 0 generated!"` |

---

## 5.3 Screenshots / Reports / Dataset Details

> **[EDITABLE]** Replace the figure captions below with actual screenshots captured from the running application. Use tools like the browser's screenshot feature or Lightshot.

---

### Figure 5.1 — Landing Page (Hero Section)

> *[Insert screenshot of the landing page hero section showing the headline, sub-headline, CTA button, and animated background.]*

---

### Figure 5.4 — Sign-In Page (Clerk)

> *[Insert screenshot of the Clerk-rendered sign-in page with email and OAuth options.]*

---

### Figure 5.5 — User Dashboard (My Courses)

> *[Insert screenshot of the dashboard showing a grid of course cards with name, category, level, and publish status.]*

---

### Figure 5.6 — Create Course Wizard — Step 1

> *[Insert screenshot of Step 1 form showing the Topic and Description input fields with the stepper indicator active.]*

---

### Figure 5.7 — Create Course Wizard — Step 2

> *[Insert screenshot of Step 2 Options form showing difficulty, category, and level selection.]*

---

### Figure 5.8 — AI-Generated Course Layout Preview

> *[Insert screenshot showing the generated course layout with chapter list, names, and durations displayed before chapter generation begins.]*

---

### Figure 5.9 — Course Player — Video and AI Notes

> *[Insert screenshot of the course player showing the YouTube video in the top half and AI-generated chapter explanation text below.]*

---

### Figure 5.10 — Course Player — Chapter Sidebar

> *[Insert screenshot of the course player chapter sidebar showing all chapters, the currently active chapter highlighted, and progress checkboxes.]*

---

### Figure 5.11 — Course Player — Code Examples Block

> *[Insert screenshot showing a code example block with the language label bar and syntax-highlighted code inside the player.]*

---

### Figure 5.12 — Mobile Responsive View

> *[Insert screenshot of the course player on a mobile device (375px width) showing the collapsed sidebar toggle behaviour.]*

---

### AI Output Sample — Course Layout

The following is a representative sample of the AI-generated course layout JSON for a topic of "Machine Learning with Python":

```json
{
  "courseName": "Machine Learning with Python: From Zero to Hero",
  "description": "A comprehensive course covering the fundamentals of machine learning using Python, from data preparation to model deployment.",
  "chapters": [
    {
      "chapterName": "Introduction to Machine Learning",
      "about": "Overview of ML types, key terminology, and real-world applications",
      "duration": "1.5 Hours"
    },
    {
      "chapterName": "Python for Data Science",
      "about": "NumPy, Pandas, and Matplotlib essentials for data manipulation and visualisation",
      "duration": "2 Hours"
    },
    {
      "chapterName": "Supervised Learning Algorithms",
      "about": "Linear Regression, Logistic Regression, Decision Trees, and SVMs",
      "duration": "3 Hours"
    }
  ]
}
```

---

> **[EDITABLE]** Replace placeholder screenshot captions with actual screenshots of the deployed or locally running application. All screenshots should be at a minimum resolution of 1280×800 for print quality.
