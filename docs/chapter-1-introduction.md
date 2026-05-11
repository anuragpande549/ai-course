# Chapter 1: Introduction

---

## 1.1 Background

The global educational technology (EdTech) sector has experienced exponential growth over the past decade. The advent of Massive Open Online Courses (MOOCs), micro-learning platforms, and on-demand video curricula has democratised access to education, enabling millions of learners across the world to acquire new skills regardless of geographic or socio-economic barriers. Platforms such as Coursera, Udemy, Khan Academy, and LinkedIn Learning collectively serve hundreds of millions of users, underscoring the enormous demand for structured digital learning content.

However, beneath this growth lies a fundamental challenge: **the creation of high-quality course content is inherently difficult, time-consuming, and expertise-intensive.** A typical online course requires instructional designers to define learning objectives, develop a coherent chapter structure, write detailed explanatory content, curate supplementary resources, and produce assessments — a process that can take months even for experienced educators. This barrier largely excludes domain experts, practitioners, and independent educators who possess deep subject-matter knowledge but lack the time or pedagogical training to package it effectively.

The emergence of large language models (LLMs) — particularly transformer-based architectures such as OpenAI's GPT series and Google's Gemini — has opened unprecedented possibilities for automating knowledge-intensive tasks. These models, trained on vast corpora of text, are capable of generating coherent, contextually appropriate, and educationally structured content from relatively sparse natural-language prompts. The integration of LLMs into course creation workflows represents a paradigm shift in how educational content is produced, validated, and disseminated.

**AI Course Generator** is developed in response to this opportunity. By harnessing the generative capabilities of the **Google Gemini 2.5 Flash Lite** model, the platform automates the full course creation lifecycle — from high-level syllabus design to detailed chapter content generation — reducing what was previously a multi-week effort to a matter of minutes.

The application operates within the modern web technology ecosystem, leveraging the **Next.js 16 App Router** for a production-grade full-stack architecture, **Neon PostgreSQL** for scalable serverless data persistence, **Clerk** for enterprise-grade authentication, and the **YouTube Data API v3** for automatic supplementary video discovery. The result is a cohesive, end-to-end platform that is not merely a proof-of-concept, but a deployable product ready for real-world educational use.

---

## 1.2 Purpose of the Project

The primary purpose of this project is to **design, implement, and evaluate a production-ready web application that uses generative artificial intelligence to automate the creation of structured online courses**, with the goal of making high-quality digital curriculum design accessible to any individual — regardless of pedagogical expertise or technical background.

Specifically, the project aims to:

1. **Demonstrate practical LLM integration** within a full-stack web application, establishing a reusable architectural pattern for AI-augmented SaaS products.
2. **Solve a real-world problem** in the EdTech domain by eliminating the primary friction point in online course creation — the effort required to design and write structured educational content.
3. **Validate a prompt engineering framework** capable of eliciting structured, schema-conformant JSON output from a large language model reliably and consistently.
4. **Implement production-grade resilience patterns** such as API retry logic with exponential backoff, applicable to any LLM-powered application.
5. **Develop a scalable, serverless full-stack architecture** using contemporary tools (Next.js, Neon, Drizzle ORM, Clerk) that can serve as a reference implementation for similar projects.
6. **Contribute to the academic understanding** of generative AI applications in education, with particular reference to prompt design, output validation, and multi-modal content augmentation (text + video).

The project also serves as a vehicle for applying the theoretical principles covered during the undergraduate programme — including software engineering methodology, database design, API development, user interface design, and system testing — within a realistic, commercially viable context.

---

## 1.3 Project Scope

The scope of the AI Course Generator project encompasses the following functional domains:

### In Scope

| Domain | Description |
|---|---|
| **User Authentication** | Secure sign-up, sign-in, and session management via Clerk OAuth |
| **Course Layout Generation** | AI-powered generation of a multi-chapter course syllabus from topic, description, and difficulty inputs |
| **Chapter Content Generation** | Detailed per-chapter educational content including explanations and code examples, generated by Gemini AI |
| **YouTube Video Integration** | Automatic lookup and embedding of relevant tutorial videos via YouTube Data API v3 |
| **Course Management** | Creation, retrieval, publishing, unpublishing, and deletion of courses |
| **Course Player** | Interactive course viewer with chapter navigation, embedded video, AI notes, and code blocks |
| **User Dashboard** | Centralised view of all user-created courses with status management |
| **Responsive UI** | Fully responsive interface optimised for desktop, tablet, and mobile devices |
| **Data Persistence** | Reliable, serverless PostgreSQL storage using Neon and Drizzle ORM |

### Out of Scope

The following aspects are **not** included in the current version of the system:

- Live video recording or hosting (third-party YouTube embeds only)
- Automated quiz or assessment generation
- Student enrolment and progress tracking
- Payment gateway / monetisation of courses
- Collaborative multi-author course editing
- Peer review or content moderation workflows
- Native mobile applications (iOS / Android)
- Offline mode or Progressive Web App (PWA) features

These features are identified as valuable extensions and are discussed further in the Future Work section (Section 7.4).

---

## 1.4 Project Objectives

The following specific, measurable objectives govern the development and evaluation of AI Course Generator:

1. **O1 — AI-Driven Course Layout:** Develop a backend API endpoint (`/api/generate-layout`) that accepts course metadata and returns a structured, multi-chapter syllabus in valid JSON format, generated by the Gemini AI model with a prompt-engineered schema specification.

2. **O2 — AI-Driven Chapter Content:** Implement a chapter generation API (`/api/generate-chapter`) that produces detailed, markdown-formatted educational content and code examples for each chapter, complete with automatic retry logic for rate-limit handling.

3. **O3 — YouTube Video Augmentation:** Integrate the YouTube Data API v3 to automatically retrieve and associate a relevant tutorial video with each generated chapter, enhancing the multi-modal learning experience.

4. **O4 — Secure User Authentication:** Implement a complete authentication system using Clerk, supporting sign-up, sign-in, session management, and user-specific data isolation.

5. **O5 — Course Management Features:** Provide full CRUD (Create, Read, Update, Delete) operations for courses, including a publish/unpublish workflow accessible from the user dashboard.

6. **O6 — Interactive Course Player:** Build a responsive, chapter-navigable course player that renders AI-generated content alongside an embedded YouTube video and syntax-highlighted code examples.

7. **O7 — Scalable Data Architecture:** Design and implement a normalised database schema using Neon PostgreSQL and Drizzle ORM that supports concurrent users and course storage at scale.

8. **O8 — Professional User Interface:** Create a visually polished, responsive landing page and application interface using Tailwind CSS v4, Radix UI, and Framer Motion, adhering to modern UX principles.

9. **O9 — Comprehensive Testing:** Execute unit, integration, system, and acceptance tests across all major modules, achieving a minimum functional coverage of 85% of defined test cases.

10. **O10 — Documentation and Reproducibility:** Produce complete academic documentation and a structured repository that enables any developer to clone, configure, and run the application locally within a defined setup procedure.

---

> **[EDITABLE]** Section 1.1 background statistics (e.g., MOOC market growth figures) can be updated with the latest research citations available at the time of submission. See the References section for citation guidance.
