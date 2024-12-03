"use client";

import React, { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("students"); // Tracks the active section

  // Sidebar options
  const sidebarOptions = [
    { id: "students", label: "Students" },
    { id: "classes", label: "Classes" },
    { id: "reference", label: "Reference Code" },
    { id: "bulkUpload", label: "Bulk Upload" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-blue-50">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
        </div>
        <nav className="mt-6 space-y-4">
          {sidebarOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveTab(option.id)}
              className={`w-full px-6 py-3 text-left font-medium rounded-lg transition-all duration-300 ${
                activeTab === option.id
                  ? "bg-blue-500 shadow-lg"
                  : "hover:bg-blue-500 hover:shadow-lg"
              }`}
            >
              {option.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {activeTab.replace(/([A-Z])/g, " $1")}
          </h2>
          <input
            type="text"
            placeholder="Search"
            className="w-80 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Students Section */}
        {activeTab === "students" && (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">School Name</th>
                    <th className="px-4 py-2">Payment Status</th>
                    <th className="px-4 py-2">Test Completed</th>
                    <th className="px-4 py-2">Marks</th>
                    <th className="px-4 py-2">Ranking</th>
                    <th className="px-4 py-2">Is Std</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "John Doe",
                      school: "ABC School",
                      payment: "Paid",
                      completed: "Yes",
                      marks: 85,
                      ranking: 5,
                      isStd: "Yes",
                    },
                    {
                      name: "Jane Smith",
                      school: "XYZ School",
                      payment: "Pending",
                      completed: "No",
                      marks: "-",
                      ranking: "-",
                      isStd: "No",
                    },
                  ].map((student, idx) => (
                    <tr
                      key={idx}
                      className="border-t hover:bg-blue-50 transition"
                    >
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.school}</td>
                      <td className="px-4 py-2">{student.payment}</td>
                      <td className="px-4 py-2">{student.completed}</td>
                      <td className="px-4 py-2">{student.marks}</td>
                      <td className="px-4 py-2">{student.ranking}</td>
                      <td className="px-4 py-2">{student.isStd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Classes Section */}
        {activeTab === "classes" && (
          <div>
            <h3 className="text-lg font-bold text-gray-800">Classes Content</h3>
            <p className="text-gray-600 mt-2">
              This is a placeholder for the classes section. Add your content
              here.
            </p>
          </div>
        )}

        {/* Reference Code Section */}
        {activeTab === "reference" && (
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Reference Code Content
            </h3>
            <p className="text-gray-600 mt-2">
              This is a placeholder for the reference code section. Add your
              content here.
            </p>
          </div>
        )}

        {/* Bulk Upload Section */}
        {activeTab === "bulkUpload" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">Bulk Upload</h3>
            <p className="text-gray-600 mt-2">
              Upload an Excel file to bulk add data.
            </p>
            <input
              type="file"
              accept=".xlsx, .xls"
              className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
