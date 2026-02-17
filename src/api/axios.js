import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api", // devlopment URL
    // baseURL: "https://hireprep-ai-backend.onrender.com/api", // production URL
    withCredentials: true, // for cookies
});

export default api;
