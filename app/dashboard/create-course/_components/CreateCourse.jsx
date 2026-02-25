"use client"

import { useState } from 'react'
import { LayoutGrid, Lightbulb, FileUp, CloudUpload, BarChart, AlertCircle, ArrowRight } from 'lucide-react'
import { useUserContext } from '../../../_context/userInputContext';

function CreateCourse({ next }) {
    const { userCourseInput, setUserCourseInput } = useUserContext();

    // Ensure we have a valid initial state from context
    const [activeMode, setActiveMode] = useState(userCourseInput?.mode || 'manual');
    const [difficulty, setDifficulty] = useState(userCourseInput?.difficulty || 'Beginner');
    const [topic, setTopic] = useState(userCourseInput?.topic || '');
    const [description, setDescription] = useState(userCourseInput?.description || '');

    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        // Update global state before moving to next step
        setUserCourseInput(prev => ({
            ...prev,
            mode: activeMode,
            difficulty: difficulty,
            topic: topic,
            description: description,
        }));
        if (next) next();
    };

    return (
        <div className='min-h-screen bg-slate-50 text-[#1c1d1f] font-sans pb-20 pt-10'>
            <div className='max-w-3xl mx-auto px-6'>

                {/* Header Section */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold font-serif text-slate-900 mb-2'>Create New Course</h1>
                    <p className='text-sm text-slate-600'>Choose your content source and target audience to begin structuring your curriculum.</p>
                </div>

                {/* Information Banner */}
                <div className='bg-white border border-slate-300 p-4 mb-8 flex items-start gap-3 text-sm text-slate-700'>
                    <AlertCircle className='w-5 h-5 text-slate-900 shrink-0 mt-0.5' />
                    <div>
                        <p>You can generate a course structure manually by providing a topic and description, or by uploading an existing syllabus PDF. Our AI will handle the rest.</p>
                    </div>
                </div>

                {/* Main Form Container */}
                <div className='bg-white border border-slate-300'>

                    {/* Mode Selection Tabs (Udemy Style) */}
                    <div className='flex border-b border-slate-200 px-6 pt-2'>
                        <button
                            onClick={() => setActiveMode('manual')}
                            className={`pb-3 px-4 font-bold text-sm transition-colors mt-4 relative ${activeMode === 'manual'
                                    ? 'text-slate-900 border-b-4 border-slate-900'
                                    : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            Topic & Description
                        </button>
                        <button
                            onClick={() => setActiveMode('upload')}
                            className={`pb-3 px-4 font-bold text-sm transition-colors mt-4 relative ${activeMode === 'upload'
                                    ? 'text-slate-900 border-b-4 border-slate-900'
                                    : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            Upload Syllabus PDF
                        </button>
                    </div>

                    <div className='p-6 md:p-8'>
                        {/* --- DYNAMIC CONTENT (Based on Mode) --- */}
                        <div className='mb-10 min-h-[160px]'>
                            {activeMode === 'manual' ? (
                                <div className='space-y-6 animate-in fade-in duration-300'>
                                    <div>
                                        <label className='block text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide flex items-center gap-2'>
                                            <LayoutGrid className='h-4 w-4' /> Course Topic
                                        </label>
                                        <input
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            type="text"
                                            placeholder="e.g. Python for Beginners, Advanced UI/UX Design..."
                                            maxLength={60}
                                            className='w-full border border-slate-900 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 placeholder:text-slate-400'
                                        />
                                        <p className="text-xs text-slate-500 mt-2 text-right">{topic.length}/60</p>
                                    </div>
                                    <div>
                                        <label className='block text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide flex items-center gap-2'>
                                            <Lightbulb className='h-4 w-4' /> Description / Requirements
                                        </label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={4}
                                            placeholder="Describe specific modules, learning outcomes, or key takeaways..."
                                            className='w-full border border-slate-900 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 placeholder:text-slate-400 resize-none'
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className='animate-in fade-in duration-300'>
                                    <label className='block text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide flex items-center gap-2'>
                                        <FileUp className='h-4 w-4' /> Upload Course Syllabus
                                    </label>

                                    <div className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-500 transition-colors cursor-pointer group'>
                                        <div className="bg-white p-4 border border-slate-200 rounded-full mb-3 group-hover:shadow-sm transition-shadow">
                                            <CloudUpload className='h-6 w-6 text-slate-700' />
                                        </div>
                                        <p className='text-sm font-bold text-slate-900'>Click to upload or drag and drop</p>
                                        <p className='text-xs text-slate-500 mt-1'>PDF files only (max 10MB)</p>
                                        <input type="file" accept=".pdf" className='hidden' />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* --- COMMON SECTION: Difficulty Level --- */}
                        <div className='mb-10'>
                            <label className='block text-xs font-bold text-slate-900 mb-3 uppercase tracking-wide flex items-center gap-2'>
                                <BarChart className='h-4 w-4' /> Select Difficulty Level
                            </label>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                {levels.map((item) => (
                                    <div
                                        key={item}
                                        onClick={() => setDifficulty(item)}
                                        className={`p-4 text-center border cursor-pointer transition-colors font-bold text-sm
                                            ${difficulty === item
                                                ? 'bg-slate-900 text-white border-slate-900'
                                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className='flex justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50'>
                        <button className='px-6 py-3 border border-slate-900 text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors'>
                            Cancel
                        </button>
                        <button
                            disabled={loading || (activeMode === 'manual' && (!topic || !description))}
                            onClick={handleNext}
                            className='px-6 py-3 bg-slate-900 border border-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                        >
                            {loading ? 'Processing...' : 'Continue'} <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateCourse