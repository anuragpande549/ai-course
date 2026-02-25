"use client"

import React, { useEffect, useState } from 'react'
import { BookOpen, Search, MoreVertical, Clock, Filter, SquarePlus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function MyCourse() {
    const { user } = useUser();
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        if (user) {
            fetchCourses();
        }
    }, [user]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const email = user?.primaryEmailAddress?.emailAddress;
            if (!email) return;

            const res = await fetch(`/api/user-courses?createdBy=${email}`);
            const data = await res.json();
            if (data.success) {
                setCourseList(data.courses);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Filter Logic
    const filteredCourses = courseList.filter(course =>
        course?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='p-6 md:p-10'>

            {/* --- Header Section --- */}
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-8'>
                <div>
                    <h2 className='text-3xl font-bold text-slate-800'>My Courses</h2>
                    <p className='text-sm text-slate-500'>Manage and edit your AI-generated content</p>
                </div>

                {/* Search & Filter */}
                <div className='flex items-center gap-3 w-full md:w-auto'>
                    <div className='relative w-full md:w-64'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full focus:outline-indigo-500 text-sm'
                        />
                    </div>
                </div>
            </div>

            {/* --- Content Grid --- */}
            {loading ? (
                // Skeleton Loading State
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {[1, 2, 3].map((item) => (
                        <div key={item} className='h-[280px] bg-slate-100 rounded-xl animate-pulse'></div>
                    ))}
                </div>
            ) : filteredCourses.length > 0 ? (
                // Actual Course List
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredCourses.map((course) => (
                        <CourseItem key={course.id} course={course} refreshData={fetchCourses} />
                    ))}
                </div>
            ) : (
                // Empty State (No Search Results or No Courses)
                <div className='flex flex-col items-center justify-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center'>
                    <BookOpen className='h-12 w-12 text-slate-300 mb-4' />
                    <h3 className='text-lg font-semibold text-slate-700'>No courses found</h3>
                    {searchQuery ? (
                        <p className='text-slate-500'>Try adjusting your search terms.</p>
                    ) : (
                        <div className='mt-4'>
                            <p className='text-slate-500 mb-4'>You haven't created any courses yet.</p>
                            <Link href={'/dashboard/create-course'}>
                                <button className='flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors mx-auto'>
                                    <SquarePlus className='h-4 w-4' />
                                    Create New Course
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

// --- Internal Sub-Component: Course Item Card ---
function CourseItem({ course, refreshData }) {
    const layout = course.courseOutput;
    const router = useRouter();
    const [isPublishing, setIsPublishing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false)
    const publishCourse = async (e) => {
        e.stopPropagation();
        setIsPublishing(true);
        try {
            const res = await fetch('/api/publish-course', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId: course.courseId,
                    isPublished: !course.isPublished
                })
            });
            const data = await res.json();
            if (data.success) {
                if (refreshData) refreshData();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsPublishing(false);
        }
    };
    const deleteCourse = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // DEBUG: Check what the course object actually contains
        console.log("Attempting to delete course object:", course);

        // Fallback to course.id if course.courseId doesn't exist
        const targetId = course?.courseId || course?.id;

        if (!targetId) {
            console.error("CRITICAL ERROR: No valid ID found for this course!");
            alert("Cannot delete: Missing course ID.");
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete "${course.name}"?`);
        if (!confirmDelete) {
            console.log("User cancelled deletion.");
            return;
        }

        setIsDeleting(true);
        console.log(`Sending DELETE request for ID: ${targetId}`);

        try {
            const res = await fetch(`/api/delete-course?courseId=${targetId}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            console.log("API Response:", data);

            if (data.success) {
                if (refreshData) refreshData();
            } else {
                alert("Failed to delete course: " + (data.error || "Unknown error"));
                setIsDeleting(false);
            }
        } catch (error) {
            console.error("Fetch failed entirely:", error);
            alert("Something went wrong while deleting.");
            setIsDeleting(false);
        }
    };

    return (
        <div
            onClick={() => {
                if (course.isPublished) {
                    router.push(`/course/${course.courseId}`);
                } else {
                    router.push(`/dashboard/create-course/${course.courseId}`);
                }
            }}
            className='border border-slate-200 rounded-xl hover:shadow-lg hover:shadow-indigo-50 transition-all bg-white overflow-hidden group cursor-pointer flex flex-col relative'
        >
            {/* Visual Cover */}
            <div className={`h-40 w-full bg-slate-100 flex items-center justify-center relative`}>
                <BookOpen className='h-12 w-12 text-slate-300 mix-blend-multiply' />

                {/* Floating Action Buttons */}
                <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2'>
                    <button
                        className={`p-2 bg-white/90 rounded-full hover:bg-white shadow-sm`}
                        onClick={deleteCourse}
                        title="Delete Course"
                    >
                        <Trash2 className='h-4 w-4 text-red-500' />
                    </button>
                    <button
                        className={`p-2 bg-white/90 rounded-full hover:bg-white shadow-sm ${isPublishing ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={publishCourse}
                        title={course.isPublished ? "Unpublish Course" : "Publish Course"}
                    >
                        {course.isPublished ? (
                            <Clock className='h-4 w-4 text-orange-500' /> // You can import a different icon if preferred, Clock is used for now 
                        ) : (
                            <SquarePlus className='h-4 w-4 text-green-600' />
                        )}
                    </button>
                    <button className='p-2 bg-white/90 rounded-full hover:bg-white shadow-sm' onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/create-course/${course.courseId}`); }}>
                        <Search className='h-4 w-4 text-indigo-700' />
                    </button>
                </div>
            </div>

            {/* Details */}
            <div className='p-5 flex flex-col flex-1'>
                <div className='flex justify-between items-start mb-2 gap-2'>
                    <h3 className='font-bold text-lg text-slate-800 line-clamp-2 leading-tight'>{course.name}</h3>
                </div>

                {/* Tags */}
                <div className='flex items-center flex-wrap gap-2 mt-auto mb-4'>
                    <span className='px-2 py-1 text-[10px] uppercase tracking-wide font-bold text-indigo-700 bg-indigo-50 rounded-md'>
                        {course.category}
                    </span>
                    <span className='px-2 py-1 text-[10px] uppercase tracking-wide font-bold text-slate-600 bg-slate-100 rounded-md'>
                        {course.level}
                    </span>
                    {course.isPublished ? (
                        <span className='px-2 py-1 text-[10px] uppercase tracking-wide font-bold text-green-700 bg-green-100 rounded-md'>
                            Published
                        </span>
                    ) : (
                        <span className='px-2 py-1 text-[10px] uppercase tracking-wide font-bold text-slate-500 bg-slate-200 rounded-md'>
                            Draft
                        </span>
                    )}
                </div>

                {/* Footer Metadata */}
                <div className='flex items-center justify-between text-xs text-slate-500 border-t pt-3'>
                    <div className='flex items-center gap-1.5'>
                        <BookOpen className='h-3.5 w-3.5 text-indigo-500' />
                        <span className='font-medium'>{layout?.chapters?.length || 0} Chapters</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <Clock className='h-3.5 w-3.5 text-indigo-500' />
                        <span className='font-medium'>AI Generated</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCourse