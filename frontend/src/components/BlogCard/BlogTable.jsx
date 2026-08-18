import { Link } from "react-router-dom";

const BlogTable = ({ blogs = [], onDelete }) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blogs.map((blog, index)=>{
                            return (
                                <tr key={blog._id}>
                                    <th scope="row">
                                        {index + 1}
                                    </th>
                                    <td>
                                        { blog.blogTitle }
                                    </td>
                                    <td>
                                        { blog.blogDescription }
                                    </td>
                                    <td>
                                        <Link className="btn btn-primary btn-sm me-2"
                                        to={`/admin-dashboard/update-blog/${blog._id}`}>
                                            Edit
                                        </Link>

                                        <button className="btn btn-danger btn-sm" 
                                        onClick={()=>onDelete(blog._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
        </div>
    );
};

export default BlogTable;