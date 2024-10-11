import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Input from '../Input/Input'
import { RiLockPasswordLine } from "react-icons/ri";
import { LiaSpinnerSolid } from 'react-icons/lia';
import useAuthStore from '../../Store/AuthStore';
import toast from 'react-hot-toast'


function ResetPassword() {
const {token} = useParams()
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState('')
const {error, isloading, resetPassword} = useAuthStore()
const navigate = useNavigate()

const handleSubmit = async ()=>{
    if(password !== confirmPassword){
        toast.error("Password do not match")
    }
    else{
        try{
           await resetPassword(token, password)
           toast.success("password reset successfully, redirecting to login page...")
        setTimeout(()=>{
            navigate('/login')
        }, 2000)
        }catch(error){
        console.log(error.message)
        }
    }
}

  return (
    <>
    <div className = "max-w-md w-full rounded-2xl shadow-lg bg-black/40">
        <div className= "p-8">
         <h2 className = 'mb-4 text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text'>Reset Password</h2>
         <Input
         icon = {RiLockPasswordLine}
         type = 'password'
         placeholder = 'New Password'
         value = {password}
         onChange = {(e)=>(setPassword(e.target.value))}
         required
         />
          <Input
         icon = {RiLockPasswordLine}
         type = 'password'
         placeholder = 'Confirm New Password'
         value = {confirmPassword}
         onChange = {(e)=>(setConfirmPassword(e.target.value))}
         required
         />
         {error && <p className = 'text-red-600 text-sm text-center mb-4'>{error}</p>}
          <div className = "w-full text-center ">
   <button disabled = {isloading} type = 'button' onClick = {handleSubmit} className= "text-white/50 rounded-2xl py-2 w-1/2 text-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 transition duration-200 focus:border-blue-400 focus:border-2">
   {isloading?<LiaSpinnerSolid className = "mx-auto size-7 animate-spin"/>:"Set New password"}
   </button>
   </div>

        </div>
    </div>
    </>
  )
}

export default ResetPassword