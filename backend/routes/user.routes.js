import express from "express";
import { 
    changeAvatar,
    checkCookie, 
    createUser, 
    loginUser, 
    logoutUser, 
    userProfile} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/images.middleware.js";

const router = express.Router();

//create user. 
router.post("/sign-up", createUser);
//login user
router.post("/login", loginUser)
//read cookie
router.get("/cookie", checkCookie);
//logout
router.post("/logout", logoutUser);
//user profile
router.get("/user-profile", 
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("user"),
    userProfile);

router.put("/change-avatar", 
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("user"),
    upload.single("image"),
    changeAvatar)

export default router;