import {
    FaFacebookF,
    FaXTwitter,
    FaInstagram,
    FaGithub
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-3 mt-5 border-top border-secondary">
            <div className="container">

                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h2 className="text-info fw-bold">DEvcOn</h2>

                        <p className="text-secondary">
                            A modern platform for developers to share ideas,
                            write blogs, and connect with the tech community.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h5 className="text-white mb-3">Quick Links</h5>

                        <ul className="list-unstyled">
                            <li>
                                <Link className="footer-link" to="/">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link className="footer-link" to="/blogs">
                                    All Blogs
                                </Link>
                            </li>

                            <li>
                                <Link className="footer-link" to="/contact">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h5 className="text-white mb-3">Connect With Us</h5>

                        <div className="d-flex gap-3">

                            <a href="#" className="social-icon">
                                <FaFacebookF />
                            </a>

                            <a href="#" className="social-icon">
                                <FaXTwitter />
                            </a>

                            <a href="#" className="social-icon">
                                <FaInstagram />
                            </a>

                            <a href="#" className="social-icon">
                                <FaGithub />
                            </a>

                        </div>
                    </div>
                </div>
                <hr className="border-secondary" />

                <div className="text-center text-secondary">
                    <p className="mb-0">
                        © 2026 DEvcOn. All Rights Reserved.
                    </p>
                </div>
            </div>
            <style>
                {`
                    .footer-link {
                        color: #adb5bd;
                        text-decoration: none;
                        display: inline-block;
                        margin-bottom: 10px;
                        transition: 0.3s ease;
                    }

                    .footer-link:hover {
                        color: #0dcaf0;
                        transform: translateX(5px);
                    }

                    .social-icon {
                        width: 45px;
                        height: 45px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        background: #212529;
                        color: #0dcaf0;
                        font-size: 18px;
                        text-decoration: none;
                        transition: 0.3s ease;
                        border: 1px solid #343a40;
                    }

                    .social-icon:hover {
                        background: #0dcaf0;
                        color: #000;
                        transform: translateY(-4px) scale(1.1);
                        box-shadow: 0 0 12px rgba(13, 202, 240, 0.5);
                    }
                `}
            </style>
        </footer>
    );
}

export default Footer;