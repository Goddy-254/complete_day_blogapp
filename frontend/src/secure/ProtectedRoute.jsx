import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {

    const { isLoggedIn, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            toast.warning("Oops, You have to Login!");
        }
    }, [loading, isLoggedIn]);

    // Wait until authentication has been checked
    if (loading) {
        return (
            <div className="text-center mt-5">
                <h5>Checking authentication...</h5>
            </div>
        );
    } 

    // Redirect only after loading is complete
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;