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

const Profile = () => {
  const [data, setData] = useState(null);
  const [rankings, setRankings] = useState(null);
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

        // Fetch both user data and rankings in parallel
        const [userResponse, rankingsResponse] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/gio-profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/get-rank`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

        setData(userResponse.data.user);
        setRankings(rankingsResponse.data.rankings);
      } catch (err) {
        console.error("Error fetching user data:", err);
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
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-[#2563EB]">{title}</h4>
      {ranking && ranking.rank !== "Unranked" ? (
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
        <p className="text-gray-600 mt-2">Give Live Test for Ranks!</p>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-6">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl mx-auto">
          {/* Profile Header */}
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
                  <div className="flex items-center gap-3">
                    <MdEmail className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">{data.email}</span>
                  </div>
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
                    <FaChalkboardTeacher className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">
                      Teacher: {data.teacherPhoneNumber}
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

            {/* Rankings Section */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Rankings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderRanking("Global Ranking", rankings?.global)}
                {renderRanking("Country Ranking", rankings?.country)}
                {renderRanking("State Ranking", rankings?.state)}
                {renderRanking("City Ranking", rankings?.city)}
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
                    Mock Test
                  </h4>
                  <p className="text-gray-600 mt-2">
                    Practice tests to prepare for the live exam.
                  </p>
                  <Link href="/gio-event/instructions">
                    <button className="bg-[#2563EB] text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600">
                      Start Mock Test
                    </button>
                  </Link>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-[#FF4D61]">
                    Live Test
                  </h4>
                  <p className="text-gray-600 mt-2">
                    Participate in the live test to rank globally.
                  </p>
                  <Link href="/gio-event/paid-instructions">
                    <button className="bg-[#FF4D61] text-white py-2 px-4 mt-4 rounded-md hover:bg-red-500">
                      Start Live Test
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
