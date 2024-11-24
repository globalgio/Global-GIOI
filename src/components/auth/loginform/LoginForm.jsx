"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      // Send login request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/auth/login`,
        { email, password },
        { withCredentials: true } // Include cookies
      );

      // Successful login
      console.log("Login successful:", response.data);

      // Redirect to the main page
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-[#6068F1] mb-6">Login</h1>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6068F1] focus:border-[#6068F1] sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6068F1] focus:border-[#6068F1] sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#6068F1] text-white font-medium rounded-md hover:bg-[#4d5cd9] focus:outline-none focus:ring-2 focus:ring-[#6068F1] focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600 text-center">
          <Link href="/auth/signup" className="text-[#6068F1] hover:underline">
            Sign up here
          </Link>{" "}
          if you don't have an account.
        </div>
        <div className="mt-2 text-sm text-center">
          <Link
            href="/auth/forgot-password"
            className="text-gray-600 hover:text-[#6068F1] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
