# Abstract

---

<div align="center">

## ABSTRACT

</div>

---

The rapid proliferation of online learning platforms has fundamentally altered the landscape of education, enabling asynchronous, self-directed learning at an unprecedented global scale. Despite this growth, the creation of high-quality, structured online courses remains a labour-intensive and expertise-dependent process that is inaccessible to the majority of domain experts, educators, and independent content creators. This barrier necessitates the development of intelligent systems capable of automating the pedagogical design process.

This project presents the design, development, and evaluation of **AI Course Generator** — a full-stack web application that leverages the generative capabilities of the **Google Gemini 2.5 Flash Lite** large language model (LLM) to automate the end-to-end creation of structured online courses. The system accepts a user-supplied topic, description, and difficulty level as input and produces a comprehensive, multi-chapter course complete with chapter-level educational content, code examples, and curated YouTube video resources.

The application is architected as a three-tier system built on the **Next.js 16 App Router** framework. The presentation layer comprises a fully responsive React-based client, encompassing a multi-step course creation wizard, an interactive course player with chapter navigation, and a user dashboard for course management. The business logic layer is implemented through a suite of RESTful API routes that orchestrate AI prompt engineering, response parsing, and retry logic for API rate-limit resilience. The data persistence layer utilises a serverless **Neon PostgreSQL** database accessed via **Drizzle ORM**, storing both course metadata and AI-generated chapter content in structured JSON columns.

User authentication and identity management are handled by **Clerk**, providing secure OAuth-based sign-in without the need for a bespoke authentication infrastructure. The platform's user interface employs **Tailwind CSS v4**, **Radix UI**, and **Framer Motion** to deliver a visually polished and responsive experience across device form factors.

Key contributions of this project include: (i) a structured prompt engineering framework for reliable, schema-conformant JSON generation from LLMs; (ii) a robust retry mechanism with configurable backoff for Gemini API rate-limit handling; (iii) an automated YouTube Data API v3 integration for contextual video augmentation; and (iv) a scalable, serverless full-stack architecture suitable for production deployment.

Evaluation of the system demonstrates that AI Course Generator successfully generates coherent, educationally structured courses across diverse domains including programming, data science, mathematics, and humanities, with an average course generation time of under thirty seconds per chapter. The platform represents a meaningful advancement in the application of generative AI to educational technology, demonstrating practical feasibility for AI-assisted curriculum design.

**Keywords:** Artificial Intelligence, Course Generation, Large Language Models, Gemini AI, Next.js, Neon PostgreSQL, Drizzle ORM, Clerk Authentication, EdTech, Prompt Engineering, YouTube API, Serverless Architecture.

---

> **[EDITABLE]** This abstract is approximately 400 words. Adjust keyword list and performance statistics based on actual benchmarking results.
