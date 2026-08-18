const Help = () => {
    return (
        <div className="container py-5">

            <h2 className="fw-bold mb-4">
                Help & Support
            </h2>

            <div className="card border-0 shadow-sm p-4 mb-4">

                <h5 className="fw-semibold mb-3">
                    Frequently Asked Questions
                </h5>

                <div className="mb-3">
                    <h6 className="fw-bold">
                        How do I read a blog?
                    </h6>

                    <p className="text-muted mb-0">
                        Simply click on any blog card or "Read More"
                        button to view the full article.
                    </p>
                </div>

                <div className="mb-3">
                    <h6 className="fw-bold">
                        Can I save blogs for later?
                    </h6>

                    <p className="text-muted mb-0">
                        Yes, you can use the favourite feature
                        (if available) to bookmark blogs you like.
                    </p>
                </div>

                <div className="mb-3">
                    <h6 className="fw-bold">
                        How do I manage my account?
                    </h6>

                    <p className="text-muted mb-0">
                        Go to the "Manage Account" section from your
                        dashboard to update your profile details.
                    </p>
                </div>

                <div>
                    <h6 className="fw-bold">
                        I can’t access a blog. What should I do?
                    </h6>

                    <p className="text-muted mb-0">
                        Refresh the page or check your internet connection.
                        If the issue persists, contact support.
                    </p>
                </div>

            </div>

            <div className="card border-0 shadow-sm p-4 mb-4">

                <h5 className="fw-semibold mb-3">
                    Contact Support
                </h5>
                <form>

                    <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter subject"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Describe your issue..."
                        ></textarea>
                    </div>

                    <button className="btn btn-primary">
                        Send Message
                    </button>

                </form>
            </div>

        </div>
    );
}

export default Help;