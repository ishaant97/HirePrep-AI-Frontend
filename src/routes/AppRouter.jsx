import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Dashboard from "../components/Dashboard/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "../components/404/ErrorPage";
import Auth from "../components/Auth/Auth";
import ResumeUpload from "../components/ResumeUpload/ResumeUpload";
import Profile from "../components/Profile/Profile";

function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Auth />} />

            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/*" element={<ErrorPage />} />

            <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/resumeUpload" element={<ResumeUpload />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default AppRouter;