"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdEmail, MdPhone, MdSchool } from "react-icons/md"; // Importing icons from react-icons
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";
import Navbar from "@/components/layouts/navbar/navbar";
import Footer from "@/components/layouts/footer/footer";

const Profile = () => {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/gio-profile"); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/auth/gio-profile`, // Ensure the correct endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`, // Passing the token for authorization
            },
          }
        );
        setData(response.data.user); // Set user data in state
      } catch (err) {
        console.error("Error fetching user data:", err);
        router.push("/gio-profile"); // Redirect to login on error
      }
    };

    fetchUserProfile();
  }, [router]);

  // If the data isn't available, show loading state
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-6">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl mx-auto">
          <div className="relative pb-0 -mt-24">
            <div className="absolute -top-24 left-6 right-6 px-6 py-4 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl sm:text-3xl text-gray-800">
                {data.name}
              </h3>
              <p className="text-[#3B81F5] font-medium mt-1">Student</p>
            </div>
          </div>

          <div className="space-y-6 pt-28 px-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Contact Information
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <MdEmail className="w-5 h-5 text-[#3B81F5]" />
                  <span className="text-sm text-gray-600">
                    {data.email || "N/A"}
                  </span>
                </div>

                {data.country && (
                  <div className="flex items-center gap-3">
                    <ReactCountryFlag
                      countryCode={data.country}
                      svg
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                      }}
                      title={data.country}
                    />
                    <span className="text-sm text-gray-600">
                      {data.country || "N/A"}
                    </span>
                  </div>
                )}

                {data.PhoneNumber && (
                  <div className="flex items-center gap-3">
                    <MdPhone className="w-5 h-5 text-[#3B81F5]" />
                    <span className="text-sm text-gray-600">
                      {data.PhoneNumber || "N/A"}
                    </span>
                  </div>
                )}

                {data.whatsappNumber && (
                  <div className="flex items-center gap-3">
                    <MdPhone className="w-5 h-5 text-[#3B81F5]" />
                    <span className="text-sm text-gray-600">
                      {data.whatsappNumber || "N/A"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Personal Information
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <MdSchool className="w-5 h-5 text-[#3B81F5]" />
                  <span className="text-sm text-gray-600">
                    {data.schoolName || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Standard: {data.standard || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Teacher Phone Number: {data.teacherPhoneNumber || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    State: {data.state || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    City: {data.city || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="my-6 text-center">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/gio-profile"); // Redirect to login page after logout
                }}
                className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            </div>

            <div className="text-center mt-8 text-gray-600 text-sm">
              <marquee>
              Our website is currently under maintenance and will be back shortly. Thank you for your patience.
              </marquee>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default Profile;
