"use client";

import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance"; // Adjust the path based on your project structure
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = { email, password };

      const response = await axiosInstance.post("/user/login", loginData);

      if (response.data.success) {
        alert("Login successful!");
      } else {
        setErrorMessage(response.data.message || "Login failed!");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Welcome Header */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          WELCOME BACK!
        </h1>
        <p className="text-center text-gray-600">
          Registration Process{" "}
          <a
            href="https://www.youtube.com/watch?v=your-video-link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:underline"
          >
            video
          </a>
        </p>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold text-lg px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Additional Links */}
        <div className="text-center mt-6">
          <Link
            href="/resend-verification"
            className="text-blue-600 hover:underline font-semibold"
          >
            Resend Email Verification
          </Link>
        </div>
        <div className="text-center mt-4">
          <Link
            href="/registration"
            className="text-blue-600 hover:underline font-bold"
          >
            Create a new account
          </Link>{" "}
          |{" "}
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline font-bold"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
