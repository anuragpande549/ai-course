'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-50">
      {/* --- Mouse Spotlight Effect --- */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.55), transparent 40%)`,
        }}
      />

      {/* --- Grid Pattern Background --- */}
      <div className="absolute inset-0 z-0 opacity-[0.4]" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <section className="relative z-10 lg:grid lg:h-screen lg:place-content-center">
        <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            
            {/* AI Badge */}
            <div className="mb-6 flex justify-center">
              <span className="relative rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10 transition-all hover:bg-indigo-200">
                ✨ AI V2.0 Now Live
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Master any skill with <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                AI-Generated Courses
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Stop searching endlessly. Just type a topic—like <span className="font-semibold text-slate-800">"Advanced React"</span> or <span className="font-semibold text-slate-800">"Digital Marketing"</span>—and our AI will craft a personalized curriculum, videos, and quizzes for you in seconds.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                href="#"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                <Link href="/dashboard">  Generate Course</Link>
                </span>
              </Link>

              <Link
                className="inline-block rounded-lg border border-slate-300 bg-white px-8 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring active:text-slate-500"
                href="#"
              >
                View Demo
              </Link>
            </div>
            

          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;