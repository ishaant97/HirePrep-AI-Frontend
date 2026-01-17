import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Dashboard from "../components/Dashboard/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
// import ErrorPage from "../components/404Page/ErrorPage";
import Auth from "../components/Auth/Auth";

function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Auth />} />

            <Route path="/" element={<Navigate to="/dashboard" />} />
            {/* <Route path="/*" element={<ErrorPage />} /> */}

            <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/resume" element={<Resume />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/profile" element={<Profile />} /> */}
            </Route>
        </Routes>
    </BrowserRouter>
}

export default AppRouter;