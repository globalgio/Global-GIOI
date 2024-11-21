import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api", // Replace with your API base URL
  timeout: 10000, // Optional: set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or other custom logic here
    const token = localStorage.getItem("token"); // Replace this logic based on your auth implementation
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g., redirect to login if 401)
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Optionally redirect to the login page or perform other actions
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
