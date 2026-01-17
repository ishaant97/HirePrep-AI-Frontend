import { Navigate, Outlet } from "react-router";


function ProtectedRoutes() {
    const isLoggedIn = false;
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;