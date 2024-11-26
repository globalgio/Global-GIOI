"use client";

import { useState, useEffect } from "react"; // Added useEffect import
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { ToastContainer, toast } from "react-toastify"; // Import Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const PaymentPage = () => {
  const router = useRouter(); // Initialize the router
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State to store errors

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay SDK loaded successfully");
    script.onerror = () => console.error("Failed to load Razorpay SDK");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not logged in.");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/gio-profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile.");
        }

        const data = await response.json();
        setUserProfile(data.user); // Store user profile data
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle payment
  const handlePayment = async () => {
    if (!userProfile) {
      toast.error("User data is missing. Please reload the page.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/payment/create-order`,
        {
          amount: 250, // Payment amount in INR
        }
      );

      const { orderId, amount, currency } = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Global Innovator Olympiad",
        description: "Secure Payment",
        order_id: orderId,
        handler: async function (response) {
          toast.success("Payment Successful!");
          try {
            // Update the user's payment status
            const token = localStorage.getItem("token");
            await axios.patch(
              `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/update-payment-status`,
              { paymentStatus: "paid_but_not_attempted" },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            router.push("/gio-event/paid-quiz"); // Redirect to the quiz
          } catch (error) {
            console.error("Error updating payment status:", error);
            toast.error("Failed to update payment status. Please try again.");
          }
        },
        prefill: {
          name: userProfile.name,
          email: userProfile.email,
          contact: userProfile.contact || "9999999999",
        },
        theme: { color: "#2563eb" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (!userProfile) {
    return <p className="text-center text-gray-500">Loading user details...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E3F2FD] to-white">
      <ToastContainer position="top-right" autoClose={3000} />{" "}
      {/* Toast container */}
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/GIOLOGO.png"
            alt="Global Innovator Olympiad Logo"
            className="h-20"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-[#2563eb] mb-6 tracking-wide">
          Global Innovator Olympiad
        </h1>

        {/* Description */}
        <p className="text-center text-gray-500 mb-8 leading-relaxed">
          Secure your spot for the test! Your payment is secure and protected.
          We use advanced encryption and data safety measures to ensure your
          privacy.
        </p>

        {/* Amount */}
        <div className="flex items-center justify-between border border-gray-200 rounded-md p-5 bg-gray-50 shadow-sm mb-6">
          <span className="text-gray-700 text-lg font-medium">
            Amount (INR):
          </span>
          <span className="text-2xl font-bold text-[#2563eb]">₹250.00</span>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-full bg-[#2563eb] text-white font-bold text-xl shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:ring focus:ring-blue-200 focus:ring-offset-2 ${
            loading ? "bg-gray-400 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Pay ₹250 Now"}
        </button>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-400 mt-6">
          By proceeding, you agree to our{" "}
          <a
            href="/terms-conditions"
            className="text-[#2563eb] underline hover:text-blue-600"
          >
            Terms & Conditions
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
