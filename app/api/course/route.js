import { db } from "@/configs/db";
import { courseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    try {
        const course = await db.select().from(courseList).where(eq(courseList.courseId, courseId));
        return NextResponse.json({ success: true, course: course[0] });
    } catch (error) {
        console.error("Fetch Course API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch course" }, { status: 500 });
    }
}
