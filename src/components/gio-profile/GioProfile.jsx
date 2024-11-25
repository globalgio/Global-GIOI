"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import { FaEnvelope, FaPhone, FaSchool, FaTrophy } from "react-icons/fa"; // Importing icons

const SimpleForm = () => {
  const [data, setData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    number: "+1234567890",
    school: "Cool High School",
    std: "12th Grade",
    globalRank: "N/A",
    mockRank: "5",
    country: { label: "United States", value: "US" },
  });

  const [mockRank, setMockRank] = useState("5");
  const [globalRank, setGlobalRank] = useState("N/A");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    

    if (token) {
      // Fetch user profile from the backend
      axios
        .get(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/gio-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data && response.data.user) {
            const { user } = response.data;
            setData({
              name: user.name || "John Doe",
              email: user.email || "john.doe@example.com",
              number: user.number || "+1234567890",
              school: user.school || "Cool High School",
              std: user.std || "12th Grade",
              globalRank: user.globalRank || "N/A",
              mockRank: user.mockRank || "5",
              country: user.country || { label: "United States", value: "US" },
            });
            setGlobalRank(user.globalRank || "N/A");
            setMockRank(user.mockRank || "5");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <div className="container mt-10">
      <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg bg-gradient-to-b from-[#ebf8ff] via-white to-[#f5faff]">
        {/* Header Section */}
        <div className="h-52 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] flex justify-center items-center relative">
          <h2 className="absolute text-3xl sm:text-4xl text-white font-extrabold mb">
            Global Innovation Olympiad
          </h2>
        </div>

        {/* Profile Card */}
        <div className="relative -mt-20 bg-white rounded-lg shadow-md px-6 py-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {data.name}
            </h3>
            <p className="text-[#3B82F6] font-medium mt-2">Student</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-8 py-6">
          {/* Contact and Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Contact Information
              </h4>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 flex items-center">
                  <FaEnvelope className="mr-2" />
                  <strong>Email: </strong>
                  {data.email}
                </p>
                {data.country && (
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <ReactCountryFlag
                      countryCode={data.country.value}
                      svg
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                      }}
                      title={data.country.label}
                    />
                    {data.country.label}
                  </p>
                )}
                {data.number && (
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaPhone className="mr-2" />
                    <strong>Phone: </strong>
                    {data.number}
                  </p>
                )}
              </div>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Information
              </h4>
              <p className="text-sm text-gray-600 flex items-center">
                <FaSchool className="mr-2" />
                <strong>School: </strong>
                {data.school}
              </p>
            </div>
          </div>

          {/* Rankings Section */}
          <div className="space-y-8">
            <h4 className="text-lg font-semibold text-gray-800">Rankings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mock Rank */}
              <div className="text-center p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
                <h5 className="text-md font-semibold text-gray-800 mb-2">
                  <FaTrophy className="inline-block mr-1" />
                  GIO Mock Ranking
                </h5>
                <p className="text-sm text-gray-600">Mock Rank</p>
                <span className="block text-lg font-bold text-[#3B82F6] mt-2">
                  {isNaN(Number(mockRank)) ? mockRank : `#${mockRank}`}
                </span>
                <div className="mt-4">
                  <Link href="/gio-event/instructions">
                    <span className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg shadow hover:bg-[#2563EB] transition">
                      Mock Test
                    </span>
                  </Link>
                </div>
              </div>

              {/* Global Rank */}
              <div className="text-center p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
                <h5 className="text-md font-semibold text-gray-800 mb-2">
                  <FaTrophy className="inline-block mr-1" />
                  GIO Global Ranking
                </h5>
                <p className="text-sm text-gray-600">Global Rank</p>
                <span className="block text-lg font-bold text-[#3B82F6] mt-2">
                  {globalRank}
                </span>
                <div className="mt-4">
                  <Link href="/payment-gio">
                    <span className="px-4 py-2 border border-[#3B82F6] text-[#3B82F6] rounded-lg shadow hover:bg-[#3B82F6] hover:text-white transition">
                      Live Test
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleForm;
