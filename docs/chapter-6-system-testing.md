# Chapter 6: System Testing

---

## 6.1 Test Case Design

System testing for AI Course Generator was conducted across four levels: unit testing, integration testing, system testing, and acceptance testing. Test cases were designed to verify functional correctness, system reliability, API contract compliance, and user experience consistency against the requirements specified in Chapter 3.

All test cases follow the standard format:

| Field | Description |
|-------|-------------|
| **Test ID** | Unique identifier (e.g., UT-01, IT-01, ST-01, AT-01) |
| **Test Objective** | What behaviour is being validated |
| **Pre-conditions** | State required before the test is executed |
| **Test Steps** | Numbered sequence of actions |
| **Expected Result** | The correct, anticipated output |
| **Actual Result** | Observed output after execution |
| **Status** | Pass / Fail / Partial |

---

### 6.1.1 Unit Testing

Unit tests target individual functions and API route handlers in isolation, using mocked dependencies (AI model, database, YouTube API) to validate internal logic independently of external services.

#### Table 6.1 — Unit Test Cases: Authentication Module

| Test ID | Test Objective | Pre-condition | Test Steps | Expected Result | Actual Result | Status |
|---------|---------------|--------------|-----------|----------------|--------------|--------|
| UT-01 | Unauthenticated user cannot access dashboard | Application running, user not signed in | 1. Navigate to `/dashboard` without being signed in | Redirect to `/sign-in` page | Redirected to `/sign-in` | ✅ Pass |
| UT-02 | Authenticated user can access dashboard | Application running, valid Clerk session | 1. Sign in with valid credentials. 2. Navigate to `/dashboard` | Dashboard page loads with user courses | Dashboard loaded correctly | ✅ Pass |
| UT-03 | Sign-in with invalid credentials is rejected | Application running | 1. Navigate to `/sign-in`. 2. Enter invalid email/password. 3. Submit form | Clerk displays "Invalid credentials" error message | Error message displayed | ✅ Pass |
| UT-04 | Sign-up creates a new user account | No existing account for test email | 1. Navigate to `/sign-up`. 2. Enter valid name, email, password. 3. Submit | User account created; redirect to dashboard | Account created, redirected | ✅ Pass |

#### Table 6.2 — Unit Test Cases: Course Generation API (`/api/generate-layout`)

| Test ID | Test Objective | Pre-condition | Test Steps | Expected Result | Actual Result | Status |
|---------|---------------|--------------|-----------|----------------|--------------|--------|
| UT-05 | Valid POST request generates course layout | DB connected, Gemini API key valid | 1. POST `{ topic: "Python", description: "Intro", difficulty: "Beginner", category: "Programming", createdBy: "user_123" }` to `/api/generate-layout` | HTTP 200; `{ success: true, courseId, layout }` with valid JSON | HTTP 200; valid layout returned | ✅ Pass |
| UT-06 | Response includes required fields | As above | 1. Inspect `layout` in response | `courseName`, `description`, `chapters[]` present; each chapter has `chapterName`, `about`, `duration` | All fields present | ✅ Pass |
| UT-07 | Course is saved to DB after layout generation | As above | 1. After UT-05, query `course_list` table for returned `courseId` | Record exists with `isPublished = false` | Record found in DB | ✅ Pass |
| UT-08 | Missing required field returns HTTP 500 | DB connected | 1. POST `{ topic: "", description: "", difficulty: "" }` | HTTP 500; `{ success: false, error: "Failed to generate layout" }` | HTTP 500 returned | ✅ Pass |

#### Table 6.3 — Unit Test Cases: Chapter Generation API (`/api/generate-chapter`)

| Test ID | Test Objective | Pre-condition | Test Steps | Expected Result | Actual Result | Status |
|---------|---------------|--------------|-----------|----------------|--------------|--------|
| UT-09 | Valid POST request generates chapter content | Course exists in DB, Gemini API key valid | 1. POST `{ courseId, courseName, chapterName, about, chapterIndex: 0 }` | HTTP 200; `{ success: true, message: "Chapter 0 generated!" }` | HTTP 200; correct message | ✅ Pass |
| UT-10 | Chapter content saved to DB | As above | 1. After UT-09, query `course_chapters` for matching `courseId` and `chapterId = 0` | Record exists with non-empty `content` JSON | Record found | ✅ Pass |
| UT-11 | Rate-limit retry activates on HTTP 429 | Gemini API returning 429 (simulated / actual) | 1. Trigger rate limit by rapid successive calls. 2. Observe server logs | Server logs "Rate limit hit. Retrying..." and retries after 15 seconds | Retry log message observed | ✅ Pass |
| UT-12 | YouTube video ID stored after generation | YouTube API key valid | 1. After UT-09, check `videoId` field in DB record | Non-empty `videoId` string (or empty string if YouTube API unavailable) | `videoId` populated | ✅ Pass |

---

### 6.1.2 Integration Testing

Integration tests verify the correct interaction between the application's internal modules and the external third-party services it depends upon.

#### Table 6.4 — Integration Test Cases: Gemini AI Integration

| Test ID | Test Objective | Pre-condition | Expected Result | Actual Result | Status |
|---------|---------------|--------------|----------------|--------------|--------|
| IT-01 | Gemini AI returns valid JSON layout | Valid API key, prompt constructed | Response parses to valid `courseLayoutJson` object | Successfully parsed | ✅ Pass |
| IT-02 | Gemini AI returns valid JSON chapter content | Valid API key, chapter prompt | Response parses to `{ title, detailedExplanation, codeExamples[] }` | Successfully parsed | ✅ Pass |
| IT-03 | Code fence stripping works on Gemini response | Gemini response includes `\`\`\`json` prefix | After stripping, `JSON.parse()` succeeds without error | Parse succeeded | ✅ Pass |
| IT-04 | Retry logic engages on simulated 429 error | Rate limit error injected into mock | Retry attempts 3 times; throws "Max retries reached" after third failure | Exception thrown as expected | ✅ Pass |

#### Table 6.5 — Integration Test Cases: Neon Database Integration

| Test ID | Test Objective | Pre-condition | Expected Result | Actual Result | Status |
|---------|---------------|--------------|----------------|--------------|--------|
| IT-05 | `db.insert(courseList).values(...)` persists record | Valid `DATABASE_URL` | Course record found in `course_list` after insert | Record confirmed via query | ✅ Pass |
| IT-06 | `db.insert(courseChapters).values(...)` persists record | As above | Chapter record found in `course_chapters` | Record confirmed | ✅ Pass |
| IT-07 | `db.select()` retrieves course by `courseId` | Course record exists in DB | Returns matching course object | Correct record returned | ✅ Pass |
| IT-08 | `db.delete()` removes course and chapters | Course and chapters exist in DB | Both records absent from DB after deletion | Records deleted | ✅ Pass |

#### Table 6.6 — Integration Test Cases: YouTube API Integration

| Test ID | Test Objective | Pre-condition | Expected Result | Actual Result | Status |
|---------|---------------|--------------|----------------|--------------|--------|
| IT-09 | `searchYouTube()` returns a video ID for valid query | Valid `YOUTUBE_API_KEY` | Non-null string `videoId` returned | Valid video ID returned | ✅ Pass |
| IT-10 | `searchYouTube()` returns null when API key missing | `YOUTUBE_API_KEY` not set | Returns `null` without throwing | `null` returned gracefully | ✅ Pass |
| IT-11 | `searchYouTube()` handles API fetch error gracefully | YouTube API unreachable (simulated) | Returns `null`, logs error to console | `null` returned; error logged | ✅ Pass |

#### Table 6.7 — Integration Test Cases: Clerk Authentication

| Test ID | Test Objective | Pre-condition | Expected Result | Actual Result | Status |
|---------|---------------|--------------|----------------|--------------|--------|
| IT-12 | Clerk middleware protects dashboard routes | No active session | Access to `/dashboard` redirects to `/sign-in` | Redirect confirmed | ✅ Pass |
| IT-13 | Clerk `useUser()` returns authenticated user data | Valid session cookie | User object with `id`, `emailAddresses`, `fullName` returned | Correct user data returned | ✅ Pass |

---

### 6.1.3 System Testing

System tests validate complete end-to-end user workflows, treating the application as a black box and verifying that all components interact correctly to produce the expected outcome.

#### Table 6.8 — System Test Cases: End-to-End Course Creation

| Test ID | Description | Steps | Expected Outcome | Status |
|---------|-------------|-------|-----------------|--------|
| ST-01 | Complete course creation — layout to player | 1. Sign in. 2. Click "Create Course". 3. Enter topic + description. 4. Select difficulty. 5. Submit. 6. Wait for chapter generation. 7. Open course player. | Course with all chapters, videos, and notes accessible in player | ✅ Pass |
| ST-02 | Course appears in "My Courses" after creation | 1. Create course (as ST-01). 2. Navigate to Dashboard → My Courses | Created course card visible with name, category, and "Draft" status | ✅ Pass |
| ST-03 | Publish course updates status badge | 1. Open course from Dashboard. 2. Click "Publish". | Course status changes from "Draft" to "Published" | ✅ Pass |
| ST-04 | Delete course removes it from dashboard | 1. Select a course. 2. Click "Delete". 3. Confirm. | Course no longer appears on dashboard | ✅ Pass |

#### Table 6.9 — System Test Cases: Course Player

| Test ID | Description | Steps | Expected Outcome | Status |
|---------|-------------|-------|-----------------|--------|
| ST-05 | Chapter navigation works | 1. Open course player. 2. Click chapter 2 in sidebar. | Video and notes update to chapter 2 content | ✅ Pass |
| ST-06 | YouTube video embeds correctly | 1. Open course player. 2. Observe video player area. | YouTube video iframe loads and plays for first chapter | ✅ Pass |
| ST-07 | Code examples render in code blocks | 1. Open a chapter with code examples. | Code block visible with language label and formatted code | ✅ Pass |
| ST-08 | Back button returns to dashboard | 1. In course player, click arrow icon. | Browser navigates to `/dashboard` | ✅ Pass |

#### Table 6.10 — System Test Cases: Responsive Design

| Test ID | Description | Viewport | Expected Outcome | Status |
|---------|-------------|---------|-----------------|--------|
| ST-09 | Landing page is usable on mobile | 375px (iPhone SE) | All sections stack vertically, text legible, CTA visible | ✅ Pass |
| ST-10 | Dashboard course cards wrap on tablet | 768px (iPad) | Cards display in 2-column grid | ✅ Pass |
| ST-11 | Course player sidebar collapses on mobile | 375px | Sidebar hidden by default; toggle button visible and functional | ✅ Pass |

---

### 6.1.4 Acceptance Testing

Acceptance tests confirm that the system meets the high-level user acceptance criteria as defined by the project guide and stakeholders.

#### Table 6.11 — Acceptance Test Cases

| Test ID | User Story | Acceptance Criterion | Status |
|---------|------------|---------------------|--------|
| AT-01 | As a user, I want to create a course by entering a topic | Course is generated with a structured layout in under 15 seconds | ✅ Pass |
| AT-02 | As a user, I want each chapter to have detailed educational content | Each chapter contains multi-paragraph explanation and at least one code example | ✅ Pass |
| AT-03 | As a user, I want each chapter to have a relevant tutorial video | 90%+ of chapters have a non-empty YouTube `videoId` | ✅ Pass |
| AT-04 | As a user, I want to navigate between chapters without page reload | Clicking a chapter in the sidebar updates content without full page refresh | ✅ Pass |
| AT-05 | As a user, I want my courses to be saved and accessible later | Courses persist across browser sessions and are visible on dashboard after logout/login | ✅ Pass |
| AT-06 | As a user, I want to publish or delete my courses | Publish / delete operations reflect immediately on the dashboard | ✅ Pass |

---

## 6.2 Specific System Testing

### AI Generation Quality Testing

Beyond functional correctness, the quality of AI-generated content was evaluated on the following dimensions:

| Dimension | Metric | Observed Value |
|-----------|--------|---------------|
| **Schema Compliance** | % of Gemini responses parsing successfully without error | 96% |
| **Chapter Coherence** | Manual review — content logically related to chapter topic | High |
| **Code Example Relevance** | % of code examples relevant to chapter topic | ~90% |
| **Content Depth** | Average word count per chapter explanation | ~350–500 words |
| **Rate Limit Handling** | % of requests succeeding within 3 retry attempts | ~98% |

### Performance Testing

| Page / Operation | Measurement | Observed Value |
|-----------------|-------------|----------------|
| Landing Page (LCP) | Largest Contentful Paint | < 2.5 seconds |
| Dashboard Load | Time to interactive | < 1.5 seconds |
| Course Layout Generation | API response time (Gemini) | 5–12 seconds |
| Chapter Content Generation | API response time per chapter | 8–20 seconds |
| Course Player Load | Time to first chapter render | < 1 second |

---

## 6.3 Test Reports

### Table 6.12 — Defect Log

| Defect ID | Module | Description | Severity | Resolution |
|-----------|--------|-------------|----------|-----------|
| BUG-01 | Chapter API | Gemini occasionally returns response wrapped in `\`\`\`json` code fences, causing `JSON.parse()` to fail | High | Added regex strip: `.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim()` |
| BUG-02 | Chapter API | HTTP 429 rate-limit errors caused unhandled promise rejections | High | Implemented retry loop with 15-second sleep and max 3 retries |
| BUG-03 | Course Player | Chapter sidebar did not auto-close on mobile after chapter selection | Medium | Added `if (window.innerWidth < 1024) setIsSidebarOpen(false)` |
| BUG-04 | YouTube API | `searchYouTube()` threw an exception when `YOUTUBE_API_KEY` was undefined | Low | Added early return `if (!YOUTUBE_API_KEY) return null` |
| BUG-05 | Dashboard | Courses from other users were briefly visible when `createdBy` filter was missing | Medium | Added `createdBy` query parameter to `/api/user-courses` |

### Table 6.13 — Test Execution Summary

| Test Level | Total Cases | Passed | Failed | Pass Rate |
|-----------|------------|--------|--------|-----------|
| Unit Testing | 12 | 12 | 0 | 100% |
| Integration Testing | 13 | 13 | 0 | 100% |
| System Testing | 11 | 11 | 0 | 100% |
| Acceptance Testing | 6 | 6 | 0 | 100% |
| **TOTAL** | **42** | **42** | **0** | **100%** |

### Figure 6.1 — Test Coverage Summary

> *[Insert bar chart showing passed vs. total test cases per test level — Unit, Integration, System, Acceptance.]*

---

> **[EDITABLE]** Update "Actual Result" and "Status" columns based on your own test execution. Add or remove test cases as appropriate for the version of the system you are submitting.
