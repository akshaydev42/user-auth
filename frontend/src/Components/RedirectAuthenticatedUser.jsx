import React from 'react'
import useAuthStore from '../Store/AuthStore.js'
import { Navigate } from 'react-router-dom'

function RedirectAuthenticatedUser({children}) {
    const {isAuthenticated, user} = useAuthStore()
    
    if(isAuthenticated && user?.isVerified ){
        return <Navigate to = '/' replace/>
    }
  return children
}

export default RedirectAuthenticatedUser