import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import {Home, Signup, Login, VerificationOfEmail, ProtectedRoutes, RedirectAuthenticatedUser, ForgotPassword, ResetPassword} from './Components/index.js'
import { Navigate } from 'react-router-dom'
const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path = '/' element =
      {  
           <Layout/>
    
      }
   >
    <Route path = '' element = {
   <ProtectedRoutes>
   <Home/>
 </ProtectedRoutes>
      }/>

    <Route path = 'signup' element = {
       <RedirectAuthenticatedUser>
       <Signup/>
     </RedirectAuthenticatedUser>
      }/>
    <Route path = 'login' element = {
      <RedirectAuthenticatedUser>
      <Login/>
    </RedirectAuthenticatedUser>
      }/>
    <Route path = 'verify-email' element = {
      <RedirectAuthenticatedUser>
      <VerificationOfEmail/>
    </RedirectAuthenticatedUser>
      }/>
      <Route path = 'forgot-password' element = {
      <RedirectAuthenticatedUser>
        <ForgotPassword/>
      </RedirectAuthenticatedUser>
      }/>
      <Route path = 'reset-password/:token' element={
          <RedirectAuthenticatedUser>
            <ResetPassword/>
          </RedirectAuthenticatedUser>
      }/>
      <Route path='*' element ={<Navigate to = '/' replace/>}/>
   </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <>
   <RouterProvider router = {router}/>
  </>
)
