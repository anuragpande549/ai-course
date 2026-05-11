# Appendices

---

<div align="center">

## APPENDICES

</div>

---

## Appendix A — Environment Configuration

The following environment variables are required to run AI Course Generator. Create a `.env.local` file in the root project directory with the following keys:

```env
# ── Clerk Authentication ─────────────────────────────────────────────────────
# Obtain from: https://dashboard.clerk.com → Your App → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk redirect routes (Next.js App Router convention)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ── Google Gemini AI ──────────────────────────────────────────────────────────
# Obtain from: https://aistudio.google.com/app/apikey
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...

# ── Neon PostgreSQL ───────────────────────────────────────────────────────────
# Obtain from: https://console.neon.tech → Your Project → Connection String
DATABASE_URL=postgresql://username:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# ── YouTube Data API v3 ───────────────────────────────────────────────────────
# Obtain from: https://console.cloud.google.com → APIs & Services → Credentials
YOUTUBE_API_KEY=AIzaSy...
```

> ⚠️ **Security Notice:** Never commit `.env.local` to version control. Ensure `.env.local` is listed in `.gitignore`. The `NEXT_PUBLIC_` prefix makes variables accessible in the browser — use this only for non-sensitive keys that are safe to expose publicly. Clerk secret keys and Database URLs must NOT use the `NEXT_PUBLIC_` prefix.

---

## Appendix B — Installation and Setup Guide

Follow these steps to set up and run AI Course Generator on a local development machine.

### Prerequisites

| Requirement | Version | Install |
|------------|---------|---------|
| Node.js | ≥ 18.x LTS | https://nodejs.org |
| pnpm | ≥ 8.x | `npm install -g pnpm` |
| Git | ≥ 2.40 | https://git-scm.com |

### Step-by-Step Setup

**Step 1: Clone the Repository**
```bash
git clone https://github.com/[your-username]/ai-course.git
cd ai-course
```

**Step 2: Install Dependencies**
```bash
pnpm install
```

**Step 3: Create Environment File**
```bash
cp .env.example .env.local
# Then edit .env.local with your actual API keys (see Appendix A)
```

**Step 4: Push Database Schema to Neon**
```bash
pnpm drizzle-kit push
```
This command reads `configs/schema.js` and creates the `course_list` and `course_chapters` tables in your Neon PostgreSQL instance.

**Step 5: Verify Database Tables**
```bash
node test-db.js
```

**Step 6: Start the Development Server**
```bash
pnpm dev
```
The application will be available at `http://localhost:3000`.

**Step 7: Verify API Endpoints**
```bash
node test-api.js
```

---

## Appendix C — API Endpoint Reference

### C.1 POST `/api/generate-layout`

**Description:** Generates an AI course layout and saves it to the database.

**Request Body:**
```json
{
  "topic": "string (required)",
  "description": "string (required)",
  "difficulty": "string (required, e.g. 'Beginner')",
  "category": "string (optional, defaults to 'General')",
  "createdBy": "string (required, Clerk user ID or email)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "courseId": "uuid-v4-string",
  "layout": {
    "courseName": "string",
    "description": "string",
    "chapters": [
      { "chapterName": "string", "about": "string", "duration": "string" }
    ]
  }
}
```

**Error Response (500):**
```json
{ "success": false, "error": "Failed to generate layout" }
```

---

### C.2 POST `/api/generate-chapter`

**Description:** Generates AI content for a single chapter and saves it, along with a YouTube video ID.

**Request Body:**
```json
{
  "courseId": "string (uuid)",
  "courseName": "string",
  "chapterName": "string",
  "about": "string",
  "chapterIndex": "integer (0-based)"
}
```

**Success Response (200):**
```json
{ "success": true, "message": "Chapter 0 generated!" }
```

**Error Response (500):**
```json
{ "success": false, "error": "error message" }
```

---

### C.3 GET `/api/course?courseId={uuid}`

**Description:** Fetches a course record and all its chapters by course UUID.

**Success Response (200):**
```json
{
  "success": true,
  "course": { "/* course_list record */" },
  "chapters": [ { "/* course_chapters records */" } ]
}
```

---

### C.4 GET `/api/user-courses?createdBy={userId}`

**Description:** Fetches all courses created by the specified user.

**Success Response (200):**
```json
{
  "success": true,
  "courses": [ { "/* course_list records */" } ]
}
```

---

### C.5 PATCH `/api/update-layout`

**Description:** Toggles the `is_published` flag on a course.

**Request Body:**
```json
{ "courseId": "uuid", "isPublished": true }
```

---

### C.6 DELETE `/api/delete-course?courseId={uuid}`

**Description:** Deletes a course and all associated chapter records.

**Success Response (200):**
```json
{ "success": true, "message": "Course deleted" }
```

---

## Appendix D — Glossary of Terms

| Term | Definition |
|------|-----------|
| **API** | Application Programming Interface — a set of definitions and protocols for building and integrating application software |
| **App Router** | Next.js 13+ file-system based routing convention using the `/app` directory |
| **Clerk** | A third-party identity and authentication platform providing sign-in, sign-up, and session management as a service |
| **Drizzle ORM** | A TypeScript-first Object-Relational Mapper (ORM) for Node.js that provides type-safe SQL query building |
| **Edge Runtime** | A lightweight JavaScript runtime that runs serverless functions at CDN edge nodes, closer to the user |
| **ER Diagram** | Entity-Relationship Diagram — a visual representation of data entities and their relationships in a relational database |
| **Framer Motion** | A React animation library for declarative, production-ready motion design |
| **Gemini AI** | Google DeepMind's family of multimodal large language models |
| **JWT** | JSON Web Token — a compact, URL-safe means of representing claims securely between two parties |
| **LLM** | Large Language Model — a machine learning model trained on vast text corpora capable of generating human-like text |
| **Neon** | A serverless PostgreSQL database platform with auto-scaling and branching capabilities |
| **Next.js** | A full-stack React framework by Vercel supporting Server-Side Rendering (SSR), Static Generation, and API Routes |
| **ORM** | Object-Relational Mapper — a programming technique for converting data between incompatible type systems using object-oriented programming languages |
| **PERT** | Programme Evaluation and Review Technique — a project management tool for analysing task duration under uncertainty |
| **PostgreSQL** | An open-source, ACID-compliant relational database management system |
| **Prompt Engineering** | The practice of designing and optimising input prompts to guide LLM outputs towards desired formats and content |
| **Radix UI** | A library of unstyled, accessible React UI primitives |
| **REST API** | Representational State Transfer Application Programming Interface — an architectural style for distributed hypermedia systems |
| **Serverless** | A cloud computing execution model in which the cloud provider dynamically manages the allocation of machine resources |
| **Tailwind CSS** | A utility-first CSS framework for building custom user interfaces without leaving HTML |
| **UUID** | Universally Unique Identifier — a 128-bit label used for information in computer systems |
| **WBS** | Work Breakdown Structure — a hierarchical decomposition of project tasks and deliverables |
| **YouTube Data API v3** | Google's REST API for querying YouTube video metadata, search results, and channel information |

---

## Appendix E — Full Project Directory Structure

```
ai-course/
│
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/page.jsx
│   │   └── sign-up/
│   │       └── [[...sign-up]]/page.jsx
│   │
│   ├── _components/               # Landing page components
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Pricing.jsx
│   │   ├── ProgressBar.jsx
│   │   └── Testimonials.jsx
│   │
│   ├── _context/                  # React Context providers
│   │
│   ├── api/
│   │   ├── course/
│   │   │   └── route.js
│   │   ├── delete-course/
│   │   │   └── route.js
│   │   ├── generate-chapter/
│   │   │   └── route.js
│   │   ├── generate-layout/
│   │   │   └── route.js
│   │   ├── publish-course/
│   │   │   └── route.js
│   │   ├── update-layout/
│   │   │   └── route.js
│   │   └── user-courses/
│   │       └── route.js
│   │
│   ├── course/
│   │   └── [courseId]/
│   │       ├── CoursePlayer.jsx
│   │       └── page.jsx
│   │
│   ├── dashboard/
│   │   ├── _components/
│   │   │   └── Dashboard.jsx
│   │   ├── create-course/
│   │   │   ├── _components/
│   │   │   │   ├── CreateCourse.jsx
│   │   │   │   └── Options.jsx
│   │   │   └── page.jsx
│   │   ├── my-courses/
│   │   ├── settings/
│   │   ├── upgrade/
│   │   ├── layout.jsx
│   │   └── page.jsx
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── ui/                        # Radix/Shadcn UI components
│
├── configs/
│   ├── AiModel.js                 # Gemini AI model instance
│   ├── db.jsx                     # Drizzle ORM + Neon connection
│   └── schema.js                  # Database table definitions
│
├── docs/                          # Academic documentation
│   ├── 01-title-page.md
│   ├── 02-declaration.md
│   ├── 03-certificate-guide.md
│   ├── 04-certificate-company.md
│   ├── 05-approval-certificate.md
│   ├── 06-acknowledgement.md
│   ├── 07-table-of-contents.md
│   ├── 08-list-of-figures.md
│   ├── 09-list-of-tables.md
│   ├── 10-list-of-algorithms.md
│   ├── 11-abstract.md
│   ├── chapter-1-introduction.md
│   ├── chapter-2-planning-scheduling.md
│   ├── chapter-3-system-analysis.md
│   ├── chapter-4-system-design.md
│   ├── chapter-5-implementation.md
│   ├── chapter-6-system-testing.md
│   ├── chapter-7-conclusion.md
│   ├── references.md
│   └── appendices.md
│
├── lib/
│   └── utils.ts
│
├── public/                        # Static assets
├── .env.local                     # Environment variables (gitignored)
├── .gitignore
├── components.json
├── drizzle.config.js
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── tsconfig.json
```

---

> **[EDITABLE]** Appendix C API request/response examples can be updated to include actual sample payloads captured during system testing. Appendix E directory structure should be updated to reflect any new files added after the initial submission.
