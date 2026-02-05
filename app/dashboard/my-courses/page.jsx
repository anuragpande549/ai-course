"use client"

import React, { useEffect, useState } from 'react'
import { BookOpen, Search, MoreVertical, Clock, Filter, SquarePlus } from 'lucide-react'
import Link from 'next/link'

function MyCourse() {
  // Mock Data
  const mockCourses = [
    {
      id: 1,
      title: "Python for Data Science",
      category: "Programming",
      level: "Intermediate",
      lessons: 12,
      thumb: "/course-1.png", 
      color: "bg-blue-100"
    },
    {
      id: 2,
      title: "Digital Marketing 101",
      category: "Marketing",
      level: "Beginner",
      lessons: 8,
      thumb: "/course-2.png", 
      color: "bg-purple-100"
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      category: "Design",
      level: "Advanced",
      lessons: 20,
      thumb: "/course-3.png", 
      color: "bg-pink-100"
    },
    {
        id: 4,
        title: "Personal Finance Basics",
        category: "Finance",
        level: "Beginner",
        lessons: 5,
        thumb: "/course-4.png", 
        color: "bg-green-100"
      },
  ];

  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate Fetching Data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
        setCourseList(mockCourses);
        setLoading(false);
    }, 1000);
  }, []);

  // Filter Logic
  const filteredCourses = courseList.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                <button className='p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600'>
                    <Filter className='h-4 w-4' />
                </button>
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
                    <CourseItem key={course.id} course={course} />
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
function CourseItem({ course }) {
    return (
        <div className='border border-slate-200 rounded-xl hover:shadow-lg hover:shadow-indigo-50 transition-all bg-white overflow-hidden group cursor-pointer flex flex-col'>
            {/* Visual Cover */}
            <div className={`h-40 w-full ${course.color} flex items-center justify-center relative`}>
                <BookOpen className='h-12 w-12 text-slate-400 opacity-50 mix-blend-multiply' />
                
                {/* Floating Edit Button */}
                <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <button className='p-2 bg-white/90 rounded-full hover:bg-white shadow-sm'>
                        <MoreVertical className='h-4 w-4 text-slate-700' />
                    </button>
                </div>
            </div>

            {/* Details */}
            <div className='p-5 flex flex-col flex-1'>
                <div className='flex justify-between items-start mb-2'>
                    <h3 className='font-bold text-lg text-slate-800 line-clamp-2 leading-tight'>{course.title}</h3>
                </div>
                
                {/* Tags */}
                <div className='flex items-center gap-2 mt-auto mb-4'>
                    <span className='px-2 py-1 text-[10px] uppercase tracking-wide font-bold text-indigo-700 bg-indigo-50 rounded-md'>
                        {course.category}
                    </span>
                    <span className='px-2 py-1 text-[10px] uppercase tracking-wide font-bold text-slate-600 bg-slate-100 rounded-md'>
                        {course.level}
                    </span>
                </div>

                {/* Footer Metadata */}
                <div className='flex items-center justify-between text-xs text-slate-500 border-t pt-3'>
                    <div className='flex items-center gap-1.5'>
                        <BookOpen className='h-3.5 w-3.5 text-indigo-500' />
                        <span className='font-medium'>{course.lessons} Chapters</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <Clock className='h-3.5 w-3.5 text-indigo-500' />
                        <span className='font-medium'>2h 30m</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCourse