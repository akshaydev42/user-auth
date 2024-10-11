import nodemailer from 'nodemailer'
import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js'

export const sendVerificatonEmail = async (email, verificationToken)=>{ 

    const htmlTemplate = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
try{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        secure:false,
        auth:{
            user:'akshay2110068@akgec.ac.in',
            pass:process.env.APP_PASSWORD
        }
        
    })
    const mailOptions = {
        from:"akshay2110068@akgec.ac.in",
        to:email,
        subject: "verification token",
        html : htmlTemplate
    }
    await transporter.sendMail(mailOptions)
    console.log("verificaton Email sent successfully")
}catch(error){
    console.log("error in sending verification email ")
}
    
}