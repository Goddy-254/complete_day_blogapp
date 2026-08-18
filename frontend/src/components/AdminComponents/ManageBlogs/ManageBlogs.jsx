import { useState } from "react";
import BlogTable from "../../BlogCard/BlogTable";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
 
const EditBlog = () => {

   const [blogs, setBlogs] = useState([]);
   const backendLink = useSelector((state)=>state.prod.link);
   const [loading, setLoading] = useState(false);

   const handleDelete = async (blogId) => {
        const confirmed = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmed) {
            toast.info("Blog deletion cancelled");
            return;
        }

        try {
            const response = await axios.delete(`${backendLink}/api/blog/delete-blog/${blogId}`, {
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Unable to delete blog";
            toast.error(message);
        }
   };

   useEffect(()=>{
    const fetchBlogs = async()=>{
        try
        {
            setLoading(true);
            const response = await axios.get(`${backendLink}/api/blog/all-blogs`, {
                withCredentials: true
            });
            setBlogs(response.data.message);
            setLoading(false);
        }
        catch(error)
        {
            setLoading(false);
            toast.error(error.response?.data?.message || "Failed to load blogs");
        }

    }
    fetchBlogs();
   }, [backendLink]);

    return (
        <div className="container my-5">

            <h2
                className="text-center fw-bold mb-5"
                style={{ color: "#171819" }}
            >
                Manage Blogs
            </h2>
            {loading && <h4 className="text-success">Loading Blogs . . .</h4>}
            <BlogTable blogs={blogs} onDelete={handleDelete} />

        </div>
    );
}

export default EditBlog;