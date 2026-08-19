import mongoose from "mongoose";

export const connectDB = async() =>{
    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB!")
    }
    catch(error)
    {
        console.log(error);
        console.log("Failed to Connect to MongoDB!");
    } 
}