import { useState } from 'react'
import SideBar from './SideBar'
import { Menu, X } from 'lucide-react'

function MobileSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='md:hidden'>
            {/* Trigger Button */}
            <Menu 
                onClick={() => setIsOpen(true)} 
                className='h-6 w-6 text-slate-700 cursor-pointer' 
            />

            {/* Overlay & Drawer */}
            {isOpen && (
                <div className='fixed inset-0 z-50 flex'>
                    {/* Background Overlay */}
                    <div 
                        onClick={() => setIsOpen(false)} 
                        className='fixed inset-0 rounded-2xl bg-black/50 transition-opacity'
                    ></div>

                    {/* Sidebar Panel */}
                    <div className='relative bg-white w-64 h-full shadow-xl transform transition-transform duration-300 ease-in-out animate-in slide-in-from-left'>
                        <div className='absolute top-2 right-2'>
                             <X onClick={() => setIsOpen(false)} className='h-5 w-5 cursor-pointer text-slate-500' />
                        </div>
                        <SideBar />
                    </div>
                </div>
            )}
        </div>
    )
}
export default MobileSideBar