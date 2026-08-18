
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth.js";

const Login = () => {

        const [userEmail, setUserEmail] = useState("");
        const [userPassword, setUserPassword] = useState("");
        const redirect = useNavigate();
        const backendLink = useSelector((state)=>state.prod.link);
        const dispatch = useDispatch();
        //console.log(backendLink);

        const handleLogin = async(e)=>{
            e.preventDefault();

            try
            {
                const userData = { userEmail, userPassword }
                const response = await axios.post(`${backendLink}/api/user/login`, 
                    userData, {
                        withCredentials: true
                    }
                );

                redirect("/profile");
                
                if (response.data.success) {
                    dispatch(authActions.login());
                    toast.success(response.data.message || "Logged in successfully!");
                    // Optional: Redirect user or clear form inputs here
                } else {
                    // Handles cases where HTTP status is 200 but success is false
                    toast.error(response.data.message || "Log-in failed");
                }
            }
            catch(error)
            {
                // Extract custom message from backend response, falling back to Axios/Network error
                const errorMessage = 
                    error.response?.data?.message || 
                    error.message || 
                    "An unexpected error occurred";

                toast.error(errorMessage);
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
                                    Welcome Back
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
                                        onChange={(e)=>setUserEmail(e.target.value)}
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
                                        onChange={(e)=>setUserPassword(e.target.value)}
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
                            <div className="text-center mt-4">
                                <p className="text-muted mb-0">
                                    Already have an account?{" "}
                                    <Link className="text-decoration-none fw-semibold" to="/sign-up">
                                        Sign-Up
                                    </Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;