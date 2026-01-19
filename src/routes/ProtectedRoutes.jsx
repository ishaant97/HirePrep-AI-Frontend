import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoutes() {
    // const isLoggedIn = false;
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;