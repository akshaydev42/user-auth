import mongoose from 'mongoose'

const connectDb = async ()=>{
    try{
    const conn  = await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDb connected: ", conn.connection.host)

    }catch(error){
    console.log("Error connection to Mongodb", error.message)
    process.exit(1)
    }
}

export default connectDb