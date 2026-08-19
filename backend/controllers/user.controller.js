import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//Controller to create a new user
export const createUser = async(req, res)=>{
    try
    {
        const { userName, userEmail, userPassword, userRole } = req.body;

        //form validation
        if(!userName || !userEmail || !userPassword)
        {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required!"
            });
        }
        //check existing user
        const existingUser = await User.findOne({$or : [{userName}, {userEmail}]});

        if(existingUser)
        {
            return res.status(409).json({
                success: false,
                message: "Username or Email already Exists!"
            });
        }

        //hash the user password - encrypt
        const hashedPassword = await bcryptjs.hash(userPassword, 10);

        //Register the user.
        const ourUser = new User({
            userName,
            userEmail,
            userPassword: hashedPassword,
            userRole
        });

        await ourUser.save();

        res.status(201).json({
            success: true,
            message: `User with Name ${userName} created!`
        });

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something Went wrong While registering!"
        });
    }
};

//Controller to Login User
export const loginUser = async(req, res)=>{
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
        if(existingUser.userRole !== "user")
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
        res.cookie("myBlogCookie", token, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: "None",
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

//check cookie existance to prove user is logged in:
export const checkCookie = (req, res)=>{
    try
    {
        const token = req.cookies.myBlogCookie;
        if(token)
        {
            return res.status(200).json({message: true});
        }
        return res.status(200).json({message: false});
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

//logout user
export const logoutUser = (req, res)=>{
    try
    {
        res.clearCookie("myBlogCookie", {
            httpOnly: true,
            maxAge: 0,
            secure: true,
            sameSite: "None",
            path: "/"
        });

        res.status(200).json({
            success: true,
            message: "Logged Out !"
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Something Went wrong!"
        });
    }
}

//user profile
export const userProfile = (req, res)=>{
    try
    {
        const { user } = req;
        //console.log("User Data",user);
        res.status(200).json({
            data: user
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Something Went wrong!"
        });
    }
}

//change profile
export const changeAvatar = async(req, res) =>{
    try
    {
        const { user } = req;
        if(!req.file)
        {
            return res.status(400).json({
            success: false,
            message: "No Avatar Selected!"
        })
        }
        user.avatar = req.file.path;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Avatar Changed Successfully!"
        })
    }
    catch(error)
    {
         return res.status(500).json({
            success: false,
            message: "Something Went wrong!"
        });
    }
}


