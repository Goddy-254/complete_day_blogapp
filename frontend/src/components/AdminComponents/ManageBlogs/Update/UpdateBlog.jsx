import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendLink = useSelector((state) => state.prod.link);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [blogData, setBlogData] = useState({
    blogTitle: "",
    blogDescription: "",
    blogContent: "",
    blogCategory: "",
  });
  const [blogImage, setBlogImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendLink}/api/blog/show-categories`, {
          withCredentials: true,
        });
        setCategories(response.data.categories || []);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${backendLink}/api/blog/blog-details/${id}`, {
          withCredentials: true,
        });
        const blog = response.data.message;
        setBlogData({
          blogTitle: blog.blogTitle || "",
          blogDescription: blog.blogDescription || "",
          blogContent: blog.blogContent || "",
          blogCategory: blog.blogCategory?._id || blog.blogCategory || "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load blog details");
      }
    };

    fetchCategories();
    fetchBlogData();
  }, [backendLink, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("blogTitle", blogData.blogTitle);
      formData.append("blogDescription", blogData.blogDescription);
      formData.append("blogContent", blogData.blogContent);
      formData.append("blogCategory", blogData.blogCategory);

      if (blogImage) {
        formData.append("image", blogImage);
      }

      const response = await axios.put(`${backendLink}/api/blog/update-blog/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message);
      navigate("/admin-dashboard/manage-blog");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold">Update This Blog</h2>
        <p className="text-muted">Fill in the details below to update this existing blog.</p>
      </div>

      <form className="card border-0 shadow-sm rounded-4 p-4" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Blog Title"
            value={blogData.blogTitle}
            onChange={(e) => setBlogData({ ...blogData, blogTitle: e.target.value })}
          />
          <label htmlFor="title">Title</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Short description"
            value={blogData.blogDescription}
            onChange={(e) => setBlogData({ ...blogData, blogDescription: e.target.value })}
          />
          <label htmlFor="description">Description</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="Write your blog content"
            id="content"
            style={{ height: "150px" }}
            value={blogData.blogContent}
            onChange={(e) => setBlogData({ ...blogData, blogContent: e.target.value })}
          ></textarea>
          <label htmlFor="content">Content</label>
        </div>

        <div className="mb-3">
          <select
            className="form-select"
            value={blogData.blogCategory}
            onChange={(e) => setBlogData({ ...blogData, blogCategory: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Upload Image</label>
          <input
            type="file"
            className="form-control"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setBlogImage(e.target.files[0])}
          />
          <small className="text-muted">Allowed formats: JPG, JPEG, PNG</small>
        </div>

        <button className="btn btn-primary w-100 py-2 fw-semibold rounded-3" disabled={loading}>
          {loading ? "Updating Blog..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;