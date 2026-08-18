import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddBlog = () => {

  const [blogTitle, setTitle] = useState("");
  const [blogDescription, setDescription] = useState("");
  const [blogContent, setContent] = useState("");
  const [blogImage, setImage] = useState("");
  const [blogCategory, setBlogCategory] = useState("");

  const [loading, setLoading] = useState(false);  

  const [categoryName, setName] = useState(""); //create category
  const [categories, setCategories] = useState([]); //fetching categories
  //console.log(categories)

  const backendLink = useSelector((state)=>state.prod.link);

  //creating blog
  const handleCreateBlog = async(e)=>{
    e.preventDefault();
    try
    {
      setLoading(true);
      const myBlog = new FormData();
      myBlog.append("blogTitle", blogTitle);
      myBlog.append("blogDescription", blogDescription);
      myBlog.append("blogContent", blogContent);
      myBlog.append("image", blogImage);
      myBlog.append("blogCategory", blogCategory);

      const response = await axios.post(`${backendLink}/api/blog/create-blog`, myBlog, { 
        withCredentials: true
      });
      setLoading(false);
      toast.success(response.data.message);
    }
    catch(error)
    {
      setLoading(false);
      const message = error.response?.data?.message || error.message || "Unable to create blog";
      toast.error(message);
      console.log("Create blog error:", error.response?.data || error.message);
    }
    finally{
      setTitle("");
      setDescription("");
      setContent("");
      setImage("");
    }
  }

  //creating category
  const handleCreateCategory = async(e)=>{
    e.preventDefault();
    try
    {
      const data = { categoryName }
      const response = await axios.post(`${backendLink}/api/blog/create-category`, data, {
        withCredentials: true
      } );
      toast.success(response.data.message);
      setName("");
    }
    catch(error)
    {
      setLoading(false);
      toast.error(error.response.data.message)
    }
  }

  //fetch categories
  useEffect(()=>{
    const fetchCategories = async()=>{
      const response = await axios.get(`${backendLink}/api/blog/show-categories`,
        {
          withCredentials: true
      });
      setCategories(response.data.categories);
    }
    fetchCategories();
  }, [backendLink]);
  return (
    <div className="container py-4">
      
      <div className="mb-4">
        <h2 className="fw-bold">Create New Blog</h2>
        <p className="text-muted">Fill in the details below to publish a new blog post.</p>
      </div>

      <form className="card border-0 shadow-sm rounded-4 p-4" onSubmit={handleCreateBlog}>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Blog Title"
            value={blogTitle}
            onChange={(e)=>setTitle(e.target.value)}
          />
          <label htmlFor="title">Title</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Short description"
            value={blogDescription}
            onChange={(e)=>setDescription(e.target.value)}
          />
          <label htmlFor="description">Description</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            value={blogContent}
            onChange={(e)=>setContent(e.target.value)}
            className="form-control"
            placeholder="Write your blog content"
            id="content"
            style={{ height: "150px" }}
          ></textarea>
          <label htmlFor="content">Content</label>
        </div>

        <div className="mb-3">
          <select className="form-select"
          onChange={(e)=>setBlogCategory(e.target.value)}
          >
            <option value="">
              Select Categories
            </option>
            {
              categories.map((category)=>{
                return (
                  <option
                  key={category._id}
                  value={category._id}
                  >
                    {
                      category.categoryName
                    }
                  </option>
                )
              })
            }
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            Upload Image
          </label>

          <input
            type="file"
            className="form-control"
            accept=".jpg,.jpeg,.png"
            onChange={(e)=>setImage(e.target.files[0])}
          />

          <small className="text-muted">
            Allowed formats: JPG, JPEG, PNG
          </small>
        </div>

        {!loading &&
          <button className="btn btn-primary w-100 py-2 fw-semibold rounded-3">
          Publish Blog
        </button>}

        {loading &&
          <button className="btn btn-warning w-100 py-2 fw-semibold rounded-3" disabled>
          Publishing Blog . . .
        </button>}

      </form>

      {/* Create category */}
      <h4 className="mt-3">Create New Category</h4>
      <form className="mt-3" onSubmit={handleCreateCategory}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Blog Category"
            value={categoryName}
            onChange={(e)=>setName(e.target.value)}
          />
          <label htmlFor="title">Enter a Category Name</label>
        </div>
        <button className="btn btn-primary">
          Create Category
        </button>
      </form>
    </div>
  );
};

export default AddBlog;