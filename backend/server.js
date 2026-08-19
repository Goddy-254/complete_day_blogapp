import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configuration/config.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://my-blog-app-nu-three.vercel.app"
    ],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
//test api
// app.use("/",(req, res)=>{
//     res.status(200).json({
//         succes: true,
//         message: "Backend Ready"
//     })
// });

//routes
//1.user
app.use("/api/user", userRoutes);
//2.admin
app.use("/api/admin", adminRoutes)
//3.blogs
app.use("/api/blog", blogRoutes);

 
const MYPORT = process.env.PORT;

const startServer = async()=>{
    
    await connectDB();

    app.listen(MYPORT, ()=>{ 
        console.log(`Server Listening to Requests on PORT ${MYPORT}`);
    });
}

startServer();

