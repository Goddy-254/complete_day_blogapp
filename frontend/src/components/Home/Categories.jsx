import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
//import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const backendLink = useSelector((state)=>state.prod.link);

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
        <div className="container my-5">
            <h3 className="mb-4 fw-bold text-center">Explore Categories</h3>
            <div className="row g-3 justify-content-center">
                {categories.map((category, index) => (
                    <div key={index} className="col-12 col-md-4">

                        <Link
                            to={`/categories/${category._id}`}
                            className="text-decoration-none"
                        >
                            <div
                                className="p-4 text-center shadow-sm rounded category-card"
                            >
                                <h5 className="fw-semibold m-0">
                                    {category.categoryName}
                                </h5>
                            </div>
                        </Link>

                    </div>
                ))}
            </div>
            <style>
                {`
                    .category-card {
                        background: #f8fafc;
                        border: 1px solid #e2e8f0;
                        transition: 0.3s ease;
                        cursor: pointer;
                    }

                    .category-card:hover {
                        transform: translateY(-5px);
                        border-color: #0ea5e9;
                        box-shadow: 0 10px 25px rgba(14, 165, 233, 0.15);
                    }
                `}
            </style>
        </div>
    );
};

export default Categories;