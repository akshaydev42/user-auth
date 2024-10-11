import React, {useState} from 'react'
import Input from '../Input/Input'
import { MdOutlineEmail } from "react-icons/md";
import useAuthStore from '../../Store/AuthStore';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';


function ForgotPassword() {
    const [email, setEmail] = useState('')
    const {isloading, error, forgotPassword} = useAuthStore()
    const handleSubmit = async ()=>{
     try{
    await forgotPassword(email)
   toast.success("Reset Password Email is send successfully")
     }catch(error){
        console.log(error.message)
     }
    }
  return (
    <>
    <div className = "max-w-md w-full rounded-xl shadow-lg bg-black/40">
     <div className = "p-8">
         <h2 className = 'text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text mb-4 p-2'>Forgot Password</h2>
         <p className = 'mb-4 text-sm text-slate-400/80 text-center '>Enter your email address and we'll send you a link to reset your password</p>
         <Input
         icon = {MdOutlineEmail}
         type = "email"
         value = {email}
         placeholder = 'Email Address'
         onChange = {(e)=>(setEmail(e.target.value))}
         />
        {error && <p className = 'text-red-600 text-center text-sm mb-4 '>{error}</p>}
     <div className = "w-full text-center ">
   <button disabled = {isloading} type = 'button' onClick = {handleSubmit} className= "text-white/50 rounded-2xl py-2 w-1/2 text-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 transition duration-200 focus:border-blue-400 focus:border-2">
   {isloading?<LiaSpinnerSolid className = "mx-auto size-7 animate-spin"/>:"Send Reset Link"}
   </button>
   </div>
     </div>
     <div className="py-3 bg-black/40 rounded-b-2xl flex items-center justify-center" >
   <Link to="/login" className= "text-blue-300 hover:underline flex items-center"><FaArrowLeftLong className ='size-4 mr-2'/> Back to Login</Link>
   </div>
    </div>
    </>
  )
}

export default ForgotPassword