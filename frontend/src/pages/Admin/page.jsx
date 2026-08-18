import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/AdminComponents/Sidebar/SideBar";

const AdminDashboard = () => {
  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-3 col-lg-3">
          <AdminSideBar />
        </div>
        <div className="col-md-9 col-lg-9">
          <div className="bg-light rounded-4 shadow-sm p-4 min-vh-100">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;

//Note to self, once there is more data make the sidebar fixed and main content (outlet scrollable)