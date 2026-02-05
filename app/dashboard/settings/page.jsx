import React from 'react'
import { User, CreditCard, Save, Trash2, Camera, Zap } from 'lucide-react'
import Image from 'next/image'

function Settings() {
  return (
    <div className='p-6 md:p-10'>
        
        <h2 className='text-3xl font-bold text-slate-800 mb-8'>Settings</h2>

        {/* --- SECTION 1: Profile Settings --- */}
        <div className='bg-white border border-slate-200 rounded-xl shadow-sm mb-8'>
            <div className='p-6 border-b border-slate-100 flex items-center justify-between'>
                <h3 className='text-lg font-bold text-slate-700 flex items-center gap-2'>
                    <User className='h-5 w-5 text-indigo-600' />
                    General Information
                </h3>
            </div>
            
            <div className='p-6'>
                {/* Avatar Section */}
                <div className='flex items-center gap-5 mb-6'>
                    <div className='relative'>
                        <Image src='/favicon.svg' width={80} height={80} alt='avatar' className='rounded-full border p-1 bg-slate-50' />
                        <div className='absolute bottom-0 right-0 bg-indigo-600 p-1.5 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors text-white'>
                            <Camera className='h-3 w-3' />
                        </div>
                    </div>
                    <div>
                        <h4 className='font-semibold text-slate-700'>Profile Photo</h4>
                        <p className='text-xs text-slate-500'>This will be displayed on your course landing pages.</p>
                    </div>
                </div>

                {/* Form Inputs */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-4'>
                    <div>
                        <label className='text-sm font-semibold text-slate-600 mb-1 block'>Full Name</label>
                        <input type="text" defaultValue="John Doe" className='w-full border border-slate-300 rounded-lg p-2.5 text-slate-700 focus:outline-indigo-500' />
                    </div>
                    <div>
                        <label className='text-sm font-semibold text-slate-600 mb-1 block'>Email</label>
                        <input type="email" defaultValue="john@example.com" disabled className='w-full border border-slate-200 bg-slate-50 rounded-lg p-2.5 text-slate-500 cursor-not-allowed' />
                    </div>
                </div>
                
                <div className='mb-4'>
                    <label className='text-sm font-semibold text-slate-600 mb-1 block'>Bio</label>
                    <textarea rows={3} placeholder="Tell your students a bit about yourself..." className='w-full border border-slate-300 rounded-lg p-2.5 text-slate-700 focus:outline-indigo-500 resize-none' />
                </div>

                <div className='flex justify-end'>
                    <button className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition-colors'>
                        <Save className='h-4 w-4' />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>

        {/* --- SECTION 2: Subscription & Credits --- */}
        <div className='bg-white border border-slate-200 rounded-xl shadow-sm mb-8'>
            <div className='p-6 border-b border-slate-100'>
                <h3 className='text-lg font-bold text-slate-700 flex items-center gap-2'>
                    <CreditCard className='h-5 w-5 text-indigo-600' />
                    Subscription & Credits
                </h3>
            </div>
            
            <div className='p-6 grid md:grid-cols-2 gap-8'>
                
                {/* Credit Usage */}
                <div>
                    <h4 className='font-semibold text-slate-700 mb-2'>AI Credit Usage</h4>
                    <div className='flex items-center justify-between text-sm text-slate-500 mb-2'>
                        <span>3 used</span>
                        <span>10 total</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
                        <div className="bg-indigo-600 h-3 rounded-full transition-all duration-500" style={{ width: '30%' }}></div>
                    </div>
                    <p className='text-xs text-slate-500'>Credits renew on <span className='font-semibold'>March 1, 2024</span>.</p>
                </div>

                {/* Plan Details */}
                <div className='bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex flex-col justify-between'>
                    <div>
                        <div className='flex items-center gap-2 mb-1'>
                            <Zap className='h-4 w-4 text-indigo-600 fill-indigo-600' />
                            <h4 className='font-bold text-indigo-900'>Free Plan</h4>
                        </div>
                        <p className='text-sm text-indigo-700 opacity-80'>Great for hobbyists.</p>
                    </div>
                    <button className='mt-4 w-full bg-white border border-indigo-200 text-indigo-600 font-semibold py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all'>
                        Upgrade to Pro
                    </button>
                </div>
            </div>
        </div>

        {/* --- SECTION 3: Danger Zone --- */}
        <div className='bg-red-50 border border-red-100 rounded-xl shadow-sm'>
             <div className='p-6 flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold text-red-700 flex items-center gap-2'>
                        <Trash2 className='h-5 w-5' />
                        Delete Account
                    </h3>
                    <p className='text-sm text-red-600 opacity-80 mt-1'>
                        Permanently delete your account and all generated courses. This action cannot be undone.
                    </p>
                </div>
                <button className='px-4 py-2 bg-white border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-600 hover:text-white transition-colors'>
                    Delete
                </button>
             </div>
        </div>

    </div>
  )
}

export default Settings