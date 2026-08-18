import { FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"

const ManageAccount = () => {

  const [changeAvatar, setChangeAvatar] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const backendUrl = useSelector((state)=>state.prod.link);


  const handleAvatar = (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    setChangeAvatar(file);
    setPreview(URL.createObjectURL(file));
  }

  const avatarChange = async()=>{
    try
    {
      setLoading(true);
      const data = new FormData();
      data.append("image", changeAvatar)
      const response = await axios.put(`${backendUrl}/api/user/change-avatar`, data, {withCredentials: true});
      setLoading(false);
      toast.success(response.data.message);
    }
    catch(error)
    {
      setLoading(false);
      toast.error(error.response.data.message)

    }
  }

  return (
    <div className="container py-4">
      {/* Account Info & Avatar Card */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <div className="d-flex align-items-center gap-4 flex-wrap">
          {/* Avatar Section */}
          <div className="d-flex flex-column align-items-center">
            <div
              className="border rounded-circle d-flex align-items-center justify-content-center overflow-hidden shadow-sm"
              style={{ width: "150px", height: "150px", background: "#f8f9fa" }}
            >
              <label
                htmlFor="imgFile"
                className="w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ cursor: "pointer" }}
              >
              { preview? (
                <img 
                  src={preview}
                  alt="Avatar image"
                  className="w-100 h-100"
                  style={{objectFit: "cover"}}
                />
              ) : (
                <FaUser size={60} className="text-secondary" />
              )
              }
                
              </label>
            </div>
            <input
              type="file"
              id="imgFile"
              className="d-none"
              accept="image/*"
              onChange={handleAvatar}
            />
           {!loading &&
            <button type="button" className="btn btn-primary mt-3"
            onClick={avatarChange}
            >
              Change Avatar
            </button>}
            {loading &&
            <button type="button" className="btn btn-warning mt-3"
            disabled
            >
              Changing Avatar . . .
            </button>}
          </div>

          {/* User information */}
          <div className="flex-grow-1">
            <div className="p-3 rounded-3 bg-light border">
              <h4 className="mb-1 fw-bold">John Doe</h4>

              <p className="mb-2 text-muted">Blogger • Developer</p>

              <div className="d-flex flex-column gap-1">
                <small className="text-muted">
                  <CiMail /> victor.simiyu@gmail.com
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Form */}
      <div className="card shadow-sm border-0 p-4">
        <h5 className="mb-4 fw-bold">Change Password</h5>

        <form className="row g-3">
          {/* Current Password */}
          <div className="col-12">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                placeholder="Current Password"
                name="userPassword"
              />
              <label htmlFor="currentPassword">Current Password</label>
            </div>
          </div>

          {/* New Password */}
          <div className="col-12 col-md-6">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="New Password"
                name="newPassword"
              />
              <label htmlFor="newPassword">New Password</label>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="col-12 col-md-6">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm New Password"
                name="confirmPassword"
              />
              <label htmlFor="confirmPassword">Confirm New Password</label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-sm w-100">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageAccount;