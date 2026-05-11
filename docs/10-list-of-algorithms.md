# List of Algorithms

---

<div align="center">

## LIST OF ALGORITHMS

</div>

---

| Algorithm No. | Title | Page No. |
|---------------|-------|----------|
| **Algorithm 4.1** | Course Layout Generation using Gemini AI | 42 |
| **Algorithm 4.2** | Chapter Content Generation with Retry Logic | 43 |
| **Algorithm 4.3** | YouTube Video Search and Retrieval | 43 |
| **Algorithm 4.4** | Drizzle ORM Database Insertion | 44 |
| **Algorithm 4.5** | Course Player Chapter Navigation | 44 |

---

## Algorithm Details

---

### Algorithm 4.1 — Course Layout Generation using Gemini AI

**Purpose:** Generate a structured course syllabus (layout) from a user-supplied topic, description, and difficulty level using the Google Gemini 2.5 Flash Lite large-language model.

**Input:** `topic`, `description`, `difficulty`, `category`, `createdBy`
**Output:** `courseLayoutJson` (structured JSON containing `courseName`, `description`, and `chapters[]`)

```
BEGIN CourseLayoutGeneration(topic, description, difficulty, category, createdBy)

    1. CONSTRUCT prompt using topic, description, and difficulty parameters
    2. CALL GenerateCourseLayout_AI.generateContent(prompt)
    3. RECEIVE responseText from Gemini AI
    4. STRIP markdown code fences (```json ... ```) from responseText
    5. PARSE responseText as JSON → courseLayoutJson
    6. GENERATE unique UUID → newCourseId
    7. INSERT INTO course_list:
         courseId    ← newCourseId
         name        ← courseLayoutJson.courseName
         category    ← category
         level       ← difficulty
         courseOutput ← courseLayoutJson
         createdBy   ← createdBy
         isPublished ← FALSE
    8. RETURN { success: TRUE, courseId: newCourseId, layout: courseLayoutJson }

    EXCEPTION:
        CATCH any error
        LOG error to console
        RETURN { success: FALSE, error: "Failed to generate layout" }

END CourseLayoutGeneration
```

---

### Algorithm 4.2 — Chapter Content Generation with Retry Logic

**Purpose:** Generate detailed educational content for a specific chapter, with automatic retry on Gemini API rate-limit errors (HTTP 429).

**Input:** `courseId`, `courseName`, `chapterName`, `about`, `chapterIndex`
**Output:** Chapter content saved to `course_chapters` table

```
BEGIN ChapterContentGeneration(courseId, courseName, chapterName, about, chapterIndex)

    1. CONSTRUCT prompt using courseName, chapterName, and about
    2. SET retries ← 3
    3. SET responseText ← ""

    WHILE retries > 0 DO
        TRY
            4. CALL GenerateChapterContent_AI.generateContent(prompt)
            5. SET responseText ← result.response.text()
            6. BREAK  // success — exit loop
        CATCH aiError
            IF aiError.status == 429 OR "429" IN aiError.message THEN
                7. LOG "Rate limit hit. Retrying in 15 seconds..."
                8. DECREMENT retries ← retries - 1
                IF retries == 0 THEN
                    9. THROW Error("Max retries reached for Gemini API")
                END IF
                10. SLEEP(15000 ms)  // wait 15 seconds
            ELSE
                11. THROW aiError  // non-rate-limit errors fail immediately
            END IF
        END TRY
    END WHILE

    12. STRIP markdown code fences from responseText
    13. PARSE responseText as JSON → chapterContentJson
    14. CALL searchYouTube(courseName + " " + chapterName + " tutorial")
    15. RECEIVE videoId (or NULL if API unavailable)
    16. INSERT INTO course_chapters:
          courseId    ← courseId
          chapterId   ← chapterIndex
          chapterName ← chapterName
          content     ← chapterContentJson
          videoId     ← videoId OR ""
    17. RETURN { success: TRUE, message: "Chapter N generated!" }

    EXCEPTION:
        CATCH any error
        LOG error
        RETURN { success: FALSE, error: error.message }

END ChapterContentGeneration
```

---

### Algorithm 4.3 — YouTube Video Search and Retrieval

**Purpose:** Search the YouTube Data API v3 for the most relevant tutorial video for a given chapter topic.

**Input:** `query` (composed from course name + chapter name)
**Output:** `videoId` (YouTube video ID string) or `null`

```
BEGIN searchYouTube(query)

    1. READ YOUTUBE_API_KEY from environment variables
    2. IF YOUTUBE_API_KEY is NULL THEN RETURN null

    3. CONSTRUCT searchUrl:
         base_url = "https://www.googleapis.com/youtube/v3/search"
         params   = { part: "snippet", q: query, type: "video", maxResults: 1, key: YOUTUBE_API_KEY }

    TRY
        4. CALL fetch(searchUrl)
        5. PARSE response as JSON → data
        6. RETURN data.items[0].id.videoId  // first result's video ID
    CATCH error
        7. LOG "YouTube fetch error:", error
        8. RETURN null
    END TRY

END searchYouTube
```

---

### Algorithm 4.4 — Drizzle ORM Database Insertion

**Purpose:** Perform a type-safe record insertion into a PostgreSQL table via Drizzle ORM and the Neon serverless driver.

**Input:** Table name, field values
**Output:** Confirmation of successful insertion

```
BEGIN DrizzleInsert(table, values)

    1. OBTAIN database connection from db (Neon serverless driver + Drizzle ORM)
    2. CALL db.insert(table).values(values)
    3. AWAIT resolution of the promise
    4. IF resolved successfully THEN
         RETURN { success: TRUE }
       ELSE
         THROW database error
    END IF

END DrizzleInsert
```

---

### Algorithm 4.5 — Course Player Chapter Navigation

**Purpose:** Manage chapter selection in the interactive course player, switching the active chapter and auto-closing the sidebar on mobile devices.

**Input:** Selected `chapter` object, current `windowWidth`
**Output:** Updated active chapter state; sidebar hidden on mobile

```
BEGIN ChapterNavigation(chapter, windowWidth)

    1. CALL setActiveChapter(chapter)  // React state update
    2. IF windowWidth < 1024 THEN      // Mobile breakpoint (Tailwind lg)
         3. CALL setIsSidebarOpen(FALSE)  // Hide sidebar on mobile
    END IF
    4. UI re-renders with:
         - Active chapter's YouTube video (embedded iframe)
         - Active chapter's detailedExplanation (rendered as text)
         - Active chapter's codeExamples (rendered as syntax-highlighted blocks)
         - Sidebar highlights current chapter item with PlayCircle icon

END ChapterNavigation
```

---

> **[EDITABLE]** Page numbers are approximate. Update once the final document is formatted. Additional algorithms may be added if new features are implemented.
