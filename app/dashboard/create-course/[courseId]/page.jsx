"use client"

import React, { useEffect, useState, use } from 'react'
import { useUserContext } from '../../../_context/userInputContext'
import { useRouter } from 'next/navigation'
import { FileText, Edit2, Trash2, Plus, Check, X, GripVertical, AlertCircle } from 'lucide-react'

function CourseEditor({ params }) {
    const unwrappedParams = use(params);
    const { courseLayout, courseId, setCourseLayout } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(!courseLayout);
    const router = useRouter();

    const [editingIndex, setEditingIndex] = useState(null)
    const [editFormData, setEditFormData] = useState({ chapterName: '', about: '', duration: '' })

    // State to keep track of the item currently being dragged
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            setIsFetching(true);
            try {
                const response = await fetch(`/api/course?courseId=${unwrappedParams.courseId}`);
                const data = await response.json();
                if (data.success) {
                    setCourseLayout(data.course.courseOutput);
                }
            } catch (e) {
                console.error("Failed to fetch layout", e);
            } finally {
                setIsFetching(false);
            }
        };
        if (!courseLayout) fetchCourse();
    }, [unwrappedParams.courseId, setCourseLayout, courseLayout]);

    if (isFetching || !courseLayout) {
        return (
            <div className='flex items-center justify-center min-h-[50vh]'>
                <div className='flex items-center gap-2 text-slate-600 font-bold'>
                    <span className="animate-spin h-5 w-5 border-2 border-slate-900 border-t-transparent rounded-full"></span>
                    Loading Curriculum...
                </div>
            </div>
        )
    }

    // --- Drag and Drop Handlers ---
    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        // This effectAllowed makes the cursor look like a move action
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e) => {
        // Necessary to prevent default behavior to allow dropping
        e.preventDefault();
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();

        // If we drop it on itself, do nothing
        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            return;
        }

        // Reorder the chapters array
        const updatedChapters = [...courseLayout.chapters];
        const draggedChapter = updatedChapters[draggedIndex];

        // Remove from the old index
        updatedChapters.splice(draggedIndex, 1);
        // Insert at the new index
        updatedChapters.splice(dropIndex, 0, draggedChapter);

        // Update the context state
        setCourseLayout({ ...courseLayout, chapters: updatedChapters });
        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };
    // ------------------------------

    const handleSaveAndGenerate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/update-layout', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId: courseId || unwrappedParams.courseId,
                    chapters: courseLayout.chapters
                })
            });

            const data = await response.json();
            if (data.success) {
                router.push(`/dashboard/create-course/${courseId || unwrappedParams.courseId}/finish`);
            } else {
                alert("Error updating layout: " + data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (index, chapter) => {
        setEditingIndex(index)
        setEditFormData(chapter)
    }

    const handleSaveEdit = () => {
        const updatedChapters = [...courseLayout.chapters]
        updatedChapters[editingIndex] = editFormData
        setCourseLayout({ ...courseLayout, chapters: updatedChapters })
        setEditingIndex(null)
    }

    const handleCancelEdit = () => {
        setEditingIndex(null)
    }

    const handleDelete = (index) => {
        if (confirm("Are you sure you want to delete this chapter? This cannot be undone.")) {
            const updatedChapters = courseLayout.chapters.filter((_, i) => i !== index)
            setCourseLayout({ ...courseLayout, chapters: updatedChapters })
            if (editingIndex === index) setEditingIndex(null)
        }
    }

    const handleAddChapter = () => {
        const newChapter = { chapterName: '', about: '', duration: '' }
        const newChaptersList = [...(courseLayout.chapters || []), newChapter]
        setCourseLayout({ ...courseLayout, chapters: newChaptersList })
        setEditingIndex(newChaptersList.length - 1)
        setEditFormData(newChapter)
    }

    return (
        <div className='min-h-screen bg-white text-slate-900 pb-20'>

            {/* Top Navigation Bar (Instructor Style) */}
            <div className='bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm'>
                <div>
                    <h1 className='text-2xl font-bold font-serif text-slate-900'>Curriculum</h1>
                    <p className='text-sm text-slate-600 mt-1'>
                        {courseLayout.courseName}
                    </p>
                </div>
                <button
                    onClick={handleSaveAndGenerate}
                    disabled={loading}
                    className='bg-slate-900 text-white hover:bg-slate-800 font-bold py-2.5 px-6 rounded-none transition-colors disabled:opacity-50 flex items-center gap-2'
                >
                    {loading ? (
                        <><span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> Saving...</>
                    ) : 'Save & Continue'}
                </button>
            </div>

            <div className='max-w-4xl mx-auto mt-10 px-6'>
                {/* Information Banner */}
                <div className='bg-slate-50 border border-slate-200 p-4 mb-8 flex items-start gap-3 text-sm text-slate-700'>
                    <AlertCircle className='w-5 h-5 text-slate-900 shrink-0 mt-0.5' />
                    <div>
                        <p>Start putting together your course by creating chapters and adding descriptions. You can drag and drop chapters to reorder them later.</p>
                    </div>
                </div>

                <div className='space-y-4 bg-slate-50 p-6 border border-slate-200'>
                    {courseLayout?.chapters?.map((chapter, index) => (
                        <div
                            key={index}
                            // Add Drag and Drop Handlers here
                            draggable={editingIndex === null} // Only draggable when not editing anything
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                            // Visual feedback when dragging
                            className={`bg-white border border-slate-300 group transition-all duration-200 ${draggedIndex === index ? 'opacity-40 shadow-lg scale-[1.02]' : ''
                                }`}
                        >

                            {editingIndex === index ? (
                                /* --- EDIT MODE --- */
                                <div className='p-5 border-l-4 border-l-slate-900'>
                                    <div className='flex items-center gap-2 font-bold text-sm mb-4'>
                                        Chapter {index + 1}:
                                    </div>
                                    <div className='space-y-4'>
                                        <div>
                                            <label className='block text-xs font-bold text-slate-900 mb-1 uppercase tracking-wide'>Chapter Title</label>
                                            <input
                                                type='text'
                                                placeholder='Enter a title'
                                                maxLength={80}
                                                value={editFormData.chapterName}
                                                onChange={(e) => setEditFormData({ ...editFormData, chapterName: e.target.value })}
                                                className='w-full border border-slate-900 p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900'
                                            />
                                        </div>
                                        <div>
                                            <label className='block text-xs font-bold text-slate-900 mb-1 uppercase tracking-wide'>Description / Learning Objective</label>
                                            <textarea
                                                rows={2}
                                                placeholder='What will students learn in this chapter?'
                                                value={editFormData.about}
                                                onChange={(e) => setEditFormData({ ...editFormData, about: e.target.value })}
                                                className='w-full border border-slate-900 p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900'
                                            />
                                        </div>
                                        <div>
                                            <label className='block text-xs font-bold text-slate-900 mb-1 uppercase tracking-wide'>Estimated Duration</label>
                                            <input
                                                type='text'
                                                placeholder='e.g., 10 mins'
                                                value={editFormData.duration}
                                                onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                                                className='w-full border border-slate-900 p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900'
                                            />
                                        </div>
                                        <div className='flex items-center justify-end gap-3 pt-4'>
                                            <button onClick={handleCancelEdit} className='text-sm font-bold text-slate-900 hover:text-slate-600 transition-colors'>
                                                Cancel
                                            </button>
                                            <button onClick={handleSaveEdit} className='bg-slate-900 text-white font-bold py-2 px-4 text-sm hover:bg-slate-800 transition-colors'>
                                                Save Chapter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* --- VIEW MODE --- */
                                <div className='flex items-stretch'>
                                    {/* Drag Handle Area */}
                                    <div className={`w-10 bg-slate-50 border-r border-slate-200 flex items-center justify-center transition-colors ${editingIndex === null ? 'cursor-grab hover:bg-slate-200 active:cursor-grabbing' : 'cursor-default'}`}>
                                        <GripVertical className='w-4 h-4 text-slate-400' />
                                    </div>

                                    {/* Content Area */}
                                    <div className='p-4 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                                        <div className='flex items-start gap-3'>
                                            <div className='mt-1'>
                                                <Check className='w-4 h-4 text-slate-900' />
                                            </div>
                                            <div>
                                                <div className='text-sm text-slate-900'>
                                                    {/* The index + 1 naturally updates when the array order changes! */}
                                                    <span className='font-bold'>Chapter {index + 1}:</span>  <span className="flex-1 flex items-center gap-2">
                                                        <FileText className='w-3.5 h-3.5 inline text-slate-500' />
                                                        {chapter.chapterName || "Untitled Chapter"}
                                                    </span>
                                                </div>
                                                <p className='text-xs text-slate-500 mt-1 line-clamp-1'>
                                                    {chapter.about || "No description provided."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className='flex items-center gap-2 pl-7 sm:pl-0'>
                                            <span className='text-xs text-slate-500 mr-2 border border-slate-200 px-2 py-0.5 bg-slate-50'>
                                                {chapter.duration || "--"}
                                            </span>
                                            <button onClick={() => handleEdit(index, chapter)} className='p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors' title="Edit">
                                                <Edit2 className='w-4 h-4' />
                                            </button>
                                            <button onClick={() => handleDelete(index)} className='p-1.5 text-slate-600 hover:bg-slate-100 hover:text-red-600 transition-colors' title="Delete">
                                                <Trash2 className='w-4 h-4' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Add Chapter Button */}
                    <div className='pt-2'>
                        <button
                            onClick={handleAddChapter}
                            disabled={editingIndex !== null}
                            className={`flex items-center gap-2 font-bold text-sm border border-slate-900 py-2 px-4 hover:bg-slate-100 transition-colors ${editingIndex !== null ? 'opacity-50 cursor-not-allowed' : 'text-slate-900 bg-white'}`}
                        >
                            <Plus className='w-4 h-4' /> Chapter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseEditor