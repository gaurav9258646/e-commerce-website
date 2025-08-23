import React from 'react'
import  Navbar from "./Navbar"
import Sidebar from './Sidebar';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';



const Layout = ({children}) => {
  return (
    <div>
      <Navbar/>
      <div className='flex'>
      <DesktopSidebar/>
      <MobileSidebar/>
      <div className='flex-1 p-2'>
        {children}
      </div>
      </div>
      
    </div>
  )
}

export default Layout;
