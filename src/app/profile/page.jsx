"use client";
import { ImProfile } from "react-icons/im";
import { Country } from "country-state-city";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdSd } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import Navbar from "@/components/layouts/navbar/navbar";
import Footer from "@/components/layouts/footer/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FaAdjust,
  FaCannabis,
  FaPhoneAlt,
  FaWhatsapp,
  FaMedal,
  FaEdit,
  FaSignOutAlt,
  FaEye,
  FaEyeSlash,
  FaRegCopy,
  FaPlayCircle,
} from "react-icons/fa";
import { BiSolidUserAccount } from "react-icons/bi";
import { FaSchoolCircleCheck } from "react-icons/fa6";
import Link from "next/link";
import Notifications from "@/components/notification/Notifications";
import Cursor from "@/components/cursor/Cursor";
const getCountryCode = (countryName) => {
  const country = Country.getAllCountries().find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );
  return country ? country.isoCode : null;
};
const Profile = () => {
  const [data, setData] = useState(null);
  const [rankings, setRankings] = useState({
    mock: {
      global: { rank: "TBD", category: "Give Mock Test for Rankings" },
      country: { rank: "TBD", category: "Give Mock Test for Rankings" },
      state: { rank: "TBD", category: "Give Mock Test for Rankings" },
    },
    live: {
      global: { rank: "TBD", category: "Participate in Live Test" },
      country: { rank: "TBD", category: "Participate in Live Test" },
      state: { rank: "TBD", category: "Participate in Live Test" },
    },
  });
  // Inside your component
  const [showPassword, setShowPassword] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [testCounts, setTestCounts] = useState({ mock: 0, live: 0 });
  const [certificateCodes, setCertificateCodes] = useState([]); // Added for certificates
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editData, setEditData] = useState({});
  const router = useRouter();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/gio-profile");
          return;
        }

        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/gio-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(userResponse.data.user);
        setCertificateCodes(
          userResponse.data.user?.certificateCodes?.code || []
        ); // Set certificates

        const fetchAdditionalData = async () => {
          try {
            const [
              mockRankingsResponse,
              liveRankingsResponse,
              testCountsResponse,
              userProfileResponse, // Fetch user profile again for real-time certificate code
            ] = await Promise.all([
              axios.get(
                `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/get-rank?type=mock`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              ),
              axios.get(
                `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/get-rank?type=live`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              ),
              axios.get(
                `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/get-test-counts`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              ),
              axios.get(
                `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/gio-profile`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              ),
            ]);

            // Update rankings
            setRankings({
              mock: mockRankingsResponse.data.rankings || rankings.mock,
              live: liveRankingsResponse.data.rankings || rankings.live,
            });

            // Update test counts
            setTestCounts(testCountsResponse.data || testCounts);

            // Update certificate codes in real-time
            setCertificateCodes(
              userProfileResponse.data.user?.certificateCodes?.code || []
            );
          } catch (err) {
            console.error("Error fetching additional data:", err);
          }
        };

        fetchAdditionalData();
        const intervalId = setInterval(fetchAdditionalData, 500); // Fetch updates every 10 seconds
        return () => clearInterval(intervalId); // Cleanup
      } catch (err) {
        console.error("Error fetching data:", err);
        router.push("/gio-profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  // When edit modal is opened, pre-fill the form with existing data
  const openEditModal = () => {
    setEditData({
      uid: data.uid, // Include uid
      name: data.name,
      username: data.username,
      PhoneNumber: data.PhoneNumber,
      teacherPhoneNumber: data.teacherPhoneNumber,
      whatsappNumber: data.whatsappNumber,
      standard: data.standard,
      schoolName: data.schoolName,
      country: data.country,
      state: data.state,
      city: data.city,
      password: "", // New field
      confirmPassword: "", // New field
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to update your profile.");
        return;
      }

      // Ensure `uid` and all necessary fields are present
      const requestBody = {
        uid: editData.uid, // Make sure the `uid` is included
        ...editData, // Include other editable fields like name, username, etc.
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/update-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }

      const updatedData = await response.json();

      setData(updatedData.user);
      setIsEditModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error(
        "There was an error updating your profile. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const renderRanking = (title, ranking) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h4 className="text-lg font-semibold text-[#2563EB]">{title}</h4>
      {ranking && ranking.rank !== "TBD" ? (
        <div className="flex items-center gap-3 mt-4">
          <FaMedal
            className={`text-3xl ${
              ranking.category === "Gold"
                ? "text-yellow-500"
                : ranking.category === "Silver"
                ? "text-gray-400"
                : ranking.category === "Bronze"
                ? "text-orange-400"
                : "text-gray-500"
            }`}
          />
          <div>
            <p className="text-gray-700">
              <strong>Rank:</strong> {ranking.rank}
            </p>
            <p className="text-gray-700">
              <strong>Category:</strong> {ranking.category}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 mt-2">{ranking.category}</p>
      )}
    </div>
  );
  const validateForm = () => {
    const errors = [];
    if (!editData.name) errors.push("Name is required.");
    if (!/^[0-9]{10}$/.test(editData.PhoneNumber))
      errors.push("Enter a valid 10-digit phone number.");
    if (!editData.password) errors.push("Password is required.");
    if (editData.password !== editData.confirmPassword)
      errors.push("Passwords do not match.");
    if (!editData.standard) errors.push("Standard is required.");

    if (errors.length > 0) {
      console.log("Validation Errors:", errors);
      return false;
    }
    return true;
  };

  return (
    <>
      <Cursor />
      <Navbar />
      <div className="container mx-auto mt-8 px-6">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-[#2563EB] py-6 px-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Global Innovator Olympiad
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text-lg mt-2 font-bold flex items-center uppercase">
                    {data.name}
                    {data.country && (
                      <span className="hidden md:inline">
                        <ReactCountryFlag
                          countryCode={getCountryCode(data.country)}
                          svg
                          style={{
                            width: "1.5em",
                            height: "1.5em",
                            marginLeft: "0.5em",
                          }}
                          title={data.country}
                        />
                      </span>
                    )}
                  </p>
                </div>
                <p className="text-lg mt-2">Student</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Edit Button */}
                    <button
                      onClick={openEditModal}
                      className="bg-yellow-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 flex items-center justify-center w-full sm:w-auto"
                    >
                      <FaEdit className="mr-2 text-lg" />
                      <span className="font-semibold">Edit</span>
                    </button>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        router.push("/gio-profile");
                      }}
                      className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center w-full sm:w-auto"
                    >
                      <FaSignOutAlt className="mr-2 text-lg" />
                      <span className="font-semibold">Logout</span>
                    </button>

                    {/* Watch Overview Button */}
                    <a
                      href="https://www.youtube.com/watch?v=OM7GglxMnJM" // Replace with your video link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-900 transition duration-300 flex items-center justify-center w-full sm:w-auto"
                    >
                      <FaPlayCircle className="mr-2 text-lg" />
                      <span className="font-semibold">Watch Overview</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
              <div className="bg-white rounded-lg w-full max-w-2xl p-4 sm:p-6 shadow-lg relative overflow-auto max-h-screen">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
                  Edit Profile
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateProfile();
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Render Editable Fields */}
                    {[
                      "name",
                      "username",
                      "PhoneNumber",
                      "teacherPhoneNumber",
                      "whatsappNumber",
                      "standard",
                      "schoolName",
                      "country",
                      "state",
                      "city",
                    ].map((field) => (
                      <div key={field}>
                        <label className="block text-gray-700 font-semibold mb-1">
                          {field.charAt(0).toUpperCase() +
                            field.slice(1).replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="text"
                          value={editData[field] || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              [field]: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Password Field */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={editData.password || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, password: e.target.value })
                        }
                        className="w-full p-2 border rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-800"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={editData.confirmPassword || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-800"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 gap-4">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Main Content */}
          <div className="p-6 space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {data.country && (
                    <div className="flex items-center gap-3">
                      <ReactCountryFlag
                        countryCode={getCountryCode(data.country)}
                        svg
                        style={{ width: "1.5em", height: "1.5em" }}
                        title={data.country}
                      />
                      <span className="text-sm text-gray-600">
                        {data.country}
                      </span>
                    </div>
                  )}
                  {data.PhoneNumber && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #2563EB, #2563EB)",
                          }}
                        >
                          <FaPhoneAlt className="text-white text-sm" />
                        </div>
                        <span className="text-sm text-gray-600">
                          {data.PhoneNumber}
                        </span>
                      </div>
                    </div>
                  )}
                  {data.whatsappNumber && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #25D366, #128C7E)",
                          }}
                        >
                          <FaWhatsapp className="text-white" />
                        </div>
                        <span className="text-sm text-gray-600">
                          {data.whatsappNumber}
                        </span>
                      </div>
                    </div>
                  )}
                  {data.teacherPhoneNumber && (
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #2563EB, #2563EB)",
                        }}
                      >
                        <BiSolidUserAccount className="text-white text-sm" />
                      </div>
                      <span className="text-sm text-gray-600">
                        Teacher: {data.teacherPhoneNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <ImProfile className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">
                      {data.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaSchoolCircleCheck className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600 uppercase">
                      {data.schoolName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdSd className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">
                      Standard: {data.standard}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaAdjust className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">
                      State: {data.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCannabis className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">
                      City: {data.city}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Certificate Codes */}
            <div className="text-sm text-gray-600 mt-4 bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md shadow-md transition-transform transform hover:scale-105">
              <span className="font-semibold text-blue-600">
                ✨ Final Test Certificate Credential ID:
              </span>
              {certificateCodes && certificateCodes.length > 0 ? (
                <div className="text-gray-800 text-sm mt-2 flex items-center gap-2 relative">
                  <span>Your Certificate Credential ID:</span>
                  <span className="font-semibold">{certificateCodes}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(certificateCodes);
                      setTooltipVisible(true);
                      setTimeout(() => setTooltipVisible(false), 2000); // Tooltip visible for 2 seconds
                    }}
                    className="text-blue-600 hover:text-blue-800 flex items-center relative"
                    title="Copy to clipboard"
                  >
                    <FaRegCopy className="ml-2" size={18} />
                  </button>
                  {/* Tooltip */}
                  {tooltipVisible && (
                    <span className="absolute right-0 bg-blue-600 text-white text-xs py-1 px-2 rounded-md shadow-lg">
                      Copied!
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-gray-500 text-sm mt-2">
                  No Certificate Credential ID available yet.
                </div>
              )}
            </div>

            {/* Test Counts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* Mock Test Count */}
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  🎯 Practice Test Count
                </h4>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl">📘</span>
                    <p className="mt-2 text-sm font-medium">Learn & Practice</p>
                  </div>
                  <p className="text-5xl font-extrabold">{testCounts.mock}</p>
                </div>
                <p className="text-sm mt-4 italic">
                  "The more you practice, the better you'll shine!"
                </p>
              </div>

              {/* Live Test Count */}
              <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  🚀 Final Test Count
                </h4>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex flex-col items-center">
                    <span className="text-7xl">🌍</span>
                    <p className="mt-2 text-sm font-medium">Compete Globally</p>
                  </div>
                  <p className="text-5xl font-extrabold">{testCounts.live}</p>
                </div>
                <p className="text-sm mt-4 italic">
                  "Take on the world and showcase your talent!"
                </p>
              </div>
            </div>

            {/* Rankings Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* Mock Test Rankings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Practice Test Rankings
                </h3>
                <div className="space-y-4">
                  {renderRanking(
                    "Global  Practice Ranking",
                    rankings.mock.global
                  )}
                  {renderRanking(
                    "Country  Practice Ranking",
                    rankings.mock.country
                  )}
                  {renderRanking(
                    "State  Practice Ranking",
                    rankings.mock.state
                  )}
                </div>
              </div>

              {/* Live Test Rankings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Final Test Rankings
                </h3>
                <div className="space-y-4">
                  {renderRanking("Global Final Ranking", rankings.live.global)}
                  {renderRanking(
                    "Country Final Ranking",
                    rankings.live.country
                  )}
                  {renderRanking("State Final Ranking", rankings.live.state)}
                </div>
              </div>
            </div>

            {/* Test Section */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tests
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-[#2563EB]">
                    Practice Test
                  </h4>
                  <p className="text-gray-600 mt-2">
                    Sharpen your skills with practice tests for live exam
                    success!
                  </p>
                  <Link href="/gio-event/instructions">
                    <button className="bg-[#2563EB] text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600">
                      Start Practice Test
                    </button>
                  </Link>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-[#FF4D61]">
                    Final Test
                  </h4>
                  <p className="text-gray-600 mt-2">
                    Join the Final Test to rank globally and earn your
                    certificate!
                  </p>
                  <Link href="/gio-event/paid-instructions">
                    <button className="bg-[#FF4D61] text-white py-2 px-4 mt-4 rounded-md hover:bg-red-500">
                      Start Final Test
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Notification Section */}
      <Notifications />
      <Footer />
    </>
  );
};

export default Profile;
