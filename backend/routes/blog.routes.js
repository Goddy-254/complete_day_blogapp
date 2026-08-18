import express from "express";
import { blogDetails, createBlog, fetchBlogs, recentBlogs, updateBlog, deleteBlog } from "../controllers/blog.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/images.middleware.js";
import { createCategory, fetchBlogByCategory, fetchCategories } from "../controllers/category.controller.js";

const router = express.Router();

//create blog
router.post("/create-blog", 
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    upload.single("image"),
    createBlog);

//update blog
router.put("/update-blog/:id",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    upload.single("image"),
    updateBlog
);

//create category
router.post("/create-category", 
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    createCategory
    );

//show categories
router.get("/show-categories", fetchCategories);

//fetch all blogs
router.get("/all-blogs", fetchBlogs);

//fetch recent blogs
router.get("/recent-blogs", recentBlogs);

//blog details
router.get("/blog-details/:id", blogDetails);

//fetch blog by category
router.get("/blog-by-category/:id", fetchBlogByCategory);

// Delete blog
router.delete("/delete-blog/:id",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("admin"),
    deleteBlog
);

export default router;

