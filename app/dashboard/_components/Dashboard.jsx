import React from 'react'
import Link from 'next/link'
import { SquarePlus, BookOpen, MoreVertical, Clock, Gem } from 'lucide-react'
import { currentUser } from '@clerk/nextjs/server';

export async function Dashboard() {
  
  // Mock Data: Replace this with real data from your database later
  const userCourses = [
    {
      id: 1,
      title: "Python for Data Science",
      category: "Programming",
      level: "Intermediate",
      lessons: 12,
      thumb: "/course-1.png", // specific image or placeholder
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
    // Add more mock items to test grid...
  ];
  const userInfo = await currentUser()
  console.log({userInfo})

  return (
    <div className='p-6 md:p-10'>
        
        {/* --- 1. Hero / Welcome Banner --- */}
        <div className='bg-indigo-50  rounded-2xl p-6 md:p-10   flex flex-col md:flex-row items-center justify-between gap-6 mb-10'>
            <div>
                <h2 className='text-3xl font-bold text-slate-800 mb-2'>
                    Welcome back, {userInfo.firstName}! 👋
                </h2>
                <p className='text-slate-500 max-w-lg'>
                    You have created <span className='font-bold text-indigo-600'>{userCourses.length} courses</span> so far. 
                    Ready to share more knowledge with the world?
                </p>
            </div>
            
            <Link href={'/dashboard/create-course'}>
                <button className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all transform hover:scale-105'>
                    <SquarePlus className='h-5 w-5' />
                    Create New Course
                </button>
            </Link>
        </div>

        {/* --- 2. My Courses Grid --- */}
        <div className='mb-6'>
            <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-bold text-slate-800'>My Courses</h3>
                <button className='text-sm text-indigo-600 font-medium hover:underline'>View All</button>
            </div>

            {userCourses.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {userCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                    
                    {/* Ghost Card for "Add New" visual cue */}
                    <Link href={'/dashboard/create-course'} className='group border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl flex flex-col items-center justify-center p-10 cursor-pointer transition-colors min-h-[250px]'>
                        <div className='bg-slate-50 group-hover:bg-indigo-50 p-4 rounded-full mb-3 transition-colors'>
                            <SquarePlus className='h-8 w-8 text-slate-400 group-hover:text-indigo-600' />
                        </div>
                        <p className='font-semibold text-slate-500 
                        group-hover:text-indigo-600'>Create New Course</p>
                    </Link>
                </div>
            ) : (
                /* Empty State */
                <div className='text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200'>
                    <BookOpen className='h-12 w-12 text-slate-300 mx-auto mb-4' />
                    <h3 className='text-lg font-semibold text-slate-700'>No courses yet</h3>
                    <p className='text-slate-500 mb-6'>Create your first AI-generated course today.</p>
                    <Link href={'/dashboard/create-course'}>
                        <button className='bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm'>
                            Get Started
                        </button>
                    </Link>
                </div>
            )}
        </div>

    </div>
  )
}

// --- Sub-Component: Course Card ---
function CourseCard({ course }) {
    return (
        <div className='border border-slate-200 rounded-xl hover:shadow-lg hover:shadow-indigo-50 transition-all bg-white overflow-hidden group cursor-pointer'>
            {/* Thumbnail Placeholder */}
            <div className={`h-40 w-full ${course.color} flex items-center justify-center relative`}>
                <BookOpen className='h-12 w-12 text-slate-400 opacity-50' />
                
                {/* Overlay Options */}
                <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <button className='p-2 bg-white/90 rounded-full hover:bg-white'>
                        <MoreVertical className='h-4 w-4 text-slate-700' />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className='p-5'>
                <div className='flex justify-between items-start mb-2'>
                    <h3 className='font-bold text-lg text-slate-800 line-clamp-2'>{course.title}</h3>
                </div>
                
                <div className='flex items-center justify-between mt-4'>
                     <div className='flex items-center gap-2'>
                        <span className='px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-md'>
                            {course.category}
                        </span>
                         <span className='px-2 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-md'>
                            {course.level}
                        </span>
                     </div>
                </div>

                {/* Footer Info */}
                <div className='mt-4 flex items-center justify-between text-xs text-slate-500 border-t pt-3'>
                    <div className='flex items-center gap-1'>
                        <BookOpen className='h-3 w-3' />
                        {course.lessons} Chapters
                    </div>
                    <div className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        2h 30m
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard