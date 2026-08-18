const Header = () => {
    return (
        <div
            className="d-flex align-items-center px-3 px-md-5 py-5 hero-bg"
        >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">

                        <h1 className="fw-bold mb-3 text-white">
                            Welcome to DEvcOn
                        </h1>

                        <p className="lead text-light opacity-75">
                            Discover developer blogs, tutorials, and insights to help you grow your skills.
                        </p>

                        <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-4">
                            <a href="/blogs" className="btn btn-info text-dark fw-semibold px-4">
                                Explore Blogs
                            </a>

                            <a href="/sign-up" className="btn btn-outline-light px-4">
                                Get Started
                            </a>
                        </div>

                    </div>

                </div>
            </div>
            <style>
                {`
                    .hero-bg {
                        min-height: 50vh;
                        background-image: url("./Header.jpg");
                        background-size: cover;
                        background-position: center;
                        position: relative;
                    }

                    .hero-bg::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.6);
                    }

                    .hero-bg > .container {
                        position: relative;
                        z-index: 2;
                    }
                `}
            </style>
        </div>
    );
};

export default Header;