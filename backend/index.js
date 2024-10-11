import express from 'express'
import dotenv from 'dotenv'
import connectDb from './db/connectDb.js'
import authRoutes from './Routes/routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

dotenv.config()

const app = express()

// app.use(cors({origin:'http://localhost:5173', credentials:true}))
app.use(cookieParser())
app.use(express.json()) 

app.use('/api/auth', authRoutes)

const __dirname = path.resolve()
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}
const PORT  = process.env.PORT || 5000
app.listen(PORT, ()=>{
    connectDb()
    console.log("Server is running on port 3000")
})