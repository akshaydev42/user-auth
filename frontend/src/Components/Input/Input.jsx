import React from 'react'

function Input({icon:Icon, ...props}) {
  return (
      <>
      <div className = "relative mb-6">
        <div className = "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon  className= "size-5 text-blue-600" /> 
        </div>
        <input
        {...props}
        className = "w-full pl-10 pr-3 py-2 bg-gray-600/50 placeholder-slate-400 rounded-xl border border-gray-400 outline-none focus:border-blue-400 text-white transiton duration-200"
        />
      </div>
      </>
  )
}

export default Input