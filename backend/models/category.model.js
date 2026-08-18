import mongoose from "mongoose";

const categoryShema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
}, {timestamps: true});

const Category = mongoose.model("Category", categoryShema);

export default Category;