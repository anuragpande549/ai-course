import React from 'react'
import { db } from '../../../configs/db'
import { courseList, courseChapters } from '../../../configs/schema'
import { eq, asc } from 'drizzle-orm'
import CoursePlayer from './CoursePlayer' // We will create this file next

async function getFullCourse(courseId) {
    try {
        const courseRes = await db.select().from(courseList).where(eq(courseList.courseId, courseId))
        const chaptersRes = await db.select().from(courseChapters)
            .where(eq(courseChapters.courseId, courseId))
            .orderBy(asc(courseChapters.chapterId))

        return {
            course: courseRes[0] || null,
            chapters: chaptersRes || []
        }
    } catch (e) {
        console.error(e)
        return null
    }
}

export default async function CourseWatchPage({ params }) {
    const { courseId } = await params;
    const data = await getFullCourse(courseId);

    if (!data || !data.course) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <h1 className='text-2xl font-bold text-slate-500'>Course not found</h1>
            </div>
        )
    }

    return (
        <CoursePlayer course={data.course} chapters={data.chapters} />
    )
}