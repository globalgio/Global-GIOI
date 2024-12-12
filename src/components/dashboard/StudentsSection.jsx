import React, { useState, useEffect } from "react";
import {
  IoIosSearch,
  IoIosFunnel,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
} from "react-icons/io";

const StudentsSection = ({
  students,
  searchName,
  setSearchName,
  currentPage,
  setCurrentPage,
  schoolName, // Receiving schoolName prop
  principalName, // Receiving principalName prop
}) => {
  const [filteredStudents, setFilteredStudents] = useState([]); // Holds the filtered data
  const renderRanking = (rank) => (rank !== undefined ? rank : "N/A");
  const studentsPerPage = 6; // Display 6 students per page

  const [showSearch, setShowSearch] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null); // Track the active filter
  const [selectedStandard, setSelectedStandard] = useState("All");
  const [selectedCountFilter, setSelectedCountFilter] = useState("All");
  const [countSortOrder, setCountSortOrder] = useState("All"); // Added state for sorting
  const [selectedPracticeFilter, setSelectedPracticeFilter] = useState({
    sort: "All",
    rankType: "All",
  });
  const [selectedFinalFilter, setSelectedFinalFilter] = useState({
    sort: "All",
    rankType: "All",
  });

  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState("All");

  const toggleSearchBar = () => setShowSearch(!showSearch);

  const toggleFilterDropdown = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleCountFilterSelect = (filter) => {
    setSelectedCountFilter(filter);
    setActiveFilter(null);
  };

  const handleSortOrderSelect = (order) => {
    setCountSortOrder(order);
    setActiveFilter(null);
  };

  const handlePracticeFilterSelect = (filterType, value) => {
    setSelectedPracticeFilter((prev) => ({ ...prev, [filterType]: value }));
    setActiveFilter(null);
  };

  const handleFinalFilterSelect = (filterType, value) => {
    setSelectedFinalFilter((prev) => ({ ...prev, [filterType]: value }));
    setActiveFilter(null);
  };

  const handlePaymentFilterSelect = (status) => {
    setSelectedPaymentFilter(status);
    setActiveFilter(null);
  };

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };
  const handleStandardFilterSelect = (standard) => {
    // Remove non-digit characters (e.g., 'th') from selected standard
    const normalizedStandard = standard.replace(/[^0-9]/g, "");
    setSelectedStandard(normalizedStandard === "" ? "All" : normalizedStandard);
    setActiveFilter(null);
  };

  useEffect(() => {
    let result = [...students];

    if (searchName.trim()) {
      result = result.filter((student) =>
        student.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (selectedStandard !== "All") {
      // Normalize student standard and selected standard for comparison
      result = result.filter(
        (student) => String(student.standard) === String(selectedStandard)
      );
    }

    // Apply filters for Practice and Final Test count sorting
    if (selectedCountFilter === "Practice Test") {
      result = result.filter((student) => student.marks?.mock);
    } else if (selectedCountFilter === "Final Practice Test") {
      result = result.filter((student) => student.marks?.live);
    }

    // Sorting logic (Low to High / High to Low)
    if (countSortOrder === "Low to High") {
      result.sort((a, b) => {
        const aTestCount =
          selectedCountFilter === "Practice Test"
            ? Object.keys(a.marks?.mock || {}).length
            : Object.keys(a.marks?.live || {}).length;
        const bTestCount =
          selectedCountFilter === "Practice Test"
            ? Object.keys(b.marks?.mock || {}).length
            : Object.keys(b.marks?.live || {}).length;
        return aTestCount - bTestCount;
      });
    } else if (countSortOrder === "High to Low") {
      result.sort((a, b) => {
        const aTestCount =
          selectedCountFilter === "Practice Test"
            ? Object.keys(a.marks?.mock || {}).length
            : Object.keys(a.marks?.live || {}).length;
        const bTestCount =
          selectedCountFilter === "Practice Test"
            ? Object.keys(b.marks?.mock || {}).length
            : Object.keys(b.marks?.live || {}).length;
        return bTestCount - aTestCount;
      });
    }

    setFilteredStudents(result);
    setCurrentPage(1);
  }, [
    students,
    searchName,
    selectedStandard,
    selectedCountFilter,
    countSortOrder,
    setCurrentPage,
  ]);
  const toggleRankFilter = (filterType, rankType) => {
    if (filterType === "practice") {
      setSelectedPracticeFilter((prev) => ({
        ...prev,
        rankType,
      }));
    } else if (filterType === "final") {
      setSelectedFinalFilter((prev) => ({
        ...prev,
        rankType,
      }));
    }
  };

  const startIndex = (currentPage - 1) * studentsPerPage;
  const displayedStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const getTestCountsForStudent = (student) => {
    const mockTestsCount = student.marks?.mock
      ? Object.keys(student.marks.mock).length
      : 0;
    const liveTestsCount = student.marks?.live
      ? Object.keys(student.marks.live).length
      : 0;

    return { mockTestsCount, liveTestsCount };
  };
  return (
    <section className="DashboardHero w-full h-auto pt-5 bg-gray-50">
      <div className="w-[90%] max-w-6xl mx-auto bg-white rounded-2xl shadow-lg">
        <div className="w-full h-full flex items-center px-6 py-5 justify-between border-b">
          <h1 className="text-3xl font-bold text-blue-600">
            📚 GIO - Olympiad Tracker
          </h1>
          {schoolName && principalName && (
            <div className="flex flex-col items-end text-right">
              <span className="text-gray-700 font-bold text-base">
                {schoolName}
              </span>
              <span className="text-gray-500 text-sm">{principalName}</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-[90%] max-w-6xl mx-auto mt-5 bg-white rounded-2xl shadow-lg">
        <div className="w-full px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 text-gray-700 font-semibold text-sm border-b pb-3">
            {/* Name Filter */}
            <div className="flex items-center">
              <span>Name</span>
              <IoIosSearch
                className="text-gray-500 text-xl ml-2 cursor-pointer hover:text-blue-500 transition"
                onClick={toggleSearchBar}
              />
            </div>

            {/* Standard Filter */}
            <div className="relative">
              <span>Standard</span>
              <IoIosFunnel
                className="text-gray-500 text-xl ml-2 cursor-pointer hover:text-blue-500 transition"
                onClick={() => toggleFilterDropdown("standard")}
              />
              {activeFilter === "standard" && (
                <div className="absolute top-8 bg-white shadow-md rounded-lg p-3 w-40 border border-gray-300 z-10">
                  <div
                    className={`p-2 hover:bg-blue-50 cursor-pointer ${
                      selectedStandard === "All" ? "font-bold" : ""
                    }`}
                    onClick={() => handleStandardFilterSelect("All")}
                  >
                    <IoMdCheckmarkCircle className="inline-block mr-2 text-blue-500" />
                    All
                  </div>
                  {[5, 6, 7, 8, 9, 10].map((standard) => (
                    <div
                      key={standard}
                      className={`p-2 hover:bg-blue-50 cursor-pointer ${
                        selectedStandard === String(standard) ? "font-bold" : ""
                      }`}
                      onClick={() =>
                        handleStandardFilterSelect(`${standard}th`)
                      }
                    >
                      <IoMdCheckmarkCircle className="inline-block mr-2 text-blue-500" />
                      {standard}th
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Count Filter */}
            <div className="relative">
              <span>Count</span>
              <IoIosFunnel
                className="text-gray-500 text-xl ml-2 cursor-pointer hover:text-blue-500 transition"
                onClick={() => toggleFilterDropdown("count")}
              />
              {activeFilter === "count" && (
                <div className="absolute top-8 bg-white shadow-md rounded-lg p-3 w-40 border border-gray-300 z-10">
                  <div
                    className={`p-2 hover:bg-blue-50 cursor-pointer ${
                      selectedCountFilter === "All" ? "font-bold" : ""
                    }`}
                    onClick={() => handleCountFilterSelect("All")}
                  >
                    <IoMdCheckmarkCircle className="inline-block mr-2 text-blue-500" />
                    All
                  </div>
                  <div
                    className={`p-2 hover:bg-blue-50 cursor-pointer ${
                      selectedCountFilter === "Practice Test" ? "font-bold" : ""
                    }`}
                    onClick={() => handleCountFilterSelect("Practice Test")}
                  >
                    <IoMdCheckmarkCircle className="inline-block mr-2 text-blue-500" />
                    Practice Test
                  </div>
                  <div
                    className={`p-2 hover:bg-blue-50 cursor-pointer ${
                      selectedCountFilter === "Final Practice Test"
                        ? "font-bold"
                        : ""
                    }`}
                    onClick={() =>
                      handleCountFilterSelect("Final Practice Test")
                    }
                  >
                    <IoMdCheckmarkCircle className="inline-block mr-2 text-blue-500" />
                    Final Practice Test
                  </div>
                  <div
                    className={`p-2 hover:bg-blue-50 cursor-pointer ${
                      countSortOrder === "Low to High" ? "font-bold" : ""
                    }`}
                    onClick={() => handleSortOrderSelect("Low to High")}
                  >
                    <IoMdCheckmarkCircle className="inline-block mr-2 text-blue-500" />
                    Low to High
                  </div>
                  <div
                    className={`p-2 hover:bg-blue-50 cursor-pointer ${
                      countSortOrder === "High to Low" ? "font-bold" : ""
                    }`}
                    onClick={() => handleSortOrderSelect("High to Low")}
                  >
                    <IoMdCheckmarkCircle className="inline-block mr-2 text-blue-500" />
                    High to Low
                  </div>
                </div>
              )}
            </div>

            {/* Practice Rankings */}
            <div>
              <span>Practice Rankings</span>
            </div>

            {/* Final Rankings */}
            <div>
              <span>Final Rankings</span>
            </div>

            {/* Payment Status */}
            <div>
              <span>Payment Status</span>
            </div>

            {/* Credential ID */}
            <div>
              <span>Credential ID</span>
            </div>
          </div>

          {/* Search Box */}
          {showSearch && (
            <div className="mt-4">
              <input
                type="text"
                value={searchName}
                onChange={handleSearchChange}
                placeholder="🔍 Search students..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Students Data */}
          {displayedStudents.map((student, index) => {
            const { mockTestsCount, liveTestsCount } =
              getTestCountsForStudent(student);

            const displayMockCount =
              selectedCountFilter === "Practice Test"
                ? mockTestsCount
                : selectedCountFilter === "Final Practice Test"
                ? 0
                : mockTestsCount;
            const displayLiveCount =
              selectedCountFilter === "Final Practice Test"
                ? liveTestsCount
                : selectedCountFilter === "Practice Test"
                ? 0
                : liveTestsCount;

            return (
              <div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-7 gap-4 text-gray-800 text-sm py-3 border-b last:border-none ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <span>{student.name}</span>
                <span>{student.standard}</span>
                <span>
                  • Practice Tests: {displayMockCount}
                  <br />• Final Tests: {displayLiveCount}
                </span>
                <span>
                  {(selectedCountFilter === "Practice Test" || selectedCountFilter === "All") && (
                    <>
                      • Global:{" "}
                      {student.rankings?.practice?.global?.rank || "N/A"}
                      <br />• Country:{" "}
                      {student.rankings?.practice?.country?.rank || "N/A"}
                      <br />• State:{" "}
                      {student.rankings?.practice?.state?.rank || "N/A"}
                    </>
                  )}
                </span>
                <span>
                  {(selectedCountFilter === "Final Practice Test" || selectedCountFilter === "All") && (
                    <>
                      • Global: {student.rankings?.final?.global?.rank || "N/A"}
                      <br />• Country:{" "}
                      {student.rankings?.final?.country?.rank || "N/A"}
                      <br />• State:{" "}
                      {student.rankings?.final?.state?.rank || "N/A"}
                    </>
                  )}
                </span>
                <span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      student.paymentStatus === "Unpaid"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {student.paymentStatus}
                  </span>
                </span>
                <span>
                  {student.certificateCodes?.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {student.certificateCodes.map((code, idx) => (
                        <li key={idx}>{code}</li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>
            );
          })}

          {/* Pagination */}
          {filteredStudents.length > studentsPerPage && (
            <div className="flex justify-between mt-5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={
                  currentPage * studentsPerPage >= filteredStudents.length
                }
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudentsSection;