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
const allowedOrigins = [
    "http://localhost:5173",
    "https://complete-day-blogapp.vercel.app",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Origin is not allowed by CORS"));
    },
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

app.use((error, req, res, next) => {
    console.error("Unhandled server error:", error);
    if (res.headersSent) {
        return next(error);
    }
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

 
const MYPORT = process.env.PORT || 3003;

const startServer = async()=>{
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    await connectDB();

    app.listen(MYPORT, ()=>{ 
        console.log(`Server Listening to Requests on PORT ${MYPORT}`);
    });
}

startServer().catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exit(1);
});

