import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input.jsx'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { LiaSpinnerSolid } from "react-icons/lia";
import {Link} from 'react-router-dom'
import useAuthStore from '../../Store/AuthStore.js';


function Signup() {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const Navigate  = useNavigate()
  
  const {isloading, signup, error, isAuthenticated} = useAuthStore()
  const handleSubmit  = async (e)=>{
    e.preventDefault()
    try{
      await signup(email, username, password)
      Navigate('/verify-email')
    }catch(error){
      console.log(error.message)
    }
  }
  return (
   <>
   <div className = "max-w-md w-full  bg-black/40  rounded-2xl shadow-xl">
   <div className= "p-8">
<h2 className = "text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600"> 
  Create Account
</h2>
<form onSubmit = {handleSubmit}>
<Input
icon = {FaRegUser}
type = "text"
placeholder = "username"
value = {username}
onChange = {(e)=>(setUserName(e.target.value))}
 />
 <Input
icon = {MdOutlineEmail}
type = "email"
placeholder = "Email"
value = {email}
onChange = {(e)=>(setEmail(e.target.value))}
 />
  <Input
icon = {RiLockPasswordLine}
type = "password"
placeholder = "Password"
value = {password}
onChange = {(e)=>(setPassword(e.target.value))}
 />
 {error && <p className = "text-center text-red-500 text-sm m-2 ">{error}</p>}
 <div className = "w-full text-center ">
  <button disabled={isloading} type="submit" className= "text-white/50 rounded-2xl py-2 w-1/2 text-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 transition duration-200 focus:border-blue-400 focus:border-2">
   {isloading?<LiaSpinnerSolid className = 'mx-auto animate-spin size-6'/>:"Signup"}
  </button>
 </div>
</form>
   </div>
   <div className="py-3 bg-black/40 rounded-b-2xl" >
   <h2 className= "text-center text-white/50">Already have an account?{" "}
   <Link to="/login" className= "text-blue-300 hover:underline">LogIn</Link>
   </h2>
   </div>
   </div>
   </>
  )
}
 
export default Signup 