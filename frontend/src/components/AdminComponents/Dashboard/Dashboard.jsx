import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FaBlog,
  FaUsers,
  FaHeart,
  FaComments,
} from "react-icons/fa";

const Dashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const backendLink = useSelector((state) => state.prod.link);
  const stats = [
    {
      title: "Blogs",
      value: 24,
      icon: <FaBlog />,
      color: "primary",
    },
    {
      title: "Users",
      value: 120,
      icon: <FaUsers />,
      color: "success",
    },
    {
      title: "Likes",
      value: 540,
      icon: <FaHeart />,
      color: "danger",
    },
    {
      title: "Comments",
      value: 89,
      icon: <FaComments />,
      color: "warning",
    },
  ];

  useEffect(()=>{
    const fetchAdminData = async()=>{
      try
      {
        const response = await axios.get(`${backendLink}/api/admin/admin-data`, { withCredentials: true });
        setProfileData(response.data.data);
        console.log(response.data.data);
      }
      catch(error)
      {
        console.log(error.response.data);
      }
    }
    fetchAdminData();
  }, [backendLink]);

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">
          Admin Dashboard
        </h2>

        <p className="text-muted">
          Welcome back, {profileData?.userName || "Admin"}! Here is an overview of the platform's performance and user engagement.
        </p>
      </div>
      <div className="row g-4">

        {stats.map((item, i) => (
          <div className="col-md-6 col-lg-3" key={i}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              
              <div className="card-body">
                <div
                  className={`bg-${item.color} bg-opacity-10 text-${item.color} rounded-3 d-inline-flex align-items-center justify-content-center mb-3`}
                  style={{
                    width: "55px",
                    height: "55px",
                    fontSize: "1.3rem",
                  }}
                >
                  {item.icon}
                </div>

                <h3 className="fw-bold">
                  {item.value}
                </h3>

                <p className="text-muted mb-0">
                  {item.title}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>
      <div className="card border-0 shadow-sm rounded-4 mt-5">
        
        <div className="card-body">
          <h5 className="fw-bold mb-4">
            Recent Blogs
          </h5>

          <div className="d-flex flex-column gap-3">

            <div className="d-flex justify-content-between border-bottom pb-2">
              <span>Understanding React Hooks</span>
              <span className="text-muted small">
                Published
              </span>
            </div>

            <div className="d-flex justify-content-between border-bottom pb-2">
              <span>Getting Started with Node.js</span>
              <span className="text-muted small">
                Draft
              </span>
            </div>

            <div className="d-flex justify-content-between">
              <span>MongoDB for Beginners</span>
              <span className="text-muted small">
                Published
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

//More functionalities and data to display will be descided by students after we have some real data, 
//as part of their assignment!