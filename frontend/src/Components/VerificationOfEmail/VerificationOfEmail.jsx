import React, {useState, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { LiaSpinnerSolid } from "react-icons/lia";
import useAuthStore from '../../Store/AuthStore';
import {toast} from 'react-hot-toast'

function VerificationOfEmail() {
  const [code, setCode] = useState(['','','','','',''])
  const inputRefs = useRef([])
  const formRef = useRef(null)
  
  const navigate = useNavigate()

  const {error, isloading, verifyEmail, isAuthenticated} = useAuthStore()

  const handleSubmit = (e)=>{
    e.preventDefault()
    const verificationCode = code.join("")
    //console.log(typeof(verificationCode))
    try{
      verifyEmail(verificationCode)
      navigate('/')
      toast.success("Email is verified successfully")
    }catch(error){
      console.log(error.message)
    }
    // alert(`Verificaton code is submitted: ${verificationCode}`)
  }
  const handleChange = (value, index, e)=>{
    const newCode = [...code]
   if(value.length>1){
const arrayOfdigitsFromString = value.slice(0, 6).split("")
for(let i = 0;i<value.length;i++){
  newCode[i] = arrayOfdigitsFromString[i] // newCode[i]= value[i] 
}
 setCode(newCode)
 
 const lastFilledIndex = newCode.findLastIndex((digit)=>digit!='')
 if(lastFilledIndex<5) inputRefs.current[lastFilledIndex+1].focus()
  else inputRefs.current[5].focus()
   }
   else{
    newCode[index] = value
    setCode(newCode)
   
    if(index<5 && value)inputRefs.current[index+1].focus()
      else if(index==5 && value) inputRefs.current[5].focus()
  }
  }

  const handleKeyDown = (index, e)=>{
     if(e.key==='Backspace' &&  code[index]=='' && index>0) 
    inputRefs.current[index-1].focus()
  }

  useEffect(()=>{
    if(code.every((digit)=>digit!=="")){
      // formRef.current.submit()
      const fakeEvent = new Event('submit', { bubbles: true, cancelable: true });
      formRef.current.dispatchEvent(fakeEvent);
    }
      
  }, [code])
  return (  
   <>
   <div className = "max-w-md w-full bg-black/40 rounded-2xl shadow-xl">
     <div className="mb-5 p-8">
<h2 className = "text-center font-bold py-1 text-3xl bg-gradient-to-r from-blue-300 to-blue-600 bg-clip-text text-transparent">Verify Email</h2>
   <p className="mb-4 text-center text-lg text-gray-400">Enter 6 digit code sent to your email address</p>
   <div className= "space-y-4">
   <form ref = {formRef} onSubmit={handleSubmit}>
    <div className= "flex items-center justify-between mb-6">
   {
    code.map((digit, index)=>(
      <input
      key={index}
      ref = {(el)=>(inputRefs.current[index] = el)}
      type='text'
      maxLength={6}
      value= {digit}
      onChange = {(e)=>handleChange(e.target.value, index, e)}
      onKeyDown = {(e)=>handleKeyDown(index, e)}
      className= "text-center size-12 outline-none bg-slate-500 text-white rounded-xl focus:border-blue-400 focus:border-2"
      />

    ))
   }
    </div>
  {error && <p className = "text-red-500 text-center text-sm mb-2 ">{error}</p>}
   <div className = "w-full text-center ">
   <button disabled = {isloading} type="submit" className= "text-white/50 rounded-2xl py-2 w-1/2 text-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 transition duration-200 focus:border-blue-400 focus:border-2">
   {isloading?<LiaSpinnerSolid className = "mx-auto size-7 animate-spin"/>:"Verify Email"}
   </button>
   </div>
   </form>
   </div>
     </div>
   </div>
   </>
  )
}

export default VerificationOfEmail