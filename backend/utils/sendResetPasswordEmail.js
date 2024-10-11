import nodemailer from 'nodemailer'
import { PASSWORD_RESET_REQUEST_TEMPLATE } from './emailTemplates.js'

export const sendResetPasswordEmail = async (email, resetURL)=>{
    const htmlTemplate = PASSWORD_RESET_REQUEST_TEMPLATE;
    try{ 
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'akshay2110068@akgec.ac.in',
                pass:process.env.APP_PASSWORD
            }
        })

        const mailOptions = {
            from:'akshay2110068@akgec.ac.in',
            to:email,
            subject: "Reset Password",
            html : htmlTemplate.replace("{resetURL}", resetURL)
        }
        await transporter.sendMail(mailOptions)
        console.log("reset password email sent successfully")

    }catch{
        console.log("error in sending reset password email")
    }
}