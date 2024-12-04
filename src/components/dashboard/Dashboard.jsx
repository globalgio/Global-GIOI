"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("students"); // Default to students
  const [userData, setUserData] = useState(null); // State to store user data
  const [students, setStudents] = useState([]); // State to store students
  const [filteredStudents, setFilteredStudents] = useState([]); // Filtered students list
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [selectedStandard, setSelectedStandard] = useState(""); // Selected standard filter
  const [searchName, setSearchName] = useState(""); // Search input
  const studentsPerPage = 10; // Number of students per page
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState(null);

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/school/bulk-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.status === 200) {
        setUploadResults(response.data); // Store upload results
        toast.success("File uploaded successfully!");
        setFile(null); // Clear file
      } else {
        toast.error("File upload failed.");
      }
    } catch (err) {
      console.error("Error uploading file:", err.message);
      toast.error("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  const router = useRouter();
  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const [file, setFile] = useState(null); // Add this state for the file upload

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("schoolToken");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          router.push("/auth");
          return;
        }

        // Fetch school representative data
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/school/representative`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const representative = userResponse.data.representative;
        setUserData(representative);

        // Fetch students by school name
        const studentsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/school/fetch-users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              schoolName: representative.schoolName, // Pass schoolName as a query parameter
            },
          }
        );

        const fetchedStudents = studentsResponse.data.users || [];
        setStudents(fetchedStudents);
        setFilteredStudents(fetchedStudents);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("schoolToken");
    router.push("/");
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage * studentsPerPage < filteredStudents.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Filter students based on selected filters
  const filterStudents = () => {
    let result = [...students];

    // Filter by standard
    if (selectedStandard) {
      result = result.filter(
        (student) => student.standard === selectedStandard
      );
    }

    // Dynamic search filter
    if (searchName.trim()) {
      result = result.filter((student) =>
        student.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredStudents(result);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Filter as you type for search
  useEffect(() => {
    filterStudents();
  }, [searchName, selectedStandard]);

  const renderMainContent = () => {
    if (activeTab === "students") {
      const startIndex = (currentPage - 1) * studentsPerPage;
      const currentStudents = filteredStudents.slice(
        startIndex,
        startIndex + studentsPerPage
      );

      return (
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg">
            {/* Filter Section */}
            <div className="p-4 border-b flex gap-4 items-center bg-gray-50">
              <select
                className="p-2 border rounded-md"
                value={selectedStandard}
                onChange={(e) => setSelectedStandard(e.target.value)}
              >
                <option value="">All Standards</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
              </select>
              <input
                type="text"
                className="p-2 border rounded-md flex-grow"
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>

            {/* Students Table */}
            <table className="w-full text-left table-auto mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4">Name</th>
                  <th className="p-4">Standard</th>
                  <th className="p-4">Live Rankings</th>
                  <th className="p-4">Mock Rankings</th>
                  <th className="p-4">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.length > 0 ? (
                  currentStudents.map((student, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition ease-in-out"
                    >
                      <td className="p-4">{student.name}</td>
                      <td className="p-4">{student.standard}</td>
                      <td className="p-4">
                        <ul className="list-disc pl-4">
                          <li>
                            Global: {student.ranks?.live?.global?.rank || "N/A"}
                          </li>
                          <li>
                            Country:{" "}
                            {student.ranks?.live?.country?.rank || "N/A"}
                          </li>
                          <li>
                            State: {student.ranks?.live?.state?.rank || "N/A"}
                          </li>
                        </ul>
                      </td>
                      <td className="p-4">
                        <ul className="list-disc pl-4">
                          <li>
                            Global: {student.ranks?.mock?.global?.rank || "N/A"}
                          </li>
                          <li>
                            Country:{" "}
                            {student.ranks?.mock?.country?.rank || "N/A"}
                          </li>
                          <li>
                            State: {student.ranks?.mock?.state?.rank || "N/A"}
                          </li>
                        </ul>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            student.paymentStatus === "Paid"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {student.paymentStatus || "Not Paid"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 p-4">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {filteredStudents.length > studentsPerPage && (
              <div className="flex justify-end p-4 space-x-2">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  onClick={handleNextPage}
                  disabled={
                    currentPage * studentsPerPage >= filteredStudents.length
                  }
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }
    // In your main render content section, implement the Bulk Upload tab:
    if (activeTab === "Bulk Upload") {
      return (
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Bulk Upload
            </h2>
            <div
              className="border-dashed border-2 border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200"
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex justify-center items-center text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16M5 12l7 7 7-7"
                  />
                </svg>
                <span>
                  {file ? file.name : "Click or Drag & Drop your file here"}
                </span>
              </label>
            </div>
            <p className="text-gray-500 mt-2">
              Max. File Size: 20MB | Formats: .csv, .xlsx
            </p>
            {file && (
              <div className="mt-4">
                {uploading ? (
                  <div>
                    <p>Uploading: {uploadProgress}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-500 h-4 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleFileUpload}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                  >
                    Upload
                  </button>
                )}
              </div>
            )}
            {uploadResults && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-700">
                  Upload Results
                </h3>
                <p className="text-green-500">
                  {uploadResults.successCount} students uploaded successfully.
                </p>
                <p className="text-red-500">
                  {uploadResults.failedCount} students failed to upload.
                </p>
                {uploadResults.failedEntries.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-bold text-gray-800">
                      Failed Entries
                    </h4>
                    <ul className="list-disc text-left pl-4">
                      {uploadResults.failedEntries.map((entry, index) => (
                        <li key={index}>
                          <strong>{entry.student.name || "Unknown"}</strong>:{" "}
                          {entry.reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }
    if (activeTab === "profile") {
      return (
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              School Profile
            </h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {userData?.schoolName || "School Name"}
              </h3>
              <p className="text-gray-600">{userData?.email || "Email"}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-500 text-white p-6 rounded-lg text-center">
                <h4 className="text-lg font-semibold">Total Students</h4>
                <p className="text-3xl font-bold">{students.length}</p>
              </div>
              <div className="bg-green-500 text-white p-6 rounded-lg text-center">
                <h4 className="text-lg font-semibold">Tests Applied</h4>
                <p className="text-3xl font-bold">
                  {userData?.testsApplied || 0}
                </p>
              </div>
              <div className="bg-yellow-500 text-white p-6 rounded-lg text-center">
                <h4 className="text-lg font-semibold">Tests Completed</h4>
                <p className="text-3xl font-bold">
                  {userData?.testsCompleted || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Sidebar */}
      <div className="w-64 bg-[#2563EB] text-white flex-shrink-0 h-screen fixed top-0 left-0">
        <div className="p-6 border-b border-blue-600">
          <h1 className="text-lg font-bold">Global Innovator Olympiad</h1>
        </div>
        <ul className="p-4 space-y-6">
          {[
            { name: "Profile", tab: "profile" },
            { name: "Students", tab: "students" },
            { name: "Bulk Upload", tab: "Bulk Upload" },
          ].map((item, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg cursor-pointer ${
                activeTab === item.tab ? "bg-blue-500" : "hover:bg-blue-500"
              }`}
              onClick={() => setActiveTab(item.tab)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white p-3 m-4 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow ml-64 overflow-y-auto relative">
        {renderMainContent()}
        <div className="absolute bottom-0 right-0 p-4">
          <div className="bg-yellow-500 text-white p-4 rounded-lg animate-slide-left">
            Dashboard is under maintenance. Working on the UI/UX.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
