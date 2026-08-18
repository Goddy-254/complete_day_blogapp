import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaEdit,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/auth.js";
import { toast } from "react-toastify";
import axios from "axios";

const AdminSideBar = () => {
  const location = useLocation();

  const Links = [
    {
      name: "Dashboard",
      to: "/admin-dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Add Blog",
      to: "/admin-dashboard/add-blog",
      icon: <FaPlusCircle />,
    },
    {
      name: "Manage Blogs",
      to: "/admin-dashboard/manage-blog",
      icon: <FaEdit />,
    },
  ];

  const backendLink = useSelector((state)=>state.prod.link)
  const redirect = useNavigate();
  const dispatch = useDispatch();

  //logout logic
   const handleLogout = async()=>{
    try
    {
      const response = await axios.post(`${backendLink}/api/user/logout`, {}, {withCredentials: true});

    redirect("/adminLogin");


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
      className="d-flex flex-column bg-white border-end"
      style={{
        width: "280px",
        minHeight: "100vh",
        padding: "2rem 1.5rem",
        boxShadow: "0 0 15px rgba(0,0,0,0.04)",
      }}
    >
      <div className="text-center mb-5">
        <FaUserShield
          size={70}
          className="text-primary mb-3"
        />

        <h5 className="fw-bold mb-1">
          Admin Panel
        </h5>

        <p className="text-muted small">
          Blog Management System
        </p>
      </div>
      <ul className="nav nav-pills flex-column gap-2">
        {Links.map((item, i) => {
          const isActive = location.pathname === item.to;

          return (
            <li className="nav-item" key={i}>
              <Link
                to={item.to}
                className="nav-link d-flex align-items-center gap-3 fw-semibold"
                style={{
                  padding: "0.9rem 1rem",
                  borderRadius: "14px",
                  transition: "0.3s ease",
                  backgroundColor: isActive
                    ? "#0d6efd"
                    : "transparent",
                  color: isActive ? "white" : "#212529",
                  boxShadow: isActive
                    ? "0 4px 12px rgba(13,110,253,0.25)"
                    : "none",
                }}
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

      {/* Bottom Card */}
      <div className="mt-auto mb-3">
        <div
          style={{
            background:
              "linear-gradient(135deg, #0d6efd, #4f8dfd)",
            color: "white",
            borderRadius: "18px",
            padding: "1.2rem",
            boxShadow:
              "0 4px 15px rgba(13,110,253,0.2)",
          }}
        >
          <h6 className="fw-bold">
            Manage Content
          </h6>

          <p className="small mb-0">
            Create, edit and organize blogs easily
            from your dashboard.
          </p>
        </div>
      </div>
      <button
       className="btn btn-outline-danger"
       onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default AdminSideBar;