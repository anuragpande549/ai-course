'use client'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { Search, Bell } from 'lucide-react'
import MobileSideBar from './MobileSideBar' // <--- Import this

function Header() {
  return (
    <div className='flex justify-between items-center p-4 shadow-sm border-b border-slate-200 bg-white'>
        
        {/* Left: Mobile Menu & Search */}
        <div className='flex items-center gap-4'>
            {/* Shows only on Mobile */}
            <MobileSideBar /> 

            {/* Search Bar (Hidden on mobile if needed, or kept) */}
            <div className='hidden md:flex items-center gap-2 border border-slate-300 p-2 rounded-lg bg-slate-50 w-full max-w-md'>
                <Search className='h-4 w-4 text-slate-500' />
                <input type="text" placeholder="Search..." className='outline-none bg-transparent w-full text-sm' />
            </div>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-5'>
            <Bell className='h-5 w-5 text-slate-600' />
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default Header