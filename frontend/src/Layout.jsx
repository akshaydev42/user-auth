import { Outlet } from "react-router-dom";
import React, {useEffect} from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAuthStore from "./Store/AuthStore";
import { Toaster } from "react-hot-toast";

function Layout() {
  const { isCheckingAuth, checkAuth, isAuthenticated} = useAuthStore()

useEffect(()=>{
    checkAuth()
}, [checkAuth])
if(isCheckingAuth) return (
  <div className = 'min-h-screen bg-gradient-to-br from-gray-900 via-blue-600 to-blue-900 flex items-center justify-center oveflow-hidden'>
<AiOutlineLoading3Quarters className = 'mx-auto size-16 text-slate-400 animate-spin'/>
    </div>
)
  return (
    <>
    <Toaster/>
    <div className = 'min-h-screen bg-gradient-to-br from-gray-900 via-blue-600 to-blue-900 flex items-center justify-center oveflow-hidden'>
    <Outlet/>
    </div>
    </>
  )
}

export default Layout