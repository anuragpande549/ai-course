'use client'
import React, { useState } from 'react'
import { LayoutGrid, Lightbulb, ClipboardCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CreateCourse from './_components/CreateCourse'
import Options from './_components/Options'
import SelectTopic from './_components/SelectTopic'

function AddCourse() {
  const [activeIndex, setActiveIndex] = useState(0)

  const increseIndex = () =>{
    setActiveIndex((p)=>p+1)
  }

  const StepperOptions = [
    {
      id: 1,
      name: 'Category',
      icon: <LayoutGrid className="w-5 h-5" />,
      component: <CreateCourse next={increseIndex}/>,
      comment: 'Select your course category',
    },
    {
      id: 2,
      name: 'Topic',
      icon: <Lightbulb className="w-5 h-5" />,
      component: <SelectTopic next={increseIndex}/>,
      comment: 'Enter topic and description',
    },
    {
      id: 3,
      name: 'Options',
      icon: <ClipboardCheck className="w-5 h-5" />,
      component: <Options next={increseIndex}/>,
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
              ${
                activeIndex === index
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

      {/* --- Navigation Buttons --- */}
      {/* <div className="flex gap-4">
        <Button
          variant="outline"
          disabled={activeIndex === 0}
          onClick={() => setActiveIndex((prev) => prev - 1)}
        >
          Back
        </Button>

        <Button
          disabled={activeIndex === StepperOptions.length - 1}
          onClick={() => setActiveIndex((prev) => prev + 1)}
        >
          Next
        </Button>
      </div> */}
    </div>

  )
}

export default AddCourse
