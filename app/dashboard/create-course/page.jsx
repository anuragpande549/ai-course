'use client'
import React, { useState } from 'react'
import { LayoutGrid, ClipboardCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CreateCourse from './_components/CreateCourse'
import Options from './_components/Options'

function AddCourse() {
  const [activeIndex, setActiveIndex] = useState(0)

  const increseIndex = () => {
    setActiveIndex((p) => p + 1)
  }

  const StepperOptions = [
    {
      id: 1,
      name: 'Topic',
      icon: <LayoutGrid className="w-5 h-5" />,
      component: <CreateCourse next={increseIndex} />,
      comment: 'Enter topic and description',
    },
    {
      id: 2,
      name: 'Options',
      icon: <ClipboardCheck className="w-5 h-5" />,
      component: <Options next={increseIndex} />,
      comment: 'Configure extra settings',
    },
  ]

  // ✅ Get active step safely
  const activeStep = StepperOptions[activeIndex]

  return (



    <div className="flex flex-col items-center justify-center mt-10 px-6 w-full">


      {/* --- Stepper Icons --- */}
      <div className="flex gap-6 mb-10">
        {StepperOptions.map((item, index) => (
          <div
            key={item.id}
            className={`p-3 rounded-full border transition-all cursor-pointer
              ${activeIndex === index
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-400 border-slate-200'
              }`}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* --- Dynamic Step Component --- */}
      <div className="w-full max-w-5xl mb-8">
        {activeStep.component}
      </div>

    </div>

  )
}

export default AddCourse
