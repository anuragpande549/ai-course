# 🎓 AI Course Generator

> An intelligent, AI-powered course generation platform that creates complete, structured online courses — including syllabi, chapter content, and supplementary YouTube resources — from a simple topic input.
>
> Built with **Next.js 16**, **Google Gemini AI**, **Neon (PostgreSQL)**, **Drizzle ORM**, **Clerk Auth**, and **Tailwind CSS v4**.

---

## 📌 Project Overview

**AI Course Generator** is a full-stack web application developed as a Final Year Project. The platform empowers students, educators, and lifelong learners to generate professional-grade online courses on any topic in minutes — without any pedagogical expertise. Users simply enter a topic and configure difficulty settings; the system autonomously produces a structured course layout, detailed chapter content, and relevant video resources using large-language-model (LLM) technology and the YouTube Data API.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Course Layout Generation** | Generates a full course syllabus with chapters, summaries, and estimated durations using Gemini AI |
| 📖 **AI Chapter Content Generation** | Produces detailed explanations, markdown-formatted notes, and runnable code examples per chapter |
| 🎬 **YouTube Video Integration** | Automatically fetches the most relevant YouTube tutorial for each chapter |
| 🔐 **Clerk Authentication** | Secure sign-up / sign-in with social login via Clerk |
| 📊 **User Dashboard** | Manage all created courses, track publish status, and access course analytics |
| 🚀 **Publish / Unpublish Courses** | Control course visibility with a single toggle |
| 📱 **Responsive Course Player** | Interactive player with chapter sidebar, embedded video, notes, and code blocks |
| 🎨 **Landing Page** | Hero, Features, How It Works, Testimonials, and Pricing sections |
| 🔄 **Retry Logic** | Automatic rate-limit retry (exponential backoff) for Gemini API calls |
| 🗄️ **Persistent Storage** | PostgreSQL via Neon with Drizzle ORM for type-safe queries |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript / JavaScript (JSX) |
| **AI Model** | Google Gemini 2.5 Flash Lite (`@google/generative-ai`) |
| **Authentication** | Clerk (`@clerk/nextjs`) |
| **Database** | Neon PostgreSQL (serverless) |
| **ORM** | Drizzle ORM |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | Radix UI, Lucide React, React Icons |
| **Animations** | Framer Motion |
| **Video API** | YouTube Data API v3 |
| **Package Manager** | pnpm |
| **Deployment** | Vercel (recommended) |

---

## 📁 Project Structure

```
ai-course/
├── app/
│   ├── (auth)/                    # Clerk auth pages (sign-in, sign-up)
│   ├── _components/               # Shared UI components (Hero, Header, Footer, etc.)
│   ├── _context/                  # React Context (CourseContext)
│   ├── api/
│   │   ├── generate-layout/       # POST: AI course syllabus generation
│   │   ├── generate-chapter/      # POST: AI chapter content + YouTube lookup
│   │   ├── course/                # GET: Fetch course & chapters by ID
│   │   ├── user-courses/          # GET: Fetch all courses for a user
│   │   ├── update-layout/         # PATCH: Update published status
│   │   └── delete-course/         # DELETE: Remove course from DB
│   ├── course/[courseId]/         # Public course player
│   ├── dashboard/
│   │   ├── create-course/         # Multi-step course creation wizard
│   │   ├── my-courses/            # User's course library
│   │   ├── settings/              # Account settings
│   │   └── upgrade/               # Subscription / upgrade page
│   ├── globals.css
│   └── layout.tsx
├── components/ui/                 # Shadcn/Radix UI base components
├── configs/
│   ├── AiModel.js                 # Gemini AI client configuration
│   ├── db.jsx                     # Drizzle DB connection
│   └── schema.js                  # Drizzle table definitions
├── lib/
│   └── utils.ts
├── docs/                          # 📄 Academic project documentation
└── public/
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js ≥ 18
- pnpm (`npm install -g pnpm`)
- A [Neon](https://neon.tech) PostgreSQL database
- A [Clerk](https://clerk.com) application
- A [Google AI Studio](https://aistudio.google.com) Gemini API key
- A [YouTube Data API v3](https://console.cloud.google.com) key

### 1. Clone the Repository

```bash
git clone https://github.com/[your-username]/ai-course.git
cd ai-course
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=AIza...

# Neon PostgreSQL
DATABASE_URL=postgresql://user:password@hostname/dbname?sslmode=require

# YouTube Data API v3
YOUTUBE_API_KEY=AIza...
```

### 4. Push Database Schema

```bash
pnpm drizzle-kit push
```

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📸 Screenshots

> _[Add screenshots of the landing page, dashboard, course creation wizard, and course player here]_

| Page | Description |
|---|---|
| `Landing Page` | Hero, features, how it works, testimonials, pricing |
| `Dashboard` | User's course library with status badges |
| `Create Course — Step 1` | Topic and description input |
| `Create Course — Step 2` | Difficulty, category, and level selection |
| `Course Player` | Embedded YouTube player, chapter sidebar, and AI-generated notes |

---

## 📄 Academic Documentation

Full project documentation is available in the `/docs` directory:

- [01 — Title Page](docs/01-title-page.md)
- [02 — Declaration](docs/02-declaration.md)
- [03 — Certificate from Guide](docs/03-certificate-guide.md)
- [04 — Certificate from Company](docs/04-certificate-company.md)
- [05 — Approval Certificate](docs/05-approval-certificate.md)
- [06 — Acknowledgement](docs/06-acknowledgement.md)
- [07 — Table of Contents](docs/07-table-of-contents.md)
- [08 — List of Figures](docs/08-list-of-figures.md)
- [09 — List of Tables](docs/09-list-of-tables.md)
- [10 — List of Algorithms](docs/10-list-of-algorithms.md)
- [11 — Abstract](docs/11-abstract.md)
- [Chapter 1 — Introduction](docs/chapter-1-introduction.md)
- [Chapter 2 — Planning & Scheduling](docs/chapter-2-planning-scheduling.md)
- [Chapter 3 — System Analysis](docs/chapter-3-system-analysis.md)
- [Chapter 4 — System Design](docs/chapter-4-system-design.md)
- [Chapter 5 — Implementation](docs/chapter-5-implementation.md)
- [Chapter 6 — System Testing](docs/chapter-6-system-testing.md)
- [Chapter 7 — Conclusion](docs/chapter-7-conclusion.md)
- [References](docs/references.md)
- [Appendices](docs/appendices.md)

---

## 📝 Conclusion

AI Course Generator demonstrates the practical integration of large language models into educational technology. By automating the course design process, the platform reduces the time and expertise traditionally required to build structured online curricula, democratising high-quality course creation for educators and self-learners alike.

---

> **[EDITABLE]** Replace all bracketed placeholders (e.g., `[Student Name]`, `[University Name]`) throughout the `/docs` directory with your actual project details before submission.
