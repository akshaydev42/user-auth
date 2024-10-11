import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next)=>{
    const {token} = req.cookies
    if(!token) return res.status(400).json({success:false, message:"no token found"})
        try{
     const decoded = jwt.verify(token, process.env.SECRET_KEY)
     if(!decoded) return res.status(400).json({success:false , message:"no valid token found"})
    
        req.userId = decoded.userId
        next()

    }catch(error){
    res.status(400).json({success:false, message:error.message})
    }
}