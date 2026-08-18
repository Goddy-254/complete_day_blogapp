import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {

    //check state  of the user
    const loggedIn = useSelector((state)=>state.auth.isLoggedIn);
   

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-3 text-info brand-logo" to="/">
                        DEvcOn
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center gap-3">
                            <li className="nav-item">
                                <Link 
                                    className="nav-link nav-hover active"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link 
                                    className="nav-link nav-hover active"
                                    to="/blogs"
                                >
                                    All Blogs
                                </Link>
                            </li>

                            {loggedIn && 
                            <li className="nav-item">
                                <Link 
                                    className="nav-link nav-hover active"
                                    to="/profile"
                                >
                                    Profile
                                </Link>
                            </li>}
                            {/* Hode this two if user if logged in */}
                            
                             { !loggedIn &&  <>
                                    <li className="nav-item">
                                        <Link
                                        className="btn btn-outline-info px-4 py-2 fw-semibold login-btn"
                                        to="/login"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                        className="btn btn-info text-dark px-4 py-2 fw-semibold signup-btn"
                                        to="/sign-up"
                                        >
                                            Sign-Up
                                        </Link>
                                    </li>
                                </>
                             }

                        </ul>
                    </div>
                </div>
            </nav>
            <style>
                {`
                    .nav-hover {
                        position: relative;
                        transition: 0.3s ease;
                    }

                    .nav-hover:hover {
                        color: #0dcaf0 !important;
                        transform: translateY(-2px);
                    }

                    .nav-hover::after {
                        content: '';
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 0%;
                        height: 2px;
                        background: #0dcaf0;
                        transition: 0.3s ease;
                    }

                    .nav-hover:hover::after {
                        width: 100%;
                    }

                    .brand-logo {
                        transition: 0.3s ease;
                    }

                    .brand-logo:hover {
                        color: #66e3ff !important;
                        transform: scale(1.05);
                    }

                    .login-btn {
                        transition: 0.3s ease;
                    }

                    .login-btn:hover {
                        background-color: #0dcaf0;
                        color: #000 !important;
                        transform: translateY(-2px);
                    }

                    .signup-btn {
                        transition: 0.3s ease;
                    }

                    .signup-btn:hover {
                        transform: translateY(-2px) scale(1.05);
                        box-shadow: 0 0 15px rgba(13, 202, 240, 0.5);
                    }
                `}
            </style>
        </div>
    );
}

export default Navbar;