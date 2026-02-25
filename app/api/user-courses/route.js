import { db } from "@/configs/db";
import { courseList } from "@/configs/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const createdBy = searchParams.get('createdBy');

    if (!createdBy) {
        return NextResponse.json({ success: false, error: "Missing createdBy parameter" }, { status: 400 });
    }

    try {
        const courses = await db.select()
            .from(courseList)
            .where(eq(courseList.createdBy, createdBy))
            .orderBy(desc(courseList.id));

        return NextResponse.json({ success: true, courses });
    } catch (error) {
        console.error("Fetch User Courses API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch user courses" }, { status: 500 });
    }
}
