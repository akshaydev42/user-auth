import React from 'react'
import useAuthStore from '../Store/AuthStore.js'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({children}) {
    const {isAuthenticated, user} = useAuthStore()
   if(!isAuthenticated){
     
     return  <Navigate to = '/login' replace/>
   }
   if(!user?.isVerified) {

      return <Navigate to  = '/verify-email' replace/>
   }
  return children
}

export default ProtectedRoutes