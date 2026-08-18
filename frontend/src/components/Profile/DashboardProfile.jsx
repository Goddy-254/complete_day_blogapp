import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserCircle, FaHeart, FaFileAlt, FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";

const DashboardProfile = () => {
  const backendUrl = useSelector((state)=>state.prod.link);
  //console.log(backendUrl);
  const stats = [
    {
      title: "My Blogs",
      value: 12,
      icon: <FaFileAlt />,
    },
    {
      title: "Favourites",
      value: 8,
      icon: <FaHeart />,
    },
    {
      title: "Comments",
      value: 24,
      icon: <FaComments />,
    },
  ];

  const [profile, setProfile] = useState([]);
  //console.log(profile);

  useEffect(()=>{
   try
   {
     const fetchProfile = async()=>{
      const response = await axios.get(`${backendUrl}/api/user/user-profile`, { withCredentials: true });
      setProfile(response.data.data);
    }
    fetchProfile();
   }
   catch(error)
   {
    console.log(error.response.data)
   }
  }, [backendUrl]);

  return (
    <div className="container-fluid">
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body d-flex align-items-center gap-3">
          <div
            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: "100px", height: "100px", fontSize: "2rem" }}
          >
          {
            profile ? (
              <img 
                src={profile.avatar}
                alt="avatar"
                style={{objectFit: "cover", width: "100px", height: "100px"}}
              />
            ) : (
              <FaUserCircle />
            )
          }
            
          </div>

          <div>
            <h3 className="mb-1">Welcome Back, {profile?.userName} </h3>
            <p className="text-muted mb-0">
              Manage your blogs, favourites and profile here.
            </p>
            <button className="btn btn-primary btn-radius">
              {profile.userEmail}
            </button>
          </div>
        </div>
      </div>
      <div className="row g-4">
        {stats.map((stat, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow-sm border-0 rounded-4 h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">{stat.title}</h6>
                  <h2 className="fw-bold">{stat.value}</h2>
                </div>

                <div
                  className="bg-light text-primary rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card shadow-sm border-0 rounded-4 mt-4">
        <div className="card-body">
          <h4 className="mb-3">Recent Activity</h4>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              You published a new blog post.
            </li>

            <li className="list-group-item">
              Someone commented on your article.
            </li>

            <li className="list-group-item">
              You added a blog to favourites.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;