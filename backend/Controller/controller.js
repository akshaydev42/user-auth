import User from  '../Models/user.js'
import { generateTokenAndCookie } from '../utils/generateTokenAndCookie.js';
import { sendVerificatonEmail } from '../utils/sendVerificatonEmail.js';
import { sendResetPasswordEmail } from '../utils/sendResetPasswordEmail.js';
import { sendResetSuccessfullEmail } from '../utils/sendResetSuccessfullEmail.js';
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'

export const signup = async (req, res) =>{
    const {email, password, username} = req.body;
    try{
    if(!email || !password || !username){
        throw new Error("Fill all the fields")
        // return res.status(400).json({success:false, message:"Fill all the fields"})
    }
    const userAlreadyExist = await User.findOne({email})
    if(userAlreadyExist) return res.status(400).json({success:false, message:"User already exist"})
      
       const hashedPassword = await bcryptjs.hash(password, 10)
         const user = new User({
            email, 
            password : hashedPassword ,
            username,
            verificationToken : Math.floor(100000+Math.random()*900000).toString(),
            verificationTokenExpiresAt :Date.now() + 24*60*60*1000 // 24 hr
         })
          await user.save()

         // jwt token 
            generateTokenAndCookie(res, user._id ); // simply call it
        await sendVerificatonEmail(email, user.verificationToken);
         res.status(201).json({
            success: true,
            message:"user successfully created",
            user:{...user._doc,
            password:undefined
            }
         })//367569
    }catch(error){
       res.status(400).json({success:false, message:error.message})
    }
}

export const verifyEmail = async (req, res)=>{
    // 2 5 3 5 9 1
   const {code} = req.body;
   try{
       const user = await User.findOne({
        verificationToken:code,
         verificationTokenExpiresAt:{$gt : Date.now()}
       })
       if(!user) return res.status(400).json({success:false, message:"Invalid or Verificaton Token expired"})

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()
        
        res.status(200).json({
            success: true,
            message:"Email verified successfully",
            user:{
                ...user._doc,
                password : undefined
            }
        })
   }catch(error){
     res.status(400).json({
        success: false ,
        message:"Error in verify email"
     })
   }
}


export const login = async (req, res) =>{
 const {email, password} = req.body;
 try{
    const user = await User.findOne({ email })
    if(!user) return res.status(400).json({success:false, message:"Invalid Email"})

    const isValidPassword = await bcryptjs.compare(password, user.password)
   
    if(!isValidPassword) return res.status(400).json({success:true, message:"Invalid Password"})
     
      generateTokenAndCookie(res, user._id)
      user.lastLogin = new Date();
      await user.save()
      res.status(200).json({
         success:true,
         message:"logged in successfully",
         user: {
            ...user._doc,
            password:undefined
         }
      })
 }catch(error){
   console.log("error in login")
   return res.status(400).json({success:false, message:"Error in login"})
 }
}

export const logout = (req, res) =>{
   res.clearCookie("token")
   res.status(200).json({success:true, message:"logged out successfully"})
}

export const forgotPassword = async (req, res)=>{
   const {email} = req.body;
   try{
     const user = await User.findOne({email})
     if(!user) return res.status(400).json({success:false, message:"User doesn't exist"})
     
      const resetToken = crypto.randomBytes(20).toString("hex")
      user.resetPasswordToken = resetToken
      user.resetPasswordTokenExpiresAt = Date.now() + 1*60*60*1000; // 1 hour
      await user.save()

      await sendResetPasswordEmail(email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

   res.status(200).json({
      success:true, 
      message:"forgot password request fulfilled successfully"
   })

   }catch(error){
   res.status(400).json({success:false, message:"error in forgot password request"})
   }

}

export const resetPassword  = async (req, res)=>{
 const {token} = req.params;
 const {password} = req.body;
 try{
   const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt:{$gt: new Date()}
   })

   if(!user) return res.status(400).json({success:false, message:"Invalid or expired reset token"})
   const newPassword = await bcryptjs.hash(password, 10);
   user.password = newPassword
   user.resetPasswordToken = undefined
   user.resetPasswordTokenExpiresAt = undefined
   await user.save()

   await sendResetSuccessfullEmail(user.email)

   res.status(200).json({
      success:true,
      message:"password got reset successfully",
      user:{
         ...user._doc,
         password: undefined
      }
   }) 
 }catch(error){
   res.status(400).json({success:false, message: error.message})
 }
 
}

export const checkAuth = async (req, res)=>{
   try{
      const user = await User.findById(req.userId).select('-password')
      if(!user) return res.status(400).json({success:false, message:"User not authenticated"})
      res.status(200).json({
       success:true,
       user
      })
   } catch(error){
      res.status(400).json({success:false, message:error.message})
   }
}