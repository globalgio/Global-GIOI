"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast and container
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      console.log(
        "Sending request to:",
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/auth/register`
      );
      console.log("Request body:", { email, password });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/auth/register`,
        { email, password },
        { withCredentials: true } 
      );

      // Handle successful signup
      const { token } = response.data; // Extract token from response
      localStorage.setItem("token", token); // Save token in localStorage
      toast.success("Signup successful!"); // Show success toast
      console.log("Signup successful:", response.data);

      // Redirect to the main page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error response:", error.response);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      ); // Show error toast
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />{" "}
      {/* Toast container */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-[#6068F1] mb-6">Sign Up</h1>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-[#6068F1] focus:border-[#6068F1] sm:text-sm placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-[#6068F1] focus:border-[#6068F1] sm:text-sm placeholder-gray-400"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#6068F1] text-white font-medium rounded-md hover:bg-[#4d5cd9] focus:outline-none focus:ring-2 focus:ring-[#6068F1] focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600 text-center">
          <Link href="/auth/login" className="text-[#6068F1] hover:underline">
            Login here
          </Link>{" "}
          if you already have an account.
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
