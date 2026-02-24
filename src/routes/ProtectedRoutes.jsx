import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader/Loader";

function ProtectedRoutes() {
    // const isLoggedIn = false;
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loader message="Verifying your session..." />
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;