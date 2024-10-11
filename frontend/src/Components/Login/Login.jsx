import React, {useState} from 'react'
import Input from '../Input/Input.jsx'
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { LiaSpinnerSolid } from "react-icons/lia";
import {Link, useNavigate} from 'react-router-dom'
import useAuthStore from '../../Store/AuthStore.js';


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const {error, isloading, login} = useAuthStore()
  const handleLogin =async (e)=>{
    e.preventDefault()
   try{
    await login(email, password)
     navigate('/')
   }catch(error){
     console.log(error.message)
   }
  }
  return (
 <>
   <div className = "max-w-md w-full  bg-black/40  rounded-2xl shadow-xl">
   <div className= "p-7">
<h2 className = "text-3xl py-2 font-bold mb-5 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600"> 
  Welcome Back
</h2>
<form onSubmit={handleLogin}>
<Input
icon = {MdOutlineEmail}
type = 'email'
placeholder = 'Email'
value = {email}
onChange = {(e)=>(setEmail(e.target.value))}
/>
<Input
icon = {RiLockPasswordLine}
type = 'password'
placeholder = 'Password'
value = {password}
onChange = {(e)=>(setPassword(e.target.value))}
/>
<div className = "mb-6">
<Link to='/forgot-password' className = "text-blue-400 hover:underline text-sm">
Forgot Password?
</Link>
</div>
{error && <p className = "text-center text-red-600 text-sm mb-2 ">{error}</p>}
<div className = "w-full text-center  rounded-lg">
  <button 
  type="submit" 
  className= "text-white/50 rounded-2xl py-2 w-1/2 text-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 transition duration-200 focus:border-blue-400 focus:border-2"
  disabled = {isloading}
  >{isloading?<LiaSpinnerSolid className= "size-6 animate-spin mx-auto"/>:"Login"}</button>
 </div>
</form> 
 </div>
 <div className="py-3 bg-black/40 rounded-b-2xl" >
   <h2 className= "text-center text-white/50">Don&apos;t have an account?{" "}
   <Link to="/signup" className= "text-blue-300 hover:underline">Sign Up</Link>
   </h2>
   </div>
 </div>
 </>
  )
}

export default Login