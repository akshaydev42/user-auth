import nodemailer from 'nodemailer'
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from './emailTemplates.js'
export const sendResetSuccessfullEmail = async (email)=>{
    const htmlTemplate = PASSWORD_RESET_SUCCESS_TEMPLATE
    try{
         const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akshay2110068@akgec.ac.in',
                pass: process.env.APP_PASSWORD
            }
         })
         const mailOptions = {
            from : "akshay2110068@akgec.ac.in",
            to : email,
            subject: "Password reset successfull",
            html : htmlTemplate
         }
         await transporter.sendMail(mailOptions)
         console.log("password reset success email sent")
    }catch(error){
      console.log("error in sending password reset success email")
    }
}