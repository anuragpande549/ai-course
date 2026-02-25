"use client"

import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../../_context/userInputContext'; 
import { Trash2, ArrowUp, ArrowDown, PlusCircle, BookOpen, Save, Loader2 } from 'lucide-react';

function CourseLayoutEditor({ next }) {
    // Pull courseId and layout from the context populated in Phase 1
    const { courseLayout, setCourseLayout, courseId } = useUserContext();
    
    // Initialize local state. Fallback to empty array to prevent map errors
    const [chapters, setChapters] = useState(courseLayout || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (courseLayout) {
            setChapters(courseLayout);
        }
    }, [courseLayout]);

    // --- Editor Actions ---

    const handleUpdateChapter = (index, field, value) => {
        const updatedChapters = [...chapters];
        updatedChapters[index][field] = value;
        setChapters(updatedChapters);
    };

    const handleDeleteChapter = (index) => {
        const updatedChapters = chapters.filter((_, i) => i !== index);
        setChapters(updatedChapters);
    };

    const handleMoveUp = (index) => {
        if (index === 0) return;
        const updatedChapters = [...chapters];
        [updatedChapters[index - 1], updatedChapters[index]] = [updatedChapters[index], updatedChapters[index - 1]];
        setChapters(updatedChapters);
    };

    const handleMoveDown = (index) => {
        if (index === chapters.length - 1) return;
        const updatedChapters = [...chapters];
        [updatedChapters[index + 1], updatedChapters[index]] = [updatedChapters[index], updatedChapters[index + 1]];
        setChapters(updatedChapters);
    };

    const handleAddChapter = () => {
        setChapters([
            ...chapters, 
            { 
                chapterName: "New Custom Topic", 
                about: "Describe your custom topic here.",
                duration: "1 Hour"
            }
        ]);
    };

    // --- Save to Backend ---

    const handleSaveLayout = async () => {
        setLoading(true);

        try {
            // Update global context so the rest of the app has the freshest data
            setCourseLayout(chapters);

            // Call the Phase 2 API
            const response = await fetch('/api/update-layout', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId: courseId, 
                    chapters: chapters 
                })
            });

            const data = await response.json();

            if (data.success) {
                console.log("Layout saved successfully!");
                // Move to Phase 3 (Final Content Generation)
                if (next) next();
            } else {
                alert("Failed to save the layout: " + data.error);
            }

        } catch (error) {
            console.error("Error saving layout:", error);
            alert("An error occurred while saving.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-6 md:px-20 lg:px-44 mt-10'>
            
            <div className='flex items-center gap-4 mb-8'>
                <div className='bg-indigo-100 p-3 rounded-full'>
                    <BookOpen className='h-8 w-8 text-indigo-600' />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-slate-800'>Review & Edit Course Layout</h2>
                    <p className='text-sm text-slate-500'>Customize the AI-generated structure. Add, remove, or rearrange chapters.</p>
                </div>
            </div>

            <div className='bg-white border rounded-xl p-6 shadow-sm space-y-4'>
                {chapters.map((chapter, index) => (
                    <div key={index} className='flex items-start gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50 hover:border-indigo-300 transition-all group'>
                        
                        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm shrink-0 mt-1'>
                            {index + 1}
                        </div>

                        <div className='flex-1 space-y-3'>
                            <input 
                                type="text"
                                value={chapter.chapterName}
                                onChange={(e) => handleUpdateChapter(index, 'chapterName', e.target.value)}
                                className='w-full font-semibold text-lg bg-transparent outline-none border-b border-transparent focus:border-indigo-400 focus:bg-white p-1 rounded transition-all'
                                placeholder='Chapter Title'
                            />
                            <textarea 
                                value={chapter.about}
                                onChange={(e) => handleUpdateChapter(index, 'about', e.target.value)}
                                rows={2}
                                className='w-full text-sm text-slate-600 bg-transparent outline-none border-b border-transparent focus:border-indigo-400 focus:bg-white p-1 rounded transition-all resize-none'
                                placeholder='What is this chapter about?'
                            />
                        </div>

                        <div className='flex flex-col gap-2 shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity'>
                            <button 
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0}
                                className='p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors'
                                title="Move Up"
                            >
                                <ArrowUp className='h-4 w-4' />
                            </button>
                            <button 
                                onClick={() => handleMoveDown(index)}
                                disabled={index === chapters.length - 1}
                                className='p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors'
                                title="Move Down"
                            >
                                <ArrowDown className='h-4 w-4' />
                            </button>
                            <button 
                                onClick={() => handleDeleteChapter(index)}
                                className='p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors'
                                title="Delete Chapter"
                            >
                                <Trash2 className='h-4 w-4' />
                            </button>
                        </div>
                    </div>
                ))}

                <button 
                    onClick={handleAddChapter}
                    className='w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-medium'
                >
                    <PlusCircle className='h-5 w-5' />
                    Add Custom Topic
                </button>
            </div>

            <div className='flex justify-end gap-4 pt-6'>
                <button 
                    disabled={loading}
                    className='px-6 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors disabled:opacity-50'
                >
                    Back
                </button>
                <button 
                    onClick={handleSaveLayout}
                    disabled={loading}
                    className='flex items-center gap-2 px-6 py-2 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 disabled:opacity-50'
                >
                    {loading ? (
                        <>
                            <Loader2 className='h-4 w-4 animate-spin' />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className='h-4 w-4' />
                            Save & Proceed
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default CourseLayoutEditor;