import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const Description = () => {

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState([]);
    const backendLink = useSelector((state)=>state.prod.link);

    useEffect(()=>{
        const fetchBlogs = async()=>{
            try
            {
                setLoading(true);
                const response = await axios.get(`${backendLink}/api/blog/blog-details/${id}`, {
                    withCredentials: true
                });
                setBlog(response.data.message);
                setLoading(false);
            }
            catch(error)
            {
                //console.log(error.response)
                setLoading(false);
                toast.error(error.response.data.message);
            }

        }
        fetchBlogs();
    }, []);

    

    return ( 
        <div className="container my-3">
            <div>
            <h4 className="text-center text-muted">
                Read Our Blog
            </h4>
                <img 
                    src={blog.blogImage}
                    alt="blog Image"
                    style={{height: "500px", width: "800px", objectFit: "cover"}}

                />
                <h4 className="text-danger my-3">
                    { blog.blogTitle }
                </h4>
                <h6>
                    { blog.createdAt}
                </h6>
                <h6 className="text-muted">
                    {blog.blogDescription}
                </h6>
                <p>
                    { blog.blogContent}
                </p>
            </div>
        </div>
     );
}
 
export default Description;