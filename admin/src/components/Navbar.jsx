import { PanelRightClose, PanelRightOpen, ShieldUser } from 'lucide-react'
import { useContext, useState } from 'react'
import { appStore } from '../store/app.store'
import { authStore } from '../store/auth.store'

const Navbar = () => {
  const {logOut,user}=useContext(authStore);
  const {sidebar,openSidebar,closeSidebar}= useContext(appStore);
  // console.log(sidebar);
  return (
    <div className="flex justify-between items-center p-3 border-b border-gray-300 h-[50px] select-none ">
      <div className="flex item-center gap-3">
        <div className="sm:hidden cursor-pointer">
          {sidebar ? <PanelRightOpen onClick={closeSidebar}/> : <PanelRightClose onClick={openSidebar}/>}
        </div>
        <h1>Admin</h1>
      </div>


      
        <div className="flex items-center gap-2">
        <ShieldUser />
        <button onClick={logOut} className="bg-red-400 cursor-pointer p-1 text-xs px-2 rouvded text-white font-semibold" >
          LogOut
        </button>
        </div>      
    </div>
  )
}

export default Navbar