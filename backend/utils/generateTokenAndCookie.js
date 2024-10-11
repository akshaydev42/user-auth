import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateTokenAndCookie = (res, userId)=>{
    const token = jwt.sign({userId}, process.env.SECRET_KEY, {
        expiresIn:"7d"
    })

    res.cookie("token", token, {
        httpOnly : true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // prevent crf attack
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return token;
}