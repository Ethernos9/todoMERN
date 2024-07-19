import mongoose from "mongoose"

const connectDb = async(url)=>{
    await mongoose.connect(url)
}

export default connectDb
