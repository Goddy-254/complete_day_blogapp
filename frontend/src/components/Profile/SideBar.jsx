import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserGear } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authActions } from "../../store/auth.js";

import {
  FaHome,
  FaHeart,
  FaThumbsUp,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const SideBar = () => {
  const location = useLocation();
  const backendLink = useSelector((state)=>state.prod.link)
  const redirect = useNavigate();
  const dispatch = useDispatch();

  const SideBarLinks = [
    {
      name: "Dashboard",
      to: "/profile",
      icon: <FaHome />,
    },
    {
      name: "Favourites",
      to: "/profile/favourites",
      icon: <FaHeart />,
    },
    {
      name: "Liked Blogs",
      to: "/profile/liked-blogs",
      icon: <FaThumbsUp />,
    },
    {
      name: "Manage Account",
      to: "/profile/manage-account",
      icon: <FaUserGear />,
    },
    {
      name: "Help",
      to: "/profile/help-section",
      icon: <FiHelpCircle />,
    },
  ];

  const handleLogout = async()=>{
    try
    {
      const response = await axios.post(`${backendLink}/api/user/logout`, {}, {withCredentials: true});

    redirect("/login");


      if(response.data.success){
        dispatch(authActions.logout());
        toast.success(response.data.message);
      }
    }
    catch(error)
    {
      console.log(error);
    }
  } 

  return (
    <div
      className="d-flex flex-column bg-white shadow-sm border-end p-4"
      style={{
        width: "280px",
        minHeight: "100vh",
      }}
    >
      <div className="text-center mb-5">
        <FaUserCircle
          size={70}
          className="text-primary mb-3"
        />

        <h5 className="fw-bold mb-1">
          Victor Simiyu
        </h5>

        <p className="text-muted small">
          Blogger & Developer
        </p>
      </div>
      <ul className="nav nav-pills flex-column gap-2">

        {SideBarLinks.map((item, i) => {
          const isActive = location.pathname === item.to;

          return (
            <li className="nav-item" key={i}>
              <Link
                to={item.to}
                className={`nav-link d-flex align-items-center gap-3 px-3 py-3 rounded-3 fw-semibold ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-dark"
                }`}
              >
                <span style={{ fontSize: "1.1rem" }}>
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}

      </ul>
      <div className="mt-auto mb-3">
        <div className="card border-0 bg-primary text-white rounded-3 shadow-sm">
          <div className="card-body">
            <h6 className="fw-bold">
              Keep Writing
            </h6>

            <p className="small mb-0">
              Share your ideas and inspire others with your blogs.
            </p>
          </div>
        </div>
      </div>
      <button
      onClick={handleLogout}
        className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default SideBar;