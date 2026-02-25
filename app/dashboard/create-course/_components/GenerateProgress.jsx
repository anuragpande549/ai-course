"use client"

import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../../_context/userInputContext';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function GenerateProgress() {
    const { courseId, courseLayout } = useUserContext();
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("Initializing...");
    const router = useRouter();

    useEffect(() => {
        if (courseLayout && courseLayout.length > 0) {
            generateAllChapters();
        }
    }, []);

    const generateAllChapters = async () => {
        const chapters = courseLayout; // Array of chapters from context
        const courseName = "Your Course Topic"; // You can pull the actual name from context if stored

        for (let i = 0; i < chapters.length; i++) {
            setStatusText(`Generating chapter ${i + 1} of ${chapters.length}: ${chapters[i].chapterName}`);
            
            try {
                const response = await fetch('/api/generate-chapter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        courseId: courseId,
                        courseName: courseName,
                        chapterName: chapters[i].chapterName,
                        about: chapters[i].about,
                        chapterIndex: i
                    })
                });

                if (!response.ok) throw new Error("Failed to generate");

                // Update progress bar percentage
                setProgress(((i + 1) / chapters.length) * 100);

            } catch (error) {
                console.error(`Error generating chapter ${i}:`, error);
                // Optionally handle retries or skip here
            }
        }

        // All done! Mark course as published (Optional: Call an API to set isPublished = true)
        setStatusText("Course generated successfully!");
        
        // Redirect the user to their new course page
        setTimeout(() => {
            router.push(`/dashboard/course/${courseId}`);
        }, 1500);
    };

    return (
        <div className='p-6 md:px-20 lg:px-44 mt-20 flex flex-col items-center justify-center min-h-[50vh]'>
            
            {progress < 100 ? (
                <div className='bg-indigo-100 p-4 rounded-full animate-pulse mb-6'>
                    <Loader2 className='h-12 w-12 text-indigo-600 animate-spin' />
                </div>
            ) : (
                <div className='bg-green-100 p-4 rounded-full mb-6'>
                    <CheckCircle2 className='h-12 w-12 text-green-600' />
                </div>
            )}

            <h2 className='text-2xl font-bold text-slate-800 text-center mb-2'>
                {progress < 100 ? "Building Your Personalized Course" : "Course Ready!"}
            </h2>
            <p className='text-slate-500 text-center mb-8'>
                {statusText}
            </p>

            {/* Progress Bar Container */}
            <div className='w-full max-w-md bg-slate-100 rounded-full h-3 overflow-hidden'>
                <div 
                    className='bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out'
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className='text-sm text-slate-400 mt-2'>{Math.round(progress)}% Complete</p>

        </div>
    );
}

export default GenerateProgress;