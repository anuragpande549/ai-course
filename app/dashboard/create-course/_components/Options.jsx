import React, { useState } from 'react'
import { useUserContext } from '../../../_context/userInputContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

function Options({ next }) {
  const { userCourseInput, setCourseLayout, setCourseId } = useUserContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleGenerateCourse = async () => {
    setLoading(true);

    try {
      const body = {
        topic: userCourseInput.topic,
        description: userCourseInput.description,
        category: userCourseInput.category || 'General',
        difficulty: userCourseInput.difficulty || 'Beginner',
        createdBy: user?.primaryEmailAddress?.emailAddress
      };

      // Call Phase 1 API
      const response = await fetch('/api/generate-layout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to generate course layout");

      const data = await response.json();

      if (data.success) {
        // Save DB ID and Layout to Global Context
        setCourseId(data.courseId);
        setCourseLayout(data.layout);

        // Assuming Step 4 is taking them to an Editor Page
        router.push(`/dashboard/create-course/${data.courseId}`);
      } else {
        alert("API Error: " + data.error);
      }

    } catch (error) {
      console.error("Error generating course:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 md:px-20 lg:px-44 mt-10'>
      <div className='border rounded-xl p-8 shadow-sm bg-white text-center'>
        <h2 className='text-2xl font-bold mb-4'>Ready to Generate!</h2>
        <p className='text-slate-500 mb-8'>We will now generate the complete layout using AI.</p>

        <Button
          onClick={handleGenerateCourse}
          disabled={loading}
          className='w-full text-lg p-6 bg-indigo-600 hover:bg-indigo-700'
        >
          {loading ? 'Generating Layout (Please Wait)...' : 'Generate Course'}
        </Button>
      </div>
    </div>
  )
}

export default Options