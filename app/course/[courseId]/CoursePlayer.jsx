'use client'

import React, { useState } from 'react'
import { PlayCircle, CheckCircle, Menu, X, ArrowLeft, BookOpen, Code } from 'lucide-react'
import Link from 'next/link'

export default function CoursePlayer({ course, chapters }) {
    // Default to the first chapter being active
    const [activeChapter, setActiveChapter] = useState(chapters[0]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const layout = course.courseOutput;

    if (!activeChapter) {
        return <div className="p-10 text-center">Loading course content...</div>;
    }

    return (
        <div className='flex flex-col h-screen bg-white'>
            {/* Top Navbar (Dark, Slim) */}
            <div className='h-14 bg-slate-900 text-white flex items-center justify-between px-4 shrink-0 z-20'>
                <div className='flex items-center gap-4'>
                    <Link href="/dashboard" className="hover:text-indigo-400 transition-colors">
                        <ArrowLeft className='w-5 h-5' />
                    </Link>
                    <h1 className='font-bold text-sm md:text-base truncate max-w-[200px] md:max-w-md'>
                        {course.name}
                    </h1>
                </div>

                {/* Mobile Sidebar Toggle */}
                <button
                    className='lg:hidden p-2 hover:bg-slate-800 rounded'
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
                </button>
            </div>

            {/* Main Player Area */}
            <div className='flex flex-1 overflow-hidden relative'>

                {/* Left Side: Video & Content */}
                <div className={`flex-1 overflow-y-auto ${isSidebarOpen ? 'hidden lg:block' : 'block'}`}>

                    {/* Video Player */}
                    <div className='w-full bg-black aspect-video flex items-center justify-center'>
                        {activeChapter.videoId ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${activeChapter.videoId}?autoplay=1`}
                                title={activeChapter.chapterName}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className='text-slate-500 flex flex-col items-center'>
                                <PlayCircle className='w-12 h-12 mb-2 opacity-50' />
                                <p>No video available for this section</p>
                            </div>
                        )}
                    </div>

                    {/* Content Below Video (Notes / Explanation) */}
                    <div className='max-w-4xl mx-auto p-6 md:p-10'>
                        <h2 className='text-2xl font-bold mb-6'>{activeChapter.chapterName}</h2>

                        {/* Explanation */}
                        <div className='mb-10'>
                            <h3 className='text-lg font-bold flex items-center gap-2 mb-3 border-b pb-2'>
                                <BookOpen className='w-5 h-5 text-indigo-600' /> Overview
                            </h3>
                            <p className='text-slate-700 leading-relaxed whitespace-pre-line'>
                                {activeChapter.content.detailedExplanation}
                            </p>
                        </div>

                        {/* Code Examples */}
                        {activeChapter.content.codeExamples && activeChapter.content.codeExamples.length > 0 && (
                            <div>
                                <h3 className='text-lg font-bold flex items-center gap-2 mb-4 border-b pb-2'>
                                    <Code className='w-5 h-5 text-indigo-600' /> Code Resources
                                </h3>
                                {activeChapter.content.codeExamples.map((codeEx, i) => (
                                    <div key={i} className="mb-6 rounded-lg overflow-hidden border border-slate-200">
                                        <div className="bg-slate-800 text-slate-300 text-xs px-4 py-2 font-mono">
                                            {codeEx.language}
                                        </div>
                                        <pre className="bg-slate-50 text-slate-800 p-4 overflow-x-auto text-sm">
                                            <code>{codeEx.code}</code>
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Course Content Sidebar */}
                <div className={`
                    w-full lg:w-80 lg:shrink-0 bg-white border-l border-slate-200 flex flex-col
                    absolute inset-y-0 right-0 z-10 lg:static transform transition-transform duration-300
                    ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                    ${!isSidebarOpen && 'hidden lg:flex'}
                `}>
                    <div className='p-4 font-bold text-slate-800 border-b border-slate-200 bg-slate-50 shrink-0'>
                        Course Content
                    </div>

                    <div className='overflow-y-auto flex-1'>
                        {chapters.map((chap, idx) => {
                            const isActive = activeChapter.chapterId === chap.chapterId;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setActiveChapter(chap);
                                        // Auto-close sidebar on mobile after selection
                                        if (window.innerWidth < 1024) setIsSidebarOpen(false);
                                    }}
                                    className={`w-full text-left p-4 border-b border-slate-100 flex items-start gap-3 hover:bg-slate-50 transition-colors ${isActive ? 'bg-indigo-50/50' : ''}`}
                                >
                                    <div className='mt-1 shrink-0'>
                                        {/* You can toggle CheckCircle based on completion state later */}
                                        {isActive ? (
                                            <PlayCircle className='w-5 h-5 text-indigo-600' />
                                        ) : (
                                            <input type="checkbox" className="w-4 h-4 rounded-sm mt-1 accent-indigo-600 cursor-pointer" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className={`text-sm leading-tight ${isActive ? 'font-bold text-indigo-900' : 'text-slate-700 font-medium'}`}>
                                            {idx + 1}. {chap.chapterName}
                                        </h4>
                                        <div className='text-xs text-slate-500 mt-1 flex items-center gap-2'>
                                            <PlayCircle className='w-3 h-3' />
                                            {layout.chapters[idx]?.duration || '10 min'}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}