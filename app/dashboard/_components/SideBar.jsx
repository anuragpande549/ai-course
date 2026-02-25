'use client' // Required for using hooks like usePathname

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, SquarePlus, Shield, Settings, LogOut, Zap } from 'lucide-react'
import { useClerk } from '@clerk/nextjs'
function SideBar() {
    const path = usePathname();

    const MenuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Create Course",
            icon: SquarePlus,
            path: "/dashboard/create-course",
        },
        {
            id: 3,
            name: "My Courses",
            icon: Shield,
            path: "/dashboard/my-courses",
        },
        {
            id: 4,
            name: "Upgrade",
            icon: Zap,
            path: "/dashboard/upgrade",
        },

        {
            id: 5,
            name: "Logout",
            icon: LogOut,
            // path: "/dashboard/logout",
            onClick: () => signOut()
        },
    ]

    const { signOut } = useClerk();

    return (
        <div className='fixed h-full md:w-64 p-5 shadow-md border-r border-slate-200 bg-white flex flex-col'>

            {/* Logo Section */}
            <div className='mb-10 mt-2 flex items-center gap-2 justify-center'>
                <Image src={'/logo.svg'} width={40} height={40} alt='logo' />
                <h1 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 cursor-pointer">
                    NextCourse
                </h1>
            </div>

            {/* Menu List */}
            <div className='flex-1'>
                <ul className='space-y-2'>
                    {MenuList.map((item) => (
                        <li key={item.id}>
                            {item.path ? (

                                <Link

                                    onClick={item.onClick || (() => { })}
                                    href={item?.path}>

                                    <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300
                                    ${path === item?.path
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                                        }`}>
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                </Link>
                            ) : (
                                <button onClick={item.onClick} className={`w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 text-slate-600 hover:bg-slate-100 hover:text-indigo-600`} >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* AI Credits / Usage Section */}
            <div className='mt-auto mb-10'>
                <div className='bg-slate-50 p-4 rounded-xl border border-slate-200'>
                    <div className='flex items-center gap-2 mb-2'>
                        <Zap className='w-4 h-4 text-indigo-600 fill-indigo-600' />
                        <h2 className='text-xs font-bold text-slate-700'>AI Credits</h2>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>

                    <p className='text-xs text-slate-500 mb-3'>3 out of 10 Credits Used</p>

                    <button className='text-xs text-indigo-600 hover:text-indigo-800 font-semibold w-full text-left'>
                        Upgrade Plan →
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SideBar