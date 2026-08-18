import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = {
    verifyToken: async(req, res, next)=>{
        const token = req.cookies.myBlogCookie;

        if(!token)
        {
            return res.status(401).json({
                success: false,
                message: "No token found, user not logged In!"
            });
        }

        try
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //find the user details
            const user = await User.findById(decoded.id);

            if(!user)
            {
                return res.status(404).json({
                    success: false,
                    message: "User Not Found!"
                });
            }

            req.user = user;
            next();
        }
        catch(error)
        {
            return res.status(401).json({
                success: false,
                messsage: "Invalid or expired Token!"
            });
        }
    },
    authorizeRole: (userRole)=>{
        return (req, res, next)=>{
            if(!req.user || req.user.userRole !== userRole)
            {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized!"
                });
            }
            next();
        }
    }
}

export default authMiddleware;