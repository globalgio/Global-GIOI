// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FaBookOpen } from "react-icons/fa";

// const standardsData = [
//   {
//     title: "Standard 5",
//     pdfLink: "/pdf/5.pdf",
//     roman: "V",
//     icon: <FaBookOpen />,
//   },
//   {
//     title: "Standard 6",
//     pdfLink: "/pdf/6.pdf",
//     roman: "VI",
//     icon: <FaBookOpen />,
//   },
//   {
//     title: "Standard 7",
//     pdfLink: "/pdf/7.pdf",
//     roman: "VII",
//     icon: <FaBookOpen />,
//   },
//   {
//     title: "Standard 8",
//     pdfLink: "/pdf/8.pdf",
//     roman: "VIII",
//     icon: <FaBookOpen />,
//   },
//   {
//     title: "Standard 9",
//     pdfLink: "/pdf/9.pdf",
//     roman: "IX",
//     icon: <FaBookOpen />,
//   },
//   {
//     title: "Standard 10",
//     pdfLink: "/pdf/10.pdf",
//     roman: "X",
//     icon: <FaBookOpen />,
//   },
// ];

// const Cards = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedStandard, setSelectedStandard] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     number: "",
//     role: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     const { name, email, number, role } = formData;

//     if (!name || !email || !number || !role) {
//       alert("Please fill all the fields before submitting.");
//       return;
//     }

//     const selectedPdf = standardsData.find(
//       (standard) => standard.title === selectedStandard
//     )?.pdfLink;

//     // Backend POST request
//     try {
//       await fetch("https://your-backend-url/api/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, standard: selectedStandard }),
//       });
//     } catch (error) {
//       console.error("Error submitting form data:", error);
//       alert("Error submitting your data. Please try again.");
//       return;
//     }

//     // Open PDF after successful submission
//     if (selectedPdf) {
//       window.open(selectedPdf, "_blank");
//     }

//     // Close modal and reset form
//     setIsPopupOpen(false);
//     setFormData({ name: "", email: "", number: "", role: "" });
//   };

//   const closeModal = () => {
//     setIsPopupOpen(false);
//     setFormData({ name: "", email: "", number: "", role: "" });
//   };

//   return (
//     <div className="p-8">
//       {/* Title */}
//       <h1 className="text-4xl font-bold text-center text-black mb-4">
//         Syllabus & <span className="text-blue-600">Preparation</span>
//       </h1>
//       <p className="text-lg text-center text-gray-700 mt-4 mb-8">
//         We provide a detailed syllabus for each subject to help students prepare
//         effectively. Our resources include
//       </p>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {standardsData.map((standard, index) => {
//           const isBlue = index % 2 === 0; // Blue for even indices, white for odd
//           return (
//             <div
//               key={index}
//               className={`flex flex-col items-center justify-center h-48 w-full rounded-xl cursor-pointer transition duration-300 transform hover:-translate-y-3 hover:scale-105 shadow-lg hover:shadow-2xl ${
//                 isBlue
//                   ? "bg-blue-500 text-white hover:bg-blue-600"
//                   : "bg-white text-blue-500 hover:bg-gray-100"
//               }`}
//               onClick={() => {
//                 setSelectedStandard(standard.title);
//                 setIsPopupOpen(true);
//               }}
//             >
//               {/* Icon */}
//               <div
//                 className={`text-5xl mb-4 animate-pulse ${
//                   isBlue ? "text-white" : "text-blue-500"
//                 }`}
//               >
//                 {standard.icon}
//               </div>

//               {/* Roman Number Icon */}
//               <div
//                 className={`text-3xl font-bold mb-2 ${
//                   isBlue ? "text-white" : "text-blue-500"
//                 }`}
//               >
//                 {standard.roman}
//               </div>

//               {/* Standard Title */}
//               <p
//                 className={`text-lg font-semibold text-center ${
//                   isBlue ? "text-white" : "text-blue-500"
//                 }`}
//               >
//                 {standard.title}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Popup Modal */}
//       {isPopupOpen && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//         >
//           <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl flex">
//             {/* Left Side Image */}
//             <div className="w-1/2 bg-blue-100 rounded-l-xl flex items-center justify-center">
//               <img
//                 src="/homeabout.png"
//                 alt="Form Illustration"
//                 className="w-3/4 h-auto rounded-lg"
//               />
//             </div>

//             {/* Right Side Form */}
//             <div className="w-1/2 p-6">
//               <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
//                 Enter Your Details
//               </h2>
//               <form className="space-y-4">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Name"
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="Email"
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <input
//                   type="text"
//                   name="number"
//                   value={formData.number}
//                   onChange={handleInputChange}
//                   placeholder="Phone Number"
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select Role</option>
//                   <option value="Teacher">Teacher</option>
//                   <option value="Student">Student</option>
//                   <option value="Parent">Parent</option>
//                 </select>
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
//                 >
//                   Submit
//                 </button>
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="w-full bg-gray-300 text-gray-700 p-3 rounded-md hover:bg-gray-400 transition"
//                 >
//                   Close
//                 </button>
//               </form>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Cards;
import { FaBookOpen, FaDownload } from "react-icons/fa";

const standardsData = [
  {
    title: "Standard 5",
    pdfLink: "/pdf/5.pdf",
    roman: "V",
    icon: <FaBookOpen />,
    color: "#0066CC",
    gradient: "from-[#0066CC] to-[#4D9FFF]",
  },
  {
    title: "Standard 6",
    pdfLink: "/pdf/6.pdf",
    roman: "VI",
    icon: <FaBookOpen />,
    color: "#00D4FF",
    gradient: "from-[#00D4FF] to-[#0066CC]",
  },
  {
    title: "Standard 7",
    pdfLink: "/pdf/7.pdf",
    roman: "VII",
    icon: <FaBookOpen />,
    color: "#10B981",
    gradient: "from-[#10B981] to-[#059669]",
  },
  {
    title: "Standard 8",
    pdfLink: "/pdf/8.pdf",
    roman: "VIII",
    icon: <FaBookOpen />,
    color: "#FFD700",
    gradient: "from-[#FFD700] to-[#D4AF37]",
  },
  {
    title: "Standard 9",
    pdfLink: "/pdf/9.pdf",
    roman: "IX",
    icon: <FaBookOpen />,
    color: "#8B5CF6",
    gradient: "from-[#8B5CF6] to-[#7C3AED]",
  },
  {
    title: "Standard 10",
    pdfLink: "/pdf/10.pdf",
    roman: "X",
    icon: <FaBookOpen />,
    color: "#F59E0B",
    gradient: "from-[#F59E0B] to-[#D97706]",
  },
];

const Cards = () => {
  return (
    <>
      <style>{`
        @layer utilities {
          @keyframes slide-in-up {
            from {
              opacity: 0;
              transform: translateY(60px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -30px) scale(1.05);
            }
            66% {
              transform: translate(-25px, 25px) scale(0.95);
            }
          }

          @keyframes float-delayed {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(-35px, 30px) scale(1.08);
            }
            66% {
              transform: translate(25px, -25px) scale(0.92);
            }
          }

          @keyframes pulse-slow {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.08);
              opacity: 0.8;
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }

          @keyframes rotate-gradient {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes bounce-icon {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(5deg);
            }
          }

          @keyframes expand-line {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }

          @keyframes shine {
            0% {
              left: -100%;
            }
            50%, 100% {
              left: 100%;
            }
          }

          .animate-slide-in-up {
            animation: slide-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animate-fade-in-up {
            opacity: 0;
            animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animate-float {
            animation: float 8s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 9s ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }

          .animate-shimmer {
            animation: shimmer 3s linear infinite;
          }

          .animate-rotate-gradient {
            animation: rotate-gradient 8s linear infinite;
          }

          .animate-bounce-icon {
            animation: bounce-icon 2s ease-in-out infinite;
          }

          .animate-expand-line {
            animation: expand-line 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animate-shine {
            animation: shine 2.5s ease-in-out infinite;
          }

          .animation-delay-100 {
            animation-delay: 0.1s;
          }

          .animation-delay-200 {
            animation-delay: 0.2s;
          }

          .animation-delay-300 {
            animation-delay: 0.3s;
          }

          .animation-delay-400 {
            animation-delay: 0.4s;
          }

          .animation-delay-500 {
            animation-delay: 0.5s;
          }

          .animation-delay-600 {
            animation-delay: 0.6s;
          }

          .gradient-text {
            background: linear-gradient(90deg, #0066CC, #00D4FF, #0066CC);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      `}</style>

      <div className="relative bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA] py-20 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#0066CC] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#FFD700] rounded-full blur-3xl animate-float-delayed"></div>
          <div
            className="absolute top-1/2 left-1/2 w-[450px] h-[450px] bg-[#10B981] rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-16 animate-slide-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] mb-4">
              Syllabus &{" "}
              <span className="gradient-text animate-shimmer inline-block">
                Preparation
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] mx-auto rounded-full mb-6"></div>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#2C3E50] max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              We provide a detailed syllabus for each subject to help students
              prepare effectively. Our resources include comprehensive study
              materials and practice sets.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardsData.map((standard, index) => (
              <div
                key={index}
                className={`animate-fade-in-up animation-delay-${
                  (index + 1) * 100
                }`}
              >
                <div
                  className="relative group h-full cursor-pointer"
                  onClick={() => window.open(standard.pdfLink, "_blank")}
                >
                  {/* Rotating Gradient Glow */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${standard.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 animate-rotate-gradient`}
                  ></div>

                  {/* Corner Decorations */}
                  <div
                    className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 rounded-tl-2xl z-20 animate-pulse-slow transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: standard.color }}
                  ></div>
                  <div
                    className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 rounded-br-2xl z-20 animate-pulse-slow transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: standard.color }}
                  ></div>

                  {/* Main Card */}
                  <div
                    className="relative flex flex-col items-center justify-center p-8 h-64 rounded-2xl bg-white shadow-2xl border-4 border-white ring-4 transition-all duration-500 transform group-hover:scale-105 group-hover:-rotate-1 overflow-hidden"
                    style={{
                      ringColor: `${standard.color}40`,
                      boxShadow: `0 25px 50px -12px ${standard.color}20`,
                    }}
                  >
                    {/* Background Gradient on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${standard.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-shine"></div>
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col items-center">
                      {/* Icon with Animation */}
                      <div
                        className="text-6xl mb-4 group-hover:animate-bounce-icon transition-all duration-300 group-hover:scale-110"
                        style={{ color: standard.color }}
                      >
                        <div className="relative">
                          {standard.icon}
                          {/* Icon Glow */}
                          <div
                            className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"
                            style={{ color: standard.color }}
                          >
                            {standard.icon}
                          </div>
                        </div>
                      </div>

                      {/* Roman Numeral */}
                      <div
                        className="text-5xl font-extrabold mb-3 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
                        style={{
                          color: standard.color,
                          textShadow: `0 0 30px ${standard.color}60`,
                        }}
                      >
                        {standard.roman}
                      </div>

                      {/* Animated Underline */}
                      <div className="relative mb-3">
                        <div
                          className="h-1 w-16 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                          style={{ backgroundColor: standard.color }}
                        ></div>
                      </div>

                      {/* Standard Title */}
                      <p
                        className="text-xl font-bold text-center transition-colors duration-300 group-hover:text-white"
                        style={{ color: standard.color }}
                      >
                        {standard.title}
                      </p>

                      {/* Download Indicator */}
                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-white">
                        <FaDownload className="text-base" />
                        <span>Download PDF</span>
                      </div>
                    </div>

                    {/* Decorative Corner Dots */}
                    <div className="absolute top-4 right-4 flex gap-1.5 opacity-30 z-10">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse-slow"
                        style={{ backgroundColor: standard.color }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-pulse-slow"
                        style={{
                          backgroundColor: standard.color,
                          animationDelay: "0.3s",
                        }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-pulse-slow"
                        style={{
                          backgroundColor: standard.color,
                          animationDelay: "0.6s",
                        }}
                      ></div>
                    </div>

                    {/* Floating Accent */}
                    <div
                      className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-40 blur-2xl group-hover:opacity-70 transition-opacity duration-500 animate-pulse-slow"
                      style={{ backgroundColor: standard.color }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Info Section */}
          <div className="mt-16 text-center animate-fade-in-up animation-delay-600">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#0066CC]/10 to-[#00D4FF]/10 rounded-full border border-[#0066CC]/20">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0066CC] animate-pulse-slow"></div>
                <div
                  className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse-slow"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse-slow"
                  style={{ animationDelay: "0.6s" }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-[#0066CC]">
                Click any card to download the syllabus PDF
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;