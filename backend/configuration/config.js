import mongoose from "mongoose";

export const connectDB = async() =>{
    try
    {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB!")
    }
    catch(error)
    {
        console.error("Failed to connect to MongoDB:", error.message);
        throw error;
    } 
}