"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdEmail, MdPhone, MdSchool, MdSd } from "react-icons/md"; // Importing icons from react-icons
import ReactCountryFlag from "react-country-flag";
import Navbar from "@/components/layouts/navbar/navbar";
import Footer from "@/components/layouts/footer/footer";
import {
  FaAdjust,
  FaCannabis,
  FaChalkboardTeacher,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";

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
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/gio-profile`, // Ensure the correct endpoint
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
          <div className="bg-[#2563EB] py-6 px-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Global Innovation Olympiad
                </h1>
                <p className="text-lg mt-2 font-bold">{data.name}</p>
                <p className="text-lg mt-2">Student</p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/gio-profile"); // Redirect to login page after logout
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Contact and Personal Information Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MdEmail className="w-5 h-5 text-[#2563EB]" />
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
                      <FaPhoneAlt className="w-5 h-5 text-[#2563EB]" />
                      <span className="text-sm text-gray-600">
                        {data.PhoneNumber || "N/A"}
                      </span>
                    </div>
                  )}

                  {data.whatsappNumber && (
                    <div className="flex items-center gap-3">
                      <FaWhatsapp className="w-5 h-5 text-[#2563EB]" />
                      <span className="text-sm text-gray-600">
                        {data.whatsappNumber || "N/A"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MdSchool className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">
                      {data.schoolName || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdSd className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">
                      Standard: {data.standard || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaChalkboardTeacher className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">
                      Teacher: {data.teacherPhoneNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaAdjust className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">
                      State: {data.state || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCannabis className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">
                      City: {data.city || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rankings Section */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Rankings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-[#2563EB]">
                    GIO Mock Ranking
                  </h4>
                  <p className="text-gray-600 mt-2">
                    <strong>Not Available</strong>
                  </p>
                  <Link href="/gio-event/instructions">
                    <button className="bg-[#2563EB] text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600">
                      Mock Test
                    </button>
                  </Link>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-[#2563EB]">
                    GIO Global Ranking
                  </h4>
                  <p className="text-gray-600 mt-2">Not Available</p>
                  <Link href="/gio-event/paid-instructions">
                    <button className="bg-[#FF4D61] text-white py-2 px-4 mt-4 rounded-md hover:bg-red-500">
                      Live Test
                    </button>
                  </Link>
                </div>
              </div>
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
