import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.DEV
        ? "http://localhost:3000/api"    // development — direct to backend
        : "/api",                         // production — proxied through Netlify
    withCredentials: true, // for cookies
});

export default api;
