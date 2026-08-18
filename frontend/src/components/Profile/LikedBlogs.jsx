import BlogCard from "../BlogCard/BlogCard";

const LikedBlogs = () => {
    const blogs = [
        {
            title: "Understanding JavaScript Closures",
            excerpt: "Learn how closures work in JavaScript and why they are important in modern development.",
            to: "/blogs/js-closures",
            date: "May 2026",
        },
        {
            title: "Getting Started with React Hooks",
            excerpt: "A beginner-friendly guide to useState, useEffect and custom hooks.",
            to: "/blogs/react-hooks",
            date: "April 2026",
        },
        {
            title: "Building REST APIs with Node.js",
            excerpt: "Step-by-step guide to building scalable APIs using Express and Node.js.",
            to: "/blogs/node-api",
            date: "March 2026",
        },
    ];
    return ( 
        <div className="container my-5">

            <h2
                className="text-center fw-bold mb-5"
                style={{ color: "#171819" }}
            >
                Liked Blogs
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
 
export default LikedBlogs; 