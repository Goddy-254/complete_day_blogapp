import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth.js";


const AdminLogin = () => {
    
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const backendLink = useSelector((state)=>state.prod.link);
    const redirect = useNavigate();
    const dispatch = useDispatch();


    const handleLogin = async(e)=>{
        e.preventDefault();
        try
        {
            const userData = { userEmail, userPassword }
            const response = await axios.post(`${backendLink}/api/admin/admin-login`, userData, {withCredentials: true});

            if(response.data.success)
            {
                dispatch(authActions.login());
                toast.success(response.data.message || "Admin logged in successfully!");
                redirect("/admin-dashboard");
            } else {
                dispatch(authActions.logout());
                toast.error(response.data.message || "Admin login failed");
            }
        }
        catch(error)
        {
            dispatch(authActions.logout());
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return ( 
        <div className="container py-5">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-primary">
                                    Welcome Admin
                                </h2>
                                <p className="text-muted">
                                   Login to Continue!
                                </p>
                            </div>
                            <form onSubmit={handleLogin}>
                                <div class="form-floating mb-3">
                                    <input 
                                        type="email" 
                                        name="userEmail"
                                        class="form-control" 
                                        id="floatingInput" 
                                        placeholder="Enter Your Email" 
                                        value={userEmail}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        />
                                    <label for="floatingInput">Enter Your Email</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input 
                                        type="password" 
                                        name="userPassword"
                                        class="form-control" 
                                        id="floatingInput" 
                                        placeholder="Enter Your Password" 
                                        value={userPassword}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        />
                                    <label for="floatingInput">Enter Password</label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg w-100"
                                >
                                    Login
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AdminLogin;