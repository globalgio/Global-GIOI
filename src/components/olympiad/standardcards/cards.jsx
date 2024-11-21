import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";

const standardsData = [
  { title: "Standard 5", pdfLink: "/pdf/5.pdf", roman: "V", icon: <FaBookOpen /> },
  { title: "Standard 6", pdfLink: "/pdf/6.pdf", roman: "VI", icon: <FaBookOpen /> },
  { title: "Standard 7", pdfLink: "/pdf/7.pdf", roman: "VII", icon: <FaBookOpen /> },
  { title: "Standard 8", pdfLink: "/pdf/8.pdf", roman: "VIII", icon: <FaBookOpen /> },
  { title: "Standard 9", pdfLink: "/pdf/9.pdf", roman: "IX", icon: <FaBookOpen /> },
  { title: "Standard 10", pdfLink: "/pdf/10.pdf", roman: "X", icon: <FaBookOpen /> },
];

const Cards = () => {
  return (
    <div className="p-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-black mb-4">
        Syllabus & <span className="text-blue-600">Preparation</span>
      </h1>
      <p className="text-lg text-center text-gray-700 mt-4 mb-8">
        We provide a detailed syllabus for each subject to help students prepare effectively. Our resources include
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {standardsData.map((standard, index) => {
          const isBlue = index % 2 === 0; // Blue for even indices, white for odd
          return (
            <Link
              key={index}
              href={standard.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={`flex flex-col items-center justify-center h-48 w-full rounded-xl cursor-pointer transition duration-300 transform hover:-translate-y-3 hover:scale-105 shadow-lg hover:shadow-2xl ${
                  isBlue
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white text-blue-500 hover:bg-gray-100"
                }`}
              >
                {/* Icon */}
                <div className={`text-5xl mb-4 animate-pulse ${isBlue ? "text-white" : "text-blue-500"}`}>
                  {standard.icon}
                </div>

                {/* Roman Number Icon */}
                <div className={`text-3xl font-bold mb-2 ${isBlue ? "text-white" : "text-blue-500"}`}>
                  {standard.roman}
                </div>

                {/* Standard Title */}
                <p className={`text-lg font-semibold text-center ${isBlue ? "text-white" : "text-blue-500"}`}>
                  {standard.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
