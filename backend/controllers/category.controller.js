import Category from "../models/category.model.js";
import Blog from "../models/blog.model.js";


//create categories
export const createCategory = async(req, res)=>{
    try
    {
        const { categoryName } = req.body;

        if(!categoryName)
        {
            return res.status(400).json({
                success: false,
                message: "Category Name cannot be empty!"
            });
        }

        const category = await Category.findOne({ categoryName });

        if(category)
        {
            return res.status(409).json({
                success: false,
                message: "Category Already exists!"
            });
        }
        const newCategory = new Category({
            categoryName
        });

        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: "Category Created!"
        });

    }
    catch(error)
    {
        //console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

//fetch categories
export const fetchCategories = async(req, res)=>{
    try
    {
        const categories = await Category.find();

        return res.status(200).json({
            success: true,
            categories
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

//fetch blogs per category
export const fetchBlogByCategory = async(req, res)=>{
    try
    {
        const { id } = req.params;

        const blogs = await Blog.find({blogCategory: id })
        .populate("blogCategory", "categoryName")
        .sort({createAt: -1});

        return res.status(200).json({
            success: true,
            message: blogs
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false, 
            message: "Something went wrong!"
        });
    }
}