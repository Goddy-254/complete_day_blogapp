import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true, 
    },
    userEmail: {
        type: String,
        required: true,
        unique: true, 
    },
    userPassword: {
        type: String, 
        required: true,
        select: false,
    },
    userRole: {
        type: String,
        required: true,
        default: "user",
        enum: ["admin", "user"]
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;