"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- Data for the Steps ---
const steps = [
  {
    id: 1,
    title: "1. Define Your Goal",
    description: "Simply enter a topic like 'Python for Data Science' or upload an existing syllabus PDF. Our AI analyzes your requirements instantly.",
    icon: "🎯",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "2. Review & Refine",
    description: "The AI generates a structured curriculum. You can drag-and-drop chapters, add specific topics, or remove what you already know.",
    icon: "✨",
    color: "bg-indigo-500",
  },
  {
    id: 3,
    title: "3. Start Learning",
    description: "Get a full course with generated video tutorials, reading materials, and quizzes. Track your progress as you master each module.",
    icon: "🎓",
    color: "bg-violet-500",
  },
];

function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animated line height based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works"  className="relative  bg-slate-50 py-24 sm:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Workflow</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From Idea to Course in Seconds
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            No manual searching. No boring playlists. Just a streamlined path to knowledge.
          </p>
        </div>

        {/* --- Scrollable Timeline Section --- */}
        <div ref={containerRef} className="relative mx-auto max-w-4xl">
          
          {/* Vertical Line Container */}
          <div className="absolute left-[39px] top-0 bottom-0 w-1 bg-gray-100 hidden md:block">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-gradient-to-b from-indigo-500 to-violet-500 origin-top"
            />
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Individual Step Component ---
function StepCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col md:flex-row gap-10 items-center"
    >
      {/* Icon Bubble */}
      <div className="flex-shrink-0 z-10">
        <div className={`flex h-20 w-20 items-center justify-center rounded-full border-8 border-white shadow-xl ${step.color}`}>
          <span className="text-3xl">{step.icon}</span>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Visual / Mockup (Right Side) */}
      <div className="flex-1 w-full">
        <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            {/* Fake UI for visual representation */}
            <div className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 overflow-hidden">
                {/* Header of fake UI */}
                <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
                </div>
                {/* Body of fake UI */}
                <div className="p-6 h-48 flex items-center justify-center bg-slate-50">
                   {index === 0 && <span className="text-gray-400 font-mono text-sm">Input: "React Mastery"</span>}
                   {index === 1 && (
                       <div className="space-y-2 w-full px-4">
                           <div className="h-2 w-3/4 bg-indigo-200 rounded"></div>
                           <div className="h-2 w-1/2 bg-indigo-200 rounded"></div>
                           <div className="h-2 w-full bg-indigo-200 rounded"></div>
                       </div>
                   )}
                   {index === 2 && (
                       <div className="w-full flex gap-2">
                           {/* Video Player Mockup */}
                           <div className="flex-1 h-24 bg-gray-800 rounded flex items-center justify-center text-white">▶</div>
                           <div className="w-1/3 space-y-2">
                               <div className="h-2 w-full bg-green-200 rounded"></div>
                               <div className="h-2 w-full bg-green-200 rounded"></div>
                           </div>
                       </div>
                   )}
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HowItWorks;