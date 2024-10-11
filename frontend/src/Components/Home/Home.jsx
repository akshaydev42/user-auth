import React from 'react'
import useAuthStore from '../../Store/AuthStore'
import formateDate from '../../utils/formateDate'
import { LiaSpinnerSolid } from 'react-icons/lia'

function Home() {
const {user, isloading, logout} = useAuthStore()
const handleLogout = async ()=>{
try{
  await logout()
}catch(error){
console.log(error.message)
}
}
  return (
      <>
      <div className = "max-w-md w-full rounded-xl shadow-lg bg-black/40">
      <div className = 'p-8'>
      <h2 className = "text-3xl bg-gradient-to-r from-blue-500 font-bold to-blue-800 text-transparent bg-clip-text text-center mb-4">Dashboard</h2>
      <div className = 'mb-4 border border-slate-500  rounded-xl p-2 '>
        <h2 className = ' mb-2 text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text '>Profile Information</h2>
        <div className = 'text-lg text-white/70'>
        <p>Name: {user.username} </p>
        <p>Email: {user.email}</p>
        </div>
      </div>
      <div className = 'mb-4 border border-slate-500  rounded-xl p-2 '>
        <h2 className = ' mb-2 text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text '>Profile Information</h2>
        <div className = 'text-lg text-white/70'>
        <p><span className="text-white">Joined:</span> {
        new Date(user.lastLogin).toLocaleDateString("en-US",{
          year:"numeric",
          month: "long",
          day : "numeric"
        })
        } </p>
        <p><span className= "text-white ">Last Login:</span> {formateDate(user.lastLogin)}</p>
        </div>
      </div>
      <div className = "w-full text-center ">
  <button onClick= {handleLogout} disabled = {isloading} type="button" className= "text-white/50 rounded-2xl py-2 w-1/2 text-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 transition duration-200 focus:border-blue-400 focus:border-2">
   {isloading?<LiaSpinnerSolid className = 'mx-auto animate-spin size-6'/>:"Logout"}
  </button>
 </div>
      </div>

      </div>
      </>
  )
}

export default Home