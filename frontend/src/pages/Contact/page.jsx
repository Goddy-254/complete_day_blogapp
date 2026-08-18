
const Contact = () => {
    return (
        <div className="container py-5">
            <div className="text-center mb-4">
                <h2 className="fw-bold">
                    Contact <span className="text-primary">Us</span>
                </h2>
                <p className="text-muted">
                    Want to leave us a message? Fill in the form below and we
                    will get back to you shortly.
                </p>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-lg rounded-4 p-4">
                        <form>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="John Doe"
                                />
                                <label htmlFor="name">
                                    Enter Your Name
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                />
                                <label htmlFor="email">
                                    Enter Your Email
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    placeholder="+254700000000"
                                />
                                <label htmlFor="phone">
                                    Enter Your Phone Number
                                </label>
                            </div>
                            <div className="form-floating mb-4">
                                <textarea
                                    className="form-control"
                                    placeholder="Leave your message here"
                                    id="message"
                                    style={{ height: "140px" }}
                                ></textarea>
                                <label htmlFor="message">
                                    Your Message
                                </label>
                            </div>
                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary btn-sm py-3 fw-semibold rounded-3"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;