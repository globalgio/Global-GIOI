"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdEmail, MdPhone, MdSchool, MdSd } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import Navbar from "@/components/layouts/navbar/navbar";
import Footer from "@/components/layouts/footer/footer";
import {
  FaAdjust,
  FaCannabis,
  FaChalkboardTeacher,
  FaPhoneAlt,
  FaWhatsapp,
  FaMedal,
} from "react-icons/fa";
import Link from "next/link";
import Notifications from "@/components/notification/Notifications";
import Cursor from "@/components/cursor/Cursor";

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
  const [testCounts, setTestCounts] = useState({ mock: 0, live: 0 });
  const [loading, setLoading] = useState(true);
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

        const fetchAdditionalData = async () => {
          try {
            const [
              mockRankingsResponse,
              liveRankingsResponse,
              testCountsResponse,
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
            ]);

            setRankings({
              mock: mockRankingsResponse.data.rankings || rankings.mock,
              live: liveRankingsResponse.data.rankings || rankings.live,
            });

            setTestCounts(testCountsResponse.data || testCounts);
          } catch (err) {
            console.error("Error fetching additional data:", err);
          }
        };

        fetchAdditionalData();
        const intervalId = setInterval(fetchAdditionalData, 10000);
        return () => clearInterval(intervalId);
      } catch (err) {
        console.error("Error fetching data:", err);
        router.push("/gio-profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

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

  return (
    <>
      <Cursor />
      <Navbar />
      <div className="container mx-auto mt-8 px-6">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-[#2563EB] py-6 px-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Global Innovator Olympiad
                </h1>
                <p className="text-lg mt-2 font-bold">{data.name}</p>
                <p className="text-lg mt-2">Student</p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/gio-profile");
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

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
                        countryCode={data.country}
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
                      <FaPhoneAlt className="w-5 h-5 text-[#2563EB]" />
                      <span className="text-sm text-gray-600">
                        {data.PhoneNumber}
                      </span>
                    </div>
                  )}
                  {data.whatsappNumber && (
                    <div className="flex items-center gap-3">
                      <FaWhatsapp className="w-5 h-5 text-[#2563EB]" />
                      <span className="text-sm text-gray-600">
                        {data.whatsappNumber}
                      </span>
                    </div>
                  )}
                  {data.teacherPhoneNumber && (
                    <div className="flex items-center gap-3">
                      <FaChalkboardTeacher className="w-5 h-5 text-[#2563EB]" />
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
                    <MdSchool className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">
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
                  🚀 Live Test Count
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
                  {renderRanking("Global  Practice Ranking", rankings.mock.global)}
                  {renderRanking("Country  Practice Ranking", rankings.mock.country)}
                  {renderRanking("State  Practice Ranking", rankings.mock.state)}
                </div>
              </div>

              {/* Live Test Rankings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Final Test Rankings
                </h3>
                <div className="space-y-4">
                  {renderRanking("Global Final Ranking", rankings.live.global)}
                  {renderRanking("Country Final Ranking", rankings.live.country)}
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
                    Practice tests to prepare for the live exam.
                  </p>
                  <Link href="/gio-event/instructions">
                    <button className="bg-[#2563EB] text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600">
                      Start  Practice Test
                    </button>
                  </Link>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-[#FF4D61]">
                    Final Test
                  </h4>
                  <p className="text-gray-600 mt-2">
                    Participate in the Final test to rank globally.
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
