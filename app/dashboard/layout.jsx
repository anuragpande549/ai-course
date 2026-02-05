import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

function DashboardLayout({children}) {
  return (
    <div className='min-h-screen bg-slate-50'>
      
      {/* Desktop Sidebar: Hidden on Mobile, Fixed on Desktop */}
      <div className='md:w-64 hidden md:block fixed h-full inset-y-0 z-50'>
        <SideBar/>
      </div>

      {/* Main Content Area */}
      <div className='md:ml-64'>
        
        {/* Header (Contains Mobile Menu Trigger) */}
        <Header />
        
        {/* Page Content */}
        <div className='p-6'>
            {children}
        </div>
      
      </div>
    
    </div>
  )
}

export default DashboardLayout