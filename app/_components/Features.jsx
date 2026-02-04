"use client";
import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI-Powered Curriculum",
    description: "Powered by Gemini AI. Just enter a topic, and our model generates a structured, logical syllabus tailored to your difficulty level.",
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Smart Video Integration",
    description: "Don't just read. We use the YouTube Data API to fetch the most relevant, highly-rated video tutorials for every single chapter.",
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Customizable Chapters",
    description: "Not happy with the AI suggestion? You have full control to edit chapter titles, rearrange the order, or add your own specific topics.",
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Progress Tracking",
    description: "Keep track of your learning journey. Mark chapters as completed and visualize your progress on your personal dashboard.",
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Code & Markdown Support",
    description: "Perfect for developers. Our course viewer supports syntax highlighting for code blocks and formatted markdown text.",
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Share Your Courses",
    description: "Created a masterpiece? Publish your course to the 'Explore' section and share the link with friends or colleagues.",
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    color: "from-amber-500 to-yellow-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Features() {
  return (
    <section id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Content */}
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            A smarter way to learn online
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We combine the power of Generative AI with structured learning methodologies to give you the best of both worlds.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature, idx) => (
            <motion.div 
                key={idx} 
                variants={item}
                className="group relative flex flex-col items-start p-6 rounded-2xl bg-gray-50 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1 border border-gray-100"
            >
              {/* Animated Gradient Icon Background */}
              <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} shadow-lg transition-transform group-hover:scale-110`}>
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                {feature.title}
              </h3>
              
              <p className="mt-2 text-base leading-7 text-gray-600">
                {feature.description}
              </p>

              {/* Decorative "Learn more" arrow that appears on hover */}
              <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <span className="ml-1">→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;