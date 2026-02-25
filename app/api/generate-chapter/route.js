import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { courseChapters } from '@/configs/schema';
import { GenerateChapterContent_AI } from '@/configs/AiModel';

// Utility function to pause execution
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
            You are an expert educator. Write detailed educational content for a chapter titled "${chapterName}" which is about "${about}". 
            This is part of a larger course called "${courseName}". 
            
            Output the result STRICTLY as a raw JSON object (no markdown, no backticks, no code blocks) matching this exact schema:
            {
                "title": "String (The title of the chapter)",
                "detailedExplanation": "String (A comprehensive, multi-paragraph explanation using markdown formatting for bolding, bullet points, etc.)",
                "codeExamples": [
                    {
                        "language": "String (e.g., 'javascript', 'python', 'none')",
                        "code": "String (The actual code block or example text)"
                    }
                ]
            }
        `;

        // 1. Generate content with Retry Logic for Rate Limits (429)
        let responseText = "";
        let retries = 3;

        while (retries > 0) {
            try {
                const result = await GenerateChapterContent_AI.generateContent(prompt);
                responseText = result.response.text();
                break; // Break out of loop if successful
            } catch (aiError) {
                if (aiError?.status === 429 || aiError?.message?.includes("429")) {
                    console.log(`Rate limit hit. Retrying in 15 seconds... (${retries} retries left)`);
                    retries -= 1;
                    if (retries === 0) throw new Error("Max retries reached for Gemini API");
                    await sleep(15000); // Wait 15 seconds before trying again
                } else {
                    throw aiError; // Throw other errors immediately
                }
            }
        }

        // Clean and Parse JSON
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const chapterContentJson = JSON.parse(responseText);

        // 2. Search for a relevant YouTube Video
        const searchQuery = `${courseName} ${chapterName} tutorial in hindi english`;
        const videoId = await searchYouTube(searchQuery);

        // 3. Save to database
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
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to generate chapter"
        }, { status: 500 });
    }
}