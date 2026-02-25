import { db } from "@/configs/db";
import { courseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { courseId, isPublished } = await request.json();

        if (!courseId) {
            return NextResponse.json({ success: false, error: "Course ID is required" }, { status: 400 });
        }

        const result = await db.update(courseList)
            .set({ isPublished: isPublished })
            .where(eq(courseList.courseId, courseId))
            .returning();

        return NextResponse.json({ success: true, course: result[0] });

    } catch (error) {
        console.error("Publish Course Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update publish state" }, { status: 500 });
    }
}
