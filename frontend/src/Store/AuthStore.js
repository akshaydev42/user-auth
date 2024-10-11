import {create} from 'zustand'
import axios from 'axios'

axios.defaults.withCredentials = true;

const API_URI  = import.meta.env.MODE==='development'?'http://localhost:5000/api/auth':'/api/auth'
const AuthStore = (set)=>({
user : null,
isloading: false,
isCheckingAuth: true,
error: null, 
isAuthenticated:false,

signup: async (email, username, password)=>{
    set((state)=>({error:null, isloading:true}))
    try{
        const response = await axios.post(`${API_URI}/signup`, {email, username, password})
        set((state)=>({user:response.data.user, isloading:false, isAuthenticated:true}))
    }catch(error){
   set((state)=>({error:error.response.data.message || "Error in verifying Email(Store)", isloading:false, }))
   throw Error
    }
},
verifyEmail:async (code)=>{
  set((state)=>({error:null, isloading:true}))
  try{
     const response = await axios.post(`${API_URI}/verify-email`, {code})
     set((state)=>({isloading:false, user:response.data.user, isAuthenticated:true}))
  }catch(error){
    set((state)=>({error:error.response.data.message, isloading:false}))
    throw Error
  }
},
checkAuth: async ()=>{
    set((state)=>({error:null, isCheckingAuth:true}))
    try{
      const response = await axios.get(`${API_URI}/check-auth`)
      set((state)=>({user:response.data.user, isCheckingAuth:false, isAuthenticated:true}))
    }catch(error){
      set({error:null, isCheckingAuth:false, isAuthenticated: false})
    }
  },
  logout: async()=>{
    set((state)=>({error:null, isloading: true}))
    try{
      const response = await axios.post(`${API_URI}/logout`)
      set((state)=>({isAuthenticated:false, isloading:false, user:null}))
    }catch(error){
      set((state)=>({error:null, isloading:false}))
    }
  },
  login : async (email, password)=>{
    set((state)=>({error:null, isloading:true}))
    try{
    const response = await axios.post(`${API_URI}/login`, {email, password})
    set((state)=>({user:response.data.user, isloading:false, isAuthenticated:true}))
    }catch(error){
    set((state)=>({error:error.response.data.message, isloading:false, isAuthenticated:false}))
    throw Error
    }
  },

forgotPassword: async(email)=>{
  set((state)=>({error:null, isloading:true}))
  try{
    const response = await axios.post(`${API_URI}/forgot-password`,{email} )
    set((state)=>({isloading:false}))
  }catch(error){
    set((state)=>({error:error.response.data.message, isloading:false}))
    throw Error
  }
},
resetPassword : async(token, password) =>{
  set((state)=>({error:null, isloading:true}))
  try{
    const response = await axios.post(`${API_URI}/reset-password/${token}`, {password})
    set((state)=>({user:response.data.user, isloading:false}))
  }catch(error){
    set((state)=>({error:error.response.data.message, isloading:false}))
    throw Error
  }
  
}
})

const useAuthStore = create(AuthStore)

export default useAuthStore;