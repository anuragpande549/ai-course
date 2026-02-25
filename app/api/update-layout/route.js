import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { courseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function PUT(request) {
    try {
        const { courseId, chapters } = await request.json();

        if (!courseId) {
            return NextResponse.json({ success: false, error: "Course ID is required" }, { status: 400 });
        }

        // 1. Fetch the existing course record using your unique courseId
        const existingCourse = await db.select()
            .from(courseList)
            .where(eq(courseList.courseId, courseId));

        if (!existingCourse.length) {
            return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 });
        }

        // 2. Merge the old layout with the new edited chapters array
        // Remember: In your new schema, the JSON column is called `courseOutput`
        const updatedCourseOutput = {
            ...existingCourse[0].courseOutput,
            chapters: chapters
        };

        // 3. Update the database row
        await db.update(courseList)
            .set({ courseOutput: updatedCourseOutput })
            .where(eq(courseList.courseId, courseId));

        return NextResponse.json({
            success: true,
            message: "Course layout updated successfully!"
        });

    } catch (error) {
        console.error("Phase 2 API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update layout" }, { status: 500 });
    }
}