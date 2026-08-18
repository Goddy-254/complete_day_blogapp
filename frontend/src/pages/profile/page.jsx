import SideBar from "../../components/Profile/SideBar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className="container mb-4 py-4 d-flex justify-content-between gap-4">
      
      <div className="col-md-2">
        <SideBar />
      </div>

      <div className="col-md-9">
        
        {/* 
        Incase you are wondering where outlet is coming from and what its
        purpose it:
        Outlet is a placeholder where nested routes will be rendered.

          Example:
          If the current route is "/profile/favourites",
          React Router will render the Favourites component here.

          It allows Profile to act like a layout page
          while different child pages load inside this section.
        */}
        <Outlet />

      </div>
    </div>
  );
};

export default Profile;

