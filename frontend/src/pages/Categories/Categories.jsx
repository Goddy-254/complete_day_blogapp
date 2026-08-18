import { useParams } from "react-router-dom";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Categories = () => {

    const { id } = useParams();
    const backendLink = useSelector((state)=>state.prod.link);

    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        const fetchBlogs = async()=>{
            try
            {
                const response = await axios.get(`${backendLink}/api/blog/blog-by-category/${id}`, {
                    withCredentials: true
                });
                setBlogs(response.data.message);
            }
            catch(error)
            {
                console.log(error);
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
               Read Our Blogs
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
}
 
export default Categories;