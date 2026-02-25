import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { courseList } from '@/configs/schema';
import { v4 as uuidv4 } from 'uuid';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';

export async function POST(request) {
    try {
        const body = await request.json();
        const { topic, description, difficulty, category, level, createdBy } = body;

        // 1. Ask Gemini for the JSON Layout structured array
        const prompt = `
            You are an expert course creator. Generate a comprehensive course layout based on the following details:
            - Topic: ${topic}
            - Description: ${description}
            - Difficulty Level: ${difficulty || level}

            Output the result STRICTLY as a raw JSON object (no markdown, no backticks, no code blocks) matching this exact schema:
            {
                "courseName": "String (engaging title)",
                "description": "String (brief overview of the course)",
                "chapters": [
                    {
                        "chapterName": "String",
                        "about": "String (what will be covered in this chapter)",
                        "duration": "String (e.g., '2 Hours')"
                    }
                ]
            }
        `;

        const result = await GenerateCourseLayout_AI.generateContent(prompt);
        let responseText = result.response.text();
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const courseLayoutJson = JSON.parse(responseText);

        // 2. Generate UUID Course ID
        const newCourseId = uuidv4();

        // 3. Save initial draft to course_list
        await db.insert(courseList).values({
            courseId: newCourseId,
            name: courseLayoutJson.courseName,
            category: category || "General",
            level: difficulty || level,
            courseOutput: courseLayoutJson,
            createdBy: createdBy || "unknown_user",
            isPublished: false
        });

        // 4. Return layout to Context API
        return NextResponse.json({
            success: true,
            courseId: newCourseId,
            layout: courseLayoutJson
        });

    } catch (error) {
        console.error("Phase 1 API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to generate layout" }, { status: 500 });
    }
}