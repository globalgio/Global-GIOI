// src/components/coordinatorDashboard/CoordinatorDashboardSection.jsx

"use client";
import { useRouter } from "next/navigation";
import { FaUserGraduate, FaClipboardList, FaBullseye } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { IoMdCheckmark, IoMdPeople, IoMdStar, IoMdCash } from "react-icons/io";
import { FaMedal, FaSignOutAlt, FaTrophy } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactCountryFlag from "react-country-flag";

// Import ProfileOverviewSection
import ProfileOverviewSection from "./ProfileOverviewSection"; // Adjust the path as necessary

// ==============================
// Custom Hook for Authenticated API Calls
// ==============================
const useAuthApi = () => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("coordinatorToken")
      : null;

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOSTNAME, // Ensure this is set correctly
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return api;
};

// ==============================
// CoordinatorDashboardSection Component
// ==============================
const CoordinatorDashboardSection = ({ userData, students }) => {
  // ==========================
  // State Variables
  // ==========================
  const [category, setCategory] = useState("");
  const [totalIncentives, setTotalIncentives] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [rank, setRank] = useState(null);
  const [totalCoordinators, setTotalCoordinators] = useState(0);
  const [nextRank, setNextRank] = useState("");
  const [rankProgress, setRankProgress] = useState(0);
  const [loadingIncentives, setLoadingIncentives] = useState(false);
  const [loadingRank, setLoadingRank] = useState(false);
  const [error, setError] = useState("");

  // Additional State Variables
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState("");

  const [achievements, setAchievements] = useState([]);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  const [achievementsError, setAchievementsError] = useState("");

  // State for Modal Visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for updating user details from modal
  const [updatedUserData, setUpdatedUserData] = useState(userData);

  // State Variable for Tips Section Visibility
  const [showTips, setShowTips] = useState(false);

  const tipsRef = useRef(null); // Ref for smooth scrolling to tips section

  // ==========================
  // Practice Test Counts State
  // ==========================
  const [practiceTestCounts, setPracticeTestCounts] = useState({
    totalPracticeTests: 0,
    finalPracticeTests: 0,
  });

  const router = useRouter();

  // ==========================
  // Tips for Improvement
  // ==========================
  const improvementTips = [
    "Engage with more students to increase your practice test counts.",
    "Attend our monthly webinars to learn effective coordination strategies.",
    "Refer new coordinators to earn additional incentives.",
    "Set daily or weekly goals to stay on track with your progress.",
    "Utilize available resources and support to enhance your performance.",
  ];

  // ==========================
  // Custom Hook for Authenticated API Calls
  // ==============================
  const api = useAuthApi();

  // ==========================
  // Data Fetching Functions
  // ==========================
  // Function to Fetch Incentives
  const fetchIncentives = async () => {
    setLoadingIncentives(true);
    setError("");
    try {
      const response = await api.post(
        "/api/coordinator/calculate-incentives",
        {}
      );
      const data = response.data.data;

      // Log the data to verify the response
      console.log("Incentives Data:", data);

      setCategory(data.category);
      setTotalIncentives(data.baseIncentive); // Corrected property name
      setBonusAmount(data.bonusAmount);
      setTotalEarnings(data.totalEarnings);
    } catch (err) {
      console.error("Error fetching incentives:", err);
      setError("Failed to calculate incentives.");
      toast.error("Failed to calculate incentives.");
    } finally {
      setLoadingIncentives(false);
    }
  };

  // Function to Fetch Rank
  const fetchRank = async () => {
    setLoadingRank(true);
    setError("");
    try {
      const response = await api.get("/api/coordinator/rank");
      const data = response.data.data;
      setRank(data.rank);
      setTotalCoordinators(data.totalCoordinators);

      // Calculate the next rank and progress
      setNextRank("N/A"); // Adjust based on your backend response
      setRankProgress(
        data.totalCoordinators
          ? ((data.rank / data.totalCoordinators) * 100).toFixed(2)
          : 0
      );
    } catch (err) {
      console.error("Error fetching rank:", err);
      setError("Failed to fetch rank.");
      toast.error("Failed to fetch rank.");
    } finally {
      setLoadingRank(false);
    }
  };

  // Function to Fetch Leaderboard
  const fetchLeaderboard = async () => {
    setLoadingLeaderboard(true);
    setLeaderboardError("");
    try {
      const response = await api.get("/api/coordinator/leaderboard");
      setLeaderboard(response.data.leaderboard);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setLeaderboardError("Failed to fetch leaderboard.");
      toast.error("Failed to fetch leaderboard.");
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  // Function to Fetch Achievements
  const fetchAchievements = async () => {
    setLoadingAchievements(true);
    setAchievementsError("");
    try {
      const response = await api.get("/api/coordinator/achievements");
      setAchievements(response.data.achievements);
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setAchievementsError("Failed to fetch achievements.");
      toast.error("Failed to fetch achievements.");
    } finally {
      setLoadingAchievements(false);
    }
  };

  // Function to Fetch Practice Test Counts
  const fetchPracticeTestCounts = async () => {
    try {
      const response = await api.get("/api/coordinator/test-counts");
      const data = response.data;
      setPracticeTestCounts({
        totalPracticeTests: data.totalPracticeTests,
        finalPracticeTests: data.finalPracticeTests,
      });
    } catch (err) {
      console.error("Error fetching practice test counts:", err);
      toast.error("Failed to fetch practice test counts.");
    }
  };

  // ==========================
  // Helper Functions
  // ==========================
  // Function to Generate Motivational Message
  const getMotivationalMessage = () => {
    if (!rank || !totalCoordinators) return "Keep up the great work!";

    const progress = rank / totalCoordinators;

    if (progress <= 0.2) {
      return "You're off to a great start! Keep pushing to climb the ranks.";
    } else if (progress <= 0.5) {
      return "Good job! You're halfway there. Stay focused to reach the top!";
    } else if (progress <= 0.8) {
      return "Fantastic! You're among the top performers. Keep up the momentum!";
    } else {
      return "Excellent work! You're at the pinnacle of performance. Maintain your lead!";
    }
  };

  // Function to Generate Share Message
  const generateShareMessage = (achievement) => {
    return `I just earned the "${achievement.name}" badge on Coordinator Dashboard! Excited to reach new heights! #Achievement #Motivation`;
  };

  // Function to Handle "Learn How to Improve" Button Click
  const handleLearnToImprove = () => {
    setShowTips(true);
    setTimeout(() => {
      tipsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Handle Update from Modal
  const handleUpdateDetails = (updatedDetails) => {
    setUpdatedUserData({ ...updatedUserData, ...updatedDetails });
    // Optionally, you can refetch incentives or other data if necessary
  };

  // ==========================
  // useEffect Hooks
  // ==========================
  // Fetch all data on component mount
  useEffect(() => {
    fetchIncentives();
    fetchRank();
    fetchLeaderboard();
    fetchAchievements();
    fetchPracticeTestCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("coordinatorToken");
    router.push("/");
  };
  // Toast Notifications for Achievements
  useEffect(() => {
    if (achievements.length > 0) {
      const latestAchievement = achievements[achievements.length - 1];
      toast.success(
        `Congratulations! You've earned the "${latestAchievement.name}" badge!`
      );
    }
  }, [achievements]);

  // ==========================
  // Render Component
  // ==========================
  return (
    <section className="w-full pt-5 overflow-y-auto">
      {/* ================================
           Coordinator Profile Section
      ================================= */}
      <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-white shadow-lg p-6">
        {/* Profile Section */}
        <div className="w-full bg-[#2563EB] text-white rounded-t-3xl flex flex-col md:flex-row md:justify-between md:items-center p-6 mb-8">
          <div className="flex-1 mb-4 md:mb-0">
            <h1 className="text-xl md:text-2xl font-bold">
              Global Innovator Olympiad
            </h1>
            <div className="flex items-center mt-2">
              <span className="text-sm md:text-lg font-semibold uppercase">
                {updatedUserData?.name || "Coordinator Name"}
              </span>
              <ReactCountryFlag
                countryCode="IN"
                svg
                className="ml-2"
                style={{ width: "1.5em", height: "1.5em" }}
                title="India Flag"
              />
            </div>
            <p className="text-xs md:text-sm">Coordinator Profile</p>
            <p className="text-xs md:text-sm font-semibold">
              ID: {updatedUserData?.userId || "Coordinator ID"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
            >
              <FaSignOutAlt className="mr-2 text-lg" />
              <span className="font-semibold">Logout</span>
            </button>
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-700 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
          >
            Payment Info
            </button>
          </div>
        </div>

        {/* Learning Board Section */}
        <div className="mb-12">
          <h2 className="text-lg md:text-xl font-bold text-[#2563EB] mb-6">
            Learning Board
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-2xl shadow-md flex flex-col items-center justify-center p-6">
              <FaUserGraduate className="text-4xl mb-4" />
              <h2 className="text-base md:text-lg font-semibold uppercase mb-2">
                Total Students
              </h2>
              <p className="text-3xl md:text-4xl font-bold">  {students ? Object.keys(students).length : 0}</p>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl shadow-md flex flex-col items-center justify-center p-6">
              <FaClipboardList className="text-4xl mb-4" />
              <h2 className="text-base md:text-lg font-semibold uppercase mb-2">
                Practice Test Done
              </h2>
              <p className="text-3xl md:text-4xl font-bold">{practiceTestCounts?.totalPracticeTests || 0}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-2xl shadow-md flex flex-col items-center justify-center p-6">
              <FaBullseye className="text-4xl mb-4" />
              <h2 className="text-base md:text-lg font-semibold uppercase mb-2">
                Final Test Done
              </h2>
              <p className="text-3xl md:text-4xl font-bold"> {practiceTestCounts?.finalPracticeTests || 0}</p>
            </div>
          </div>
        </div>
        {/* Incentives & Rankings Section */}
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[#2563EB] mb-6">
            Incentives & Rankings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-tr from-[#9333EA] to-[#7C3AED] text-white rounded-2xl shadow-md flex flex-col items-center justify-center p-6">
              <FaMedal className="text-4xl mb-4" />
              <h2 className="text-base md:text-lg font-semibold uppercase mb-2">
                Category
              </h2>
              <p className="text-3xl md:text-4xl font-bold">
                {category || "N/A"}
              </p>
            </div>
            <div className="bg-gradient-to-tr from-[#F472B6] to-[#EC4899] text-white rounded-2xl shadow-md flex flex-col items-center justify-center p-6">
              <IoMdCash className="text-4xl mb-4" />
              <h2 className="text-base md:text-lg font-semibold uppercase mb-2">
                Total Incentives
              </h2>
              <p className="text-3xl md:text-4xl font-bold">
                ₹{totalIncentives ? totalIncentives.toLocaleString() : "0"}
              </p>
            </div>
            <div className="bg-gradient-to-tr from-[#34D399] to-[#10B981] text-white rounded-2xl shadow-md flex flex-col items-center justify-center p-6">
              <FaMedal className="text-4xl mb-4" />
              <h2 className="text-base md:text-lg font-semibold uppercase mb-2">
                Bonus Amount
              </h2>
              <p className="text-3xl md:text-4xl font-bold">
                ₹{bonusAmount ? bonusAmount.toLocaleString() : "0"}
              </p>
            </div>
            <div className="bg-gradient-to-tr from-[#F59E0B] to-[#FBBF24] text-white rounded-2xl shadow-md flex flex-col items-center justify-center p-6">
              <FaMedal className="text-4xl mb-4" />
              <h2 className="text-base md:text-lg font-semibold uppercase mb-2">
                Total Earnings
              </h2>
              <p className="text-3xl md:text-4xl font-bold">
                ₹{totalEarnings ? totalEarnings.toLocaleString() : "0"}
              </p>
            </div>
            <div className="bg-gradient-to-tr from-[#F43F5E] to-[#E11D48] text-white rounded-2xl shadow-md flex flex-col items-center justify-center p-6">
              <FaMedal className="text-4xl mb-4" />
              <h2 className="text-base md:text-lg font-semibold uppercase mb-2">
                Your Rank
              </h2>
              <p className="text-3xl md:text-4xl font-bold">
                {rank ? `${rank} / ${totalCoordinators}` : "N/A"}
              </p>
              <p className="text-xs text-white mt-2">
                Rank out of {totalCoordinators} total coordinators.
              </p>
            </div>
          </div>
        </div>
        {/* Rank Insights Section */}
        <div className="w-full text-center mb-12">
          <h2 className="text-xl font-semibold text-[#9333EA] mb-2">
            Your Rank Insights
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            You are currently ranked <strong>{rank}</strong> out of{" "}
            <strong>{totalCoordinators}</strong> coordinators. You're on track
            to reach the <strong>{nextRank}</strong> rank! Keep up the great
            work!
          </p>
          <div className="w-full bg-gray-300 rounded-full h-4 mt-3">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${rankProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            You're {rankProgress}% of the way to the next rank!
          </p>
        </div>

        {/* Feedback Section */}
        <div className="w-full text-center mb-12">
          <h2 className="text-xl font-semibold text-[#9333EA] mb-2">
            Feedback
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            {getMotivationalMessage()}
          </p>
          <button
            onClick={handleLearnToImprove}
            className="px-6 py-3 bg-[#2563EB] text-white font-bold rounded-full shadow-xl hover:bg-[#1D4ED8] transition-colors duration-300"
          >
            Learn How to Improve
          </button>
        </div>

        {/* Leaderboard Section */}
        <div className="w-full mb-12">
          <h2 className="text-lg md:text-xl font-bold text-[#2563EB] mb-5 flex items-center">
            <FaTrophy className="mr-2 text-2xl text-yellow-500" />
            Leaderboard
          </h2>
          {loadingLeaderboard ? (
            <p>Loading leaderboard...</p>
          ) : leaderboardError ? (
            <p className="text-red-500">{leaderboardError}</p>
          ) : leaderboard.length === 0 ? (
            <p>No coordinators found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2">Rank</th>
                    <th className="py-2">Coordinator</th>
                    <th className="py-2">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((coord, index) => (
                    <tr key={coord.userId} className="text-center border-t">
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{coord.name}</td>
                      <td className="py-2">{coord.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Achievements Section */}
        <div className="w-full mb-12">
          <h2 className="text-lg md:text-xl font-bold text-[#2563EB] mb-5 flex items-center">
            <FaMedal className="mr-2 text-2xl text-green-500" />
            Achievements
          </h2>
          {loadingAchievements ? (
            <p>Loading achievements...</p>
          ) : achievementsError ? (
            <p className="text-red-500">{achievementsError}</p>
          ) : achievements.length === 0 ? (
            <p>
              No achievements earned yet. Start working towards your first
              badge!
            </p>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex flex-col items-center bg-gradient-to-tr from-yellow-400 to-orange-500 text-white rounded-lg p-4 shadow-md"
                >
                  <img
                    src={achievement.badgeImage}
                    alt={`${achievement.name} badge`}
                    className="w-16 h-16 mb-2"
                  />
                  <span className="font-semibold">{achievement.name}</span>
                  <span className="text-sm">{achievement.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips to Improve Section */}
        {showTips && (
          <div className="w-full mb-12">
            <h2 className="text-lg md:text-xl font-bold text-[#2563EB] mb-5">
              Tips to Improve Your Rank
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {improvementTips.map((tip, index) => (
                <li key={index} className="text-gray-700">
                  {tip}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowTips(false)}
              className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        )}

        {/* Modal for Updating Payment Details */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative overflow-y-auto max-h-screen">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-2xl font-semibold mb-4">
                Add/Update Payment Details
              </h2>
              <ProfileOverviewSection
                userData={updatedUserData}
                onUpdateDetails={handleUpdateDetails}
              />

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <div className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl bg-white p-8">
        <h1 className="text-lg md:text-xl font-bold text-[#2563EB] mb-5">
          Incentives & Ranking
        </h1>
        <div className="w-full flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1 bg-gradient-to-tr from-[#9333EA] to-[#7C3AED] shadow-xl rounded-2xl p-6 text-center transition-transform transform hover:scale-105">
            <h1 className="text-lg md:text-xl font-semibold text-white flex items-center justify-center">
              <FaMedal className="mr-2 text-2xl" /> Category
            </h1>
            <span className="py-5 font-extrabold text-4xl text-white">
              {category || "N/A"}
            </span>
          </div>

          <div className="flex-1 bg-gradient-to-tr from-[#F472B6] to-[#EC4899] shadow-xl rounded-2xl p-6 text-center transition-transform transform hover:scale-105">
            <h1 className="text-lg md:text-xl font-semibold text-white flex items-center justify-center">
              <IoMdCash className="mr-2 text-2xl" /> Total Incentives
            </h1>
            <span className="py-5 font-extrabold text-4xl text-white">
              ₹{totalIncentives ? totalIncentives.toLocaleString() : "0"}
            </span>
          </div>

          <div className="flex-1 bg-gradient-to-tr from-[#34D399] to-[#10B981] shadow-xl rounded-2xl p-6 text-center transition-transform transform hover:scale-105">
            <h1 className="text-lg md:text-xl font-semibold text-white flex items-center justify-center">
              <FaMedal className="mr-2 text-2xl" /> Bonus Amount
            </h1>
            <span className="py-5 font-extrabold text-4xl text-white">
              ₹{bonusAmount ? bonusAmount.toLocaleString() : "0"}
            </span>
          </div>

          <div className="flex-1 bg-gradient-to-tr from-[#F59E0B] to-[#FBBF24] shadow-xl rounded-2xl p-6 text-center transition-transform transform hover:scale-105">
            <h1 className="text-lg md:text-xl font-semibold text-white flex items-center justify-center">
              <FaMedal className="mr-2 text-2xl" /> Total Earnings
            </h1>
            <span className="py-5 font-extrabold text-4xl text-white">
              ₹{totalEarnings ? totalEarnings.toLocaleString() : "0"}
            </span>
          </div>

          <div className="flex-1 bg-gradient-to-tr from-[#F43F5E] to-[#E11D48] shadow-xl rounded-2xl p-6 text-center transition-transform transform hover:scale-105">
            <h1 className="text-lg md:text-xl font-semibold text-white flex items-center justify-center">
              <FaMedal className="mr-2 text-2xl" /> Your Rank
            </h1>
            <span className="py-5 font-extrabold text-4xl text-white">
              {rank ? `${rank} / ${totalCoordinators}` : "N/A"}
            </span>
            <p className="text-sm text-white mt-2">
              Rank out of {totalCoordinators} total coordinators.
            </p>
          </div>
        </div>
      </div> */}
      {/* <div className="w-full mt-6 text-center">
          <h2 className="text-xl font-semibold text-[#9333EA] mb-2">
            Your Rank Insights
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            You are currently ranked <strong>{rank}</strong> out of{" "}
            <strong>{totalCoordinators}</strong> coordinators. You're on track
            to reach the <strong>{nextRank}</strong> rank! Keep up the great
            work!
          </p>
          <div className="w-full bg-gray-300 rounded-full h-4 mt-3">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${rankProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            You're {rankProgress}% of the way to the next rank!
          </p>
        </div> */}

      {/* <div className="w-full mt-6 text-center">
          <h2 className="text-xl font-semibold text-[#9333EA] mb-2">
            Feedback
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            {getMotivationalMessage()}
          </p>
          <button
            onClick={handleLearnToImprove}
            className="px-6 py-3 bg-[#2563EB] text-white font-bold rounded-full shadow-xl hover:bg-[#1D4ED8] transition-colors duration-300"
          >
            Learn How to Improve
          </button>
        </div> */}

      {/* <div className="w-full flex flex-col md:flex-row justify-between items-center mt-8 gap-6">
          <button
            onClick={fetchIncentives}
            className="w-full md:w-auto px-6 py-3 bg-[#2563EB] text-white font-bold rounded-full shadow-xl hover:bg-[#1D4ED8] transition-colors duration-300 flex items-center justify-center gap-2"
            disabled={loadingIncentives}
          >
            {loadingIncentives ? "Calculating..." : "Calculate Incentives"}
          </button>

          <button
            onClick={fetchRank}
            className="w-full md:w-auto px-6 py-3 bg-[#10B981] text-white font-bold rounded-full shadow-xl hover:bg-[#059669] transition-colors duration-300 flex items-center justify-center gap-2"
            disabled={loadingRank}
          >
            {loadingRank ? "Refreshing..." : "Refresh Rank"}
          </button>
        </div>

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </div> */}

      {/* <div className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl bg-white p-8 mt-8">
        <h2 className="text-lg md:text-xl font-bold text-[#2563EB] mb-5 flex items-center">
          <FaTrophy className="mr-2 text-2xl text-yellow-500" />
          Leaderboard
        </h2>
        {loadingLeaderboard ? (
          <p>Loading leaderboard...</p>
        ) : leaderboardError ? (
          <p className="text-red-500">{leaderboardError}</p>
        ) : leaderboard.length === 0 ? (
          <p>No coordinators found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2">Rank</th>
                  <th className="py-2">Coordinator</th>
                  <th className="py-2">Category</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((coord, index) => (
                  <tr key={coord.userId} className="text-center border-t">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{coord.name}</td>
                    <td className="py-2">{coord.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div> */}

      {/* <div className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl bg-white p-8 mt-8">
        <h2 className="text-lg md:text-xl font-bold text-[#2563EB] mb-5 flex items-center">
          <FaMedal className="mr-2 text-2xl text-green-500" />
          Achievements
        </h2>
        {loadingAchievements ? (
          <p>Loading achievements...</p>
        ) : achievementsError ? (
          <p className="text-red-500">{achievementsError}</p>
        ) : achievements.length === 0 ? (
          <p>
            No achievements earned yet. Start working towards your first badge!
          </p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex flex-col items-center bg-gradient-to-tr from-yellow-400 to-orange-500 text-white rounded-lg p-4 shadow-md"
              >
                <img
                  src={achievement.badgeImage}
                  alt={`${achievement.name} badge`}
                  className="w-16 h-16 mb-2"
                />
                <span className="font-semibold">{achievement.name}</span>
                <span className="text-sm">{achievement.description}</span>

                <div className="flex gap-2 mt-2">
                  <FacebookShareButton
                    url={
                      typeof window !== "undefined" ? window.location.href : ""
                    }
                    quote={generateShareMessage(achievement)}
                  >
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={
                      typeof window !== "undefined" ? window.location.href : ""
                    }
                    title={generateShareMessage(achievement)}
                  >
                    <TwitterIcon size={24} round />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={
                      typeof window !== "undefined" ? window.location.href : ""
                    }
                    title={generateShareMessage(achievement)}
                  >
                    <LinkedinIcon size={24} round />
                  </LinkedinShareButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}

      {/* {showTips && (
        <div
          ref={tipsRef}
          className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl bg-white p-8 mt-8"
        >
          <h2 className="text-lg md:text-xl font-bold text-[#2563EB] mb-5">
            Tips to Improve Your Rank
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {improvementTips.map((tip, index) => (
              <li key={index} className="text-gray-700">
                {tip}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowTips(false)}
            className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      )} */}

      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}

      {/* {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative overflow-y-auto max-h-screen">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-semibold mb-4">
              Add/Update Payment Details
            </h2>
            <ProfileOverviewSection
              userData={updatedUserData}
              onUpdateDetails={handleUpdateDetails}
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}  */}
    </section>
  );
};

export default CoordinatorDashboardSection;
