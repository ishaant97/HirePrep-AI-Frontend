import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Restore login on page refresh
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get("/auth/me");
                setUser(res.data.user);
                setIsAuthenticated(true);
            } catch (err) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Login function
    const login = async (formData) => {
        const res = await api.post("/auth/login", formData);
        // const res = await api.get("/auth/me");
        setUser(res.data.user);
        setIsAuthenticated(true);
    };

    // Signup function
    const signup = async (formData) => {
        const res = await api.post("/auth/register", formData);
        // const res = await api.get("/auth/me");
        setUser(res.data.user);
        setIsAuthenticated(true);
    };

    // Logout function
    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, loading, login, signup, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);