import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: true,
        trim: true,
    },
    blogDescription: {
        type: String,
        required: true,
        trim: true,
    },
    blogContent: {
        type: String,
        required: true,
        trim: true,
    },
    blogImage: {
        type: String,
        required: true,
    },
    blogCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;