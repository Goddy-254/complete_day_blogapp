import BlogCard from "../BlogCard/BlogCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const RecentBlogs = () => {
    
    const [blogs, setBlogs] = useState([]);
    const backendLink = useSelector((state)=>state.prod.link);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchBlogs = async()=>{
            try
            {
                setLoading(true);
                const response = await axios.get(`${backendLink}/api/blog/recent-blogs`, {
                    withCredentials: true
                });
                setBlogs(response.data.message);
                setLoading(false);
            }
            catch(error)
            {
                setLoading(false);
                toast.error(error.response.data.message);
            }

        }
        fetchBlogs();
    }, []);

    return (
        <div className="container my-5">

            <h2
                className="text-center fw-bold mb-5"
                style={{ color: "#171819" }}
            >
                Recent Blogs
            </h2>

            <div className="row g-4">
                {blogs.map((blog, index) => (
                    <div key={index} className="col-12 col-md-4">
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default RecentBlogs;