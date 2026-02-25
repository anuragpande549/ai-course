"use client"

import React, { useEffect, useState, use } from 'react'
import { useUserContext } from '../../../../_context/userInputContext'
import { useRouter } from 'next/navigation'
import { Check, Loader2, PlayCircle, AlertCircle, ArrowRight } from 'lucide-react'

function GenerateCourse({ params }) {
    const unwrappedParams = use(params);
    const { courseLayout, courseId, setCourseLayout } = useUserContext();
    const router = useRouter();

    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [completedChapters, setCompletedChapters] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    // Fetch Layout if missing
    useEffect(() => {
        if (!courseLayout) {
            const fetchCourse = async () => {
                try {
                    const response = await fetch(`/api/course?courseId=${unwrappedParams.courseId}`);
                    const data = await response.json();
                    if (data.success) {
                        setCourseLayout(data.course.courseOutput);
                    }
                } catch (e) {
                    console.error("Failed to fetch layout", e);
                }
            };
            fetchCourse();
        }
    }, [courseLayout, unwrappedParams.courseId, setCourseLayout]);

    const generateChapterContent = async () => {
        if (!courseLayout?.chapters) return;
        setIsGenerating(true);

        const totalChapters = courseLayout.chapters.length;

        for (let i = 0; i < totalChapters; i++) {
            const chapter = courseLayout.chapters[i];
            try {
                // Call Phase 3 API
                const res = await fetch('/api/generate-chapter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        courseId: unwrappedParams.courseId || courseId,
                        courseName: courseLayout.courseName,
                        chapterName: chapter.chapterName,
                        about: chapter.about,
                        chapterIndex: i + 1
                    })
                });

                const data = await res.json();

                if (data.success) {
                    setCompletedChapters(prev => [...prev, i]);
                    setProgress(Math.floor(((i + 1) / totalChapters) * 100));
                }

            } catch (error) {
                console.error(`Error generating chapter ${i}:`, error);
                // Optionally handle errors, but for now we continue
            }
        }

        // Auto-Publish Course after Generation
        try {
            await fetch('/api/publish-course', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId: unwrappedParams.courseId || courseId,
                    isPublished: true
                })
            });
        } catch (e) {
            console.error("Failed to auto-publish:", e);
        }

        setIsGenerating(false);
        setIsFinished(true);
    };

    if (!courseLayout) {
        return (
            <div className='flex items-center justify-center min-h-[50vh]'>
                <div className='flex items-center gap-2 text-slate-900 font-bold'>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading course data...
                </div>
            </div>
        )
    }

    const totalChapters = courseLayout?.chapters?.length || 0;

    return (
        <div className='min-h-screen bg-slate-50 text-[#1c1d1f] font-sans pb-20'>

            {/* --- Top Navigation Bar --- */}
            <div className='bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm'>
                <div>
                    <h1 className='text-2xl font-bold font-serif text-slate-900'>Finalize Curriculum</h1>
                    <p className='text-sm text-slate-600 mt-1 line-clamp-1 max-w-xl'>
                        {courseLayout.courseName}
                    </p>
                </div>
                {isFinished && (
                    <button
                        onClick={() => router.push(`/course/${courseId || unwrappedParams.courseId}`)}
                        className='bg-[#a435f0] text-white hover:bg-[#8710d8] font-bold py-2.5 px-6 rounded-none transition-colors flex items-center gap-2'
                    >
                        View Course <ArrowRight className='w-4 h-4' />
                    </button>
                )}
            </div>

            <div className='max-w-3xl mx-auto mt-10 px-6'>

                {/* --- Status Banner --- */}
                <div className={`border p-4 mb-8 flex items-start gap-3 text-sm ${isFinished
                    ? 'bg-green-50 border-green-200 text-green-900'
                    : isGenerating
                        ? 'bg-blue-50 border-blue-200 text-blue-900'
                        : 'bg-white border-slate-300 text-slate-700'
                    }`}>
                    {isFinished ? (
                        <Check className='w-5 h-5 shrink-0 mt-0.5 text-green-700' />
                    ) : isGenerating ? (
                        <Loader2 className='w-5 h-5 shrink-0 mt-0.5 animate-spin text-blue-700' />
                    ) : (
                        <AlertCircle className='w-5 h-5 shrink-0 mt-0.5 text-slate-900' />
                    )}

                    <div>
                        <h3 className='font-bold mb-1'>
                            {isFinished ? 'Course Successfully Generated!' : isGenerating ? 'Generating Content...' : 'Ready to Generate'}
                        </h3>
                        <p>
                            {isFinished
                                ? 'Your syllabus, detailed markdown content, and video resources have been compiled and published.'
                                : isGenerating
                                    ? 'Please keep this page open. We are actively drafting curriculum content and searching for the best resources.'
                                    : 'Click the button below to start building your course content. This process generates detailed text and video links for each chapter.'}
                        </p>
                    </div>
                </div>

                {/* --- Main Content Box --- */}
                <div className='bg-white border border-slate-300'>

                    {/* Header / Progress Bar */}
                    <div className='p-6 border-b border-slate-200'>
                        <div className='flex justify-between items-end mb-4'>
                            <h2 className='text-xl font-bold'>Processing Chapters</h2>
                            <span className='text-sm font-bold text-slate-600'>
                                {completedChapters.length} / {totalChapters} Completed
                            </span>
                        </div>

                        {/* Sharp Progress Bar */}
                        <div className='w-full bg-slate-100 h-2 border border-slate-200 overflow-hidden'>
                            <div
                                className={`h-full transition-all duration-500 ease-out ${isFinished ? 'bg-green-600' : 'bg-slate-900'}`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Chapter List */}
                    <div className='p-6 space-y-3'>
                        {courseLayout?.chapters?.map((chapter, index) => {
                            const isDone = completedChapters.includes(index);
                            const isCurrent = isGenerating && index === completedChapters.length;
                            const isWaiting = !isDone && !isCurrent;

                            return (
                                <div key={index} className={`flex items-center justify-between p-4 border transition-colors ${isCurrent ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white'
                                    }`}>
                                    <div className='flex items-center gap-4'>
                                        <div className='text-sm font-bold text-slate-500 w-6'>
                                            {index + 1}.
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-bold ${isWaiting ? 'text-slate-600' : 'text-slate-900'}`}>
                                                {chapter.chapterName}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Status Indicators */}
                                    <div className='flex items-center'>
                                        {isDone && (
                                            <span className='flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-1'>
                                                <Check className='w-3.5 h-3.5' /> Done
                                            </span>
                                        )}
                                        {isCurrent && (
                                            <span className='flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-slate-100 border border-slate-300 px-2 py-1'>
                                                <Loader2 className='w-3.5 h-3.5 animate-spin' /> Generating
                                            </span>
                                        )}
                                        {isWaiting && (
                                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Footer Actions */}
                    <div className='p-6 border-t border-slate-200 bg-slate-50'>
                        {!isFinished && !isGenerating && progress === 0 ? (
                            <button
                                onClick={generateChapterContent}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-none transition-colors"
                            >
                                Start Generation Process
                            </button>
                        ) : isFinished ? (
                            <button
                                onClick={() => router.push(`/course/${courseId || unwrappedParams.courseId}`)}
                                className="w-full bg-[#a435f0] hover:bg-[#8710d8] text-white font-bold py-3.5 px-6 rounded-none transition-colors flex items-center justify-center gap-2"
                            >
                                <PlayCircle className='w-5 h-5' /> View Your Finished Course
                            </button>
                        ) : (
                            <button
                                disabled
                                className="w-full bg-slate-200 text-slate-500 font-bold py-3.5 px-6 rounded-none cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Loader2 className='w-5 h-5 animate-spin' /> Processing... Please wait
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GenerateCourse