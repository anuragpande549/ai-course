import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

async function Header() {
  const userInfo = await currentUser()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-6 border-b border-slate-200 bg-slate-50/80 backdrop-blur-md transition-all">
      {/* Logo Section */}
      <div id="logo" className="flex items-center gap-2 cursor-pointer">
        <Image src="/logo.svg" alt="logo-img" width={32} height={32} />
        <span className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
          NextCourse
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <Link href="#features" className="transition-colors hover:text-indigo-600">Features</Link>
        <Link href="#how-it-works" className="transition-colors hover:text-indigo-600">How it Works</Link>
        <Link href="#pricing" className="transition-colors hover:text-indigo-600">Pricing</Link>
        <Link href="#about" className="transition-colors hover:text-indigo-600">About</Link>
      </nav>

      {/* Call to Action */}
      <div className="flex items-center gap-4">
        {/* Optional: Add a subtle 'Log in' text link before the button */}

        <Link href="/dashboard" className="bg-indigo-600 p-2 rounded-xl hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 transition-all hover:shadow-indigo-300">
            {userInfo?`Dashboard`:'Login'}
        </Link>

      </div>
    </header>
  )
}

export default Header