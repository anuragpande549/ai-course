import { db } from "@/configs/db";
import { courseList, courseChapters } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Ensure this route is never cached
export const dynamic = 'force-dynamic';

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const courseId = searchParams.get('courseId');

        if (!courseId) {
            return NextResponse.json(
                { success: false, error: "Course ID is required" },
                { status: 400 }
            );
        }

        // 1. Delete associated chapters first
        // Wrapped in a try/catch in case chapters don't exist or table is empty
        try {
            await db.delete(courseChapters).where(eq(courseChapters.courseId, courseId));
        } catch (chapterErr) {
            console.warn("No chapters found or error deleting chapters:", chapterErr);
        }

        // 2. Delete the main course entry
        const result = await db.delete(courseList)
            .where(eq(courseList.courseId, courseId))
            .returning();

        // 3. Verify something was actually deleted
        if (result.length === 0) {
            return NextResponse.json(
                { success: false, error: "Course not found in database." },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, deleted: result });

    } catch (error) {
        console.error("Delete Course Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete course due to a server error." },
            { status: 500 }
        );
    }
}