import React from 'react'

function Footer() {
  return (
    <footer className="relative bg-slate-50 pt-16 pb-8 overflow-hidden">
      
      {/* --- Background Pattern (Matches Hero) --- */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- Gradient CTA Section --- */}
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 shadow-xl lg:flex-row lg:justify-between lg:px-12">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to start learning?
            </h2>
            <p className="mt-2 text-indigo-100">
              Generate your first personalized course in seconds.
            </p>
          </div>

          <a
            className="group flex items-center gap-2 rounded-full bg-white px-8 py-3 text-indigo-600 font-semibold shadow-sm transition-all hover:bg-indigo-50 hover:scale-105"
            href="#"
          >
            Generate Course
            <svg 
                className="size-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* --- Links Grid --- */}
        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4 border-b border-slate-200 pb-12">
          
          {/* Column 1 */}
          <div>
            <p className="text-lg font-bold text-slate-900">Product</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">AI Course Generator</a></li>
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Course Catalog</a></li>
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Pricing</a></li>
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">For Teams</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <p className="text-lg font-bold text-slate-900">Resources</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Documentation</a></li>
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Prompt Guides</a></li>
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Community</a></li>
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Help Center</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <p className="text-lg font-bold text-slate-900">Company</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">About Us</a></li>
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Careers</a></li>
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Legal</a></li>
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Contact</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <p className="text-lg font-bold text-slate-900">Legal</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Terms of Service</a></li>
              <li><a href="#" className="text-slate-600 transition hover:text-indigo-600">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="mt-8 pt-8 sm:flex sm:items-center sm:justify-between">
          
          {/* Logo */}
          <div className="flex justify-center sm:justify-start">
             <span className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              NextCourse
            </span>
          </div>

          {/* Copyright */}
          <p className="mt-4 text-center text-sm text-slate-500 sm:mt-0 sm:text-right">
            Copyright © {new Date().getFullYear()}. Built with ❤️ and AI.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer