"use client"


import React, { useState } from 'react'
import { NotebookPen, LayoutGrid, Lightbulb, FileUp, ClipboardList, CloudUpload, BarChart } from 'lucide-react'
import { useContext } from 'react';
import { UserInputConext } from '../../../_context/userInputContext';

function CreateCourse({next}) {
      const [activeMode, setActiveMode] = useState('manual'); // 'manual' or 'upload'
      const [loading, setLoading] = useState(false);
      const [difficulty, setDifficulty] = useState('Beginner'); // Default level
    
      const levels = ['Beginner', 'Intermediate', 'Advanced'];
        const {userCourseInput, setUserCourseInput} = useContext(UserInputConext)
    
        const HandleCreateCourseChange = (category)=>{
            setUserCourseInput((prev)=>(
                {
                    ...prev,
                    CreateCourse:CreateCourse
                }
            ))
        }
  return (

    <div className='p-6 md:px-20 lg:px-44 mt-10'>
      
      {/* Header Section */}
      <div className='flex  items-center gap-4 mb-8'>
        <div className='bg-indigo-100 p-3 rounded-full'>
            <NotebookPen className='h-8 w-8 text-indigo-600' />
        </div>
        <div className=''>
            <h2 className='text-2xl  font-bold text-slate-800'>Create New Course</h2>
            <p className='text-sm text-slate-500'>Choose your content source and target audience</p>
        </div>
      </div>

      {/* Mode Selection Tabs */}
      <div className='grid grid-cols-2 gap-4 mb-8 max-w-lg'>
        <div 
            onClick={() => setActiveMode('manual')}
            className={`flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all duration-200
            ${activeMode === 'manual' 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                : 'border-slate-200 hover:border-indigo-300 text-slate-500'}`}
        >
            <ClipboardList className='h-6 w-6 mb-2' />
            <span className='font-semibold text-sm'>Topic & Description</span>
        </div>

        <div 
            onClick={() => setActiveMode('upload')}
            className={`flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all duration-200
            ${activeMode === 'upload' 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                : 'border-slate-200 hover:border-indigo-300 text-slate-500'}`}
        >
            <FileUp className='h-6 w-6 mb-2' />
            <span className='font-semibold text-sm'>Upload Syllabus PDF</span>
        </div>
      </div>

      {/* Main Form Container */}
      <div className='border rounded-xl p-8 shadow-sm bg-white'>
        
        {/* --- DYNAMIC CONTENT (Based on Mode) --- */}
        <div className='mb-8'>
            {activeMode === 'manual' ? (
                <div className='animate-in fade-in slide-in-from-top-2 duration-300 space-y-6'>
                    <div>
                        <label className='text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2'>
                            <LayoutGrid className='h-4 w-4 text-indigo-600'/>
                            Course Topic
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g. Python for Beginners..." 
                            className='w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all'
                        />
                    </div>
                    <div>
                        <label className='text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2'>
                            <Lightbulb className='h-4 w-4 text-indigo-600'/>
                            Description / Requirements
                        </label>
                        <textarea 
                            rows={4}
                            placeholder="Describe specific modules or key takeaways..." 
                            className='w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none'
                        />
                    </div>
                </div>
            ) : (
                <div className='animate-in fade-in slide-in-from-top-2 duration-300'>
                    <label className='text-sm font-semibold text-slate-700 flex items-center gap-2 mb-4'>
                        <FileUp className='h-4 w-4 text-indigo-600'/>
                        Upload Course Syllabus (PDF)
                    </label>
                    
                    <div className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 hover:border-indigo-400 transition-all cursor-pointer'>
                        <CloudUpload className='h-10 w-10 text-indigo-500 mb-3' />
                        <p className='text-sm font-medium text-slate-700'>Click to upload or drag and drop</p>
                        <p className='text-xs text-slate-500 mt-1'>PDF files only (max 10MB)</p>
                        <input type="file" accept=".pdf" className='hidden' />
                    </div>
                </div>
            )}
        </div>

        {/* --- COMMON SECTION: Difficulty Level --- */}
        <div className='mb-8'>
             <label className='text-sm font-semibold text-slate-700 flex items-center gap-2 mb-4'>
                <BarChart className='h-4 w-4 text-indigo-600'/>
                Select Difficulty Level
            </label>
            
            <div className='grid grid-cols-3 gap-3'>
                {levels.map((item) => (
                    <div 
                        key={item}
                        onClick={() => setDifficulty(item)}
                        className={`p-3 text-center rounded-lg border cursor-pointer transition-all
                        ${difficulty === item 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
                        }`}
                    >
                        <span className='text-sm font-medium'>{item}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Footer Actions */}
        <div className='flex justify-end gap-4 pt-4 border-t border-slate-100'>
            <button className='px-6 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors'>
                Cancel
            </button>
            <button 
                disabled={loading}
                onClick={()=>next()}
                className='px-6 py-2 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 disabled:opacity-50'
            >
                {loading ? 'Processing...' : activeMode === 'upload' ? 'Upload & Generate' : 'Generate Course'}
            </button>
        </div>

      </div>
    </div>
  )
}

export default CreateCourse