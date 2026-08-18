import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



//Controller to Login User
export const loginAdmin = async(req, res)=>{
    try
    {
        const { userEmail, userPassword } = req.body;

        //form validation
        if(!userEmail || !userPassword)
        {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required!"
            });
        }

        //Check if user exists
        const existingUser = await User.findOne({userEmail}).select("+userPassword");
        if(!existingUser)
        {
            return res.status(409).json({
                success: false,
                message: "Invalid Credentials!"
            }); 
        }

        //compare passwords
        const isMatch = await bcryptjs.compare(userPassword, existingUser.userPassword);
        if(!isMatch)
        {
            return res.status(409).json({
                success: false,
                message: "Invalid Credentials!"
            });
        }

        //check user roles
        if(existingUser.userRole !== "admin")
        {
            return res.status(403).json({
                success: false,
                message: "Unauthorize Access!"
            });
        }



        //set token
        const token = jwt.sign(
            {
                id: existingUser._id,
                userRole: existingUser.userRole
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            }
        );

        //set cookie
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("myBlogCookie", token, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000,
            secure: isProduction,
            sameSite: isProduction ? "None" : "Lax",
            path: "/"
        });

        //login the user
        res.status(201).json({
            success: true,
            message: "Welcome Back",
            token
        });

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something Went wrong While Loggin In!"
        });
    }
}

export const adminData = async(req, res)=>{
    try
    {
        const token = req.cookies.myBlogCookie;
        if(!token)
        {
            return res.status(401).json({
                success: false,
                message: "Unauthorize Access!"
            });
        }

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        //get user data
        const userData = await User.findById(userId).select("-userPassword");
        if(!userData)
        {
            return res.status(404).json({
                success: false,
                message: "User Not Found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
            data: userData
        });

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something Went wrong While Fetching User Data!"
        });
    }
}