import React from "react";
import {
  FaBrain,
  FaGlobe,
  FaChartLine,
  FaFileAlt,
  FaAward,
  FaLaptop,
  FaRecycle,
  FaMedal,
  FaUsers,
  FaTrophy,
  FaUser,
  FaRocket,
  FaLightbulb,
  FaBookOpen,
} from "react-icons/fa";

const cardData = [
  {
    title: "AI-Powered Learning",
    content:
      "AI-powered learning enhances education with personalized and adaptive experiences.",
    color: "blue",
    icon: <FaBrain />,
  },
  {
    title: "Global Participation",
    content:
      "Over 40 lakh students from 10+ countries participate, fostering diversity and competition.",
    color: "gold",
    icon: <FaGlobe />,
  },
  {
    title: "Focus on Skill Development",
    content:
      "We build skills in critical thinking, time management, and creative problem-solving.",
    color: "cyan",
    icon: <FaChartLine />,
  },
  {
    title: "Free Mock Tests",
    content: "Unlimited mock tests for better preparation!",
    color: "blue",
    icon: <FaFileAlt />,
  },
  {
    title: "10 Lakhs+ Practice Questions",
    content: "Ensuring students are well prepared for any challenge.",
    color: "gold",
    icon: <FaAward />,
  },
  {
    title: "Proven Success Record",
    content: "5.17 Lakhs students participated overall in 2024.",
    color: "cyan",
    icon: <FaMedal />,
  },
  {
    title: "Online Flexibility",
    content: "Allowing students to participate from anywhere.",
    color: "blue",
    icon: <FaLaptop />,
  },
  {
    title: "Motivational Awards",
    content:
      "Special recognition for students who show remarkable improvement.",
    color: "gold",
    icon: <FaMedal />,
  },
  {
    title: "Sustainable Learning",
    content:
      "Fully digital exam system that reduces paper usage, promoting an eco-friendly approach.",
    color: "cyan",
    icon: <FaRecycle />,
  },
  {
    title: "Instant Global Ranking",
    content: "See your performance worldwide in real-time.",
    color: "blue",
    icon: <FaTrophy />,
  },
  {
    title: "Unique Student Profile",
    content:
      "Every student gets a personalized profile to showcase their achievements and progress.",
    color: "gold",
    icon: <FaUser />,
  },
  {
    title: "Open to All Boards",
    content: "Students from any board can join and compete.",
    color: "cyan",
    icon: <FaUsers />,
  },
  {
    title: "Unmatched Global Reach",
    content: "Inspires millions of people.",
    color: "blue",
    icon: <FaRocket />,
  },
  {
    title: "Empowering Young Minds",
    content: "Shaping future excellence.",
    color: "gold",
    icon: <FaLightbulb />,
  },
  {
    title: "Free Subject Booklets",
    content: "Knowledge at no cost.",
    color: "cyan",
    icon: <FaBookOpen />,
  },
];

const getColorClasses = (color) => {
  const colors = {
    blue: {
      icon: "text-[#0066CC]",
      border: "border-[#0066CC]/20",
      shadow: "shadow-[#0066CC]/20",
      glow: "from-[#0066CC]/20 to-[#4D9FFF]/10",
      hover: "group-hover:shadow-[#0066CC]/40",
    },
    gold: {
      icon: "text-[#FFD700]",
      border: "border-[#FFD700]/20",
      shadow: "shadow-[#FFD700]/20",
      glow: "from-[#FFD700]/20 to-[#FFE55C]/10",
      hover: "group-hover:shadow-[#FFD700]/40",
    },
    cyan: {
      icon: "text-[#00D4FF]",
      border: "border-[#00D4FF]/20",
      shadow: "shadow-[#00D4FF]/20",
      glow: "from-[#00D4FF]/20 to-[#0066CC]/10",
      hover: "group-hover:shadow-[#00D4FF]/40",
    },
  };
  return colors[color];
};

const Unique = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#F5F7FA] via-[#FFFFFF] to-[#E8F4FF] py-20 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#0066CC] rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-[#FFD700] rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#00D4FF] rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] mb-4">
            The{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#0066CC] via-[#4D9FFF] to-[#0066CC] bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                Difference
              </span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-[#FFD700]/30 to-transparent animate-expand-line"></span>
            </span>{" "}
            We Make
          </h2>

          {/* Decorative accent */}
          <div className="flex items-center justify-center gap-4 mt-6 animate-fade-in animation-delay-300">
            <div className="relative w-24 h-1 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#0066CC] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-white/50 animate-slide-shine"></div>
            </div>
            <div className="flex gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700] shadow-lg shadow-[#FFD700]/50 animate-bounce-slow"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#0066CC] shadow-lg shadow-[#0066CC]/50 animate-bounce-slow animation-delay-200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#00D4FF] shadow-lg shadow-[#00D4FF]/50 animate-bounce-slow animation-delay-400"></div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cardData.map((card, index) => {
            const colorClasses = getColorClasses(card.color);
            const delay = `animation-delay-${Math.min(
              800,
              (index % 6) * 100 + 200
            )}`;

            return (
              <div
                key={index}
                className={`group relative flex flex-col items-center justify-start p-8 bg-white/80 backdrop-blur-sm rounded-2xl border-2 ${colorClasses.border} shadow-xl ${colorClasses.shadow} transition-all duration-800 hover:scale-105 hover:-translate-y-2 ${colorClasses.hover} animate-fade-in-up ${delay} opacity-0`}
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-br ${colorClasses.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-800 -z-10`}
                ></div>

                {/* Corner accent */}
                <div
                  className={`absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 ${colorClasses.border} rounded-tr-xl opacity-50 group-hover:opacity-100 transition-opacity duration-800`}
                ></div>

                {/* Icon */}
                <div
                  className={`text-6xl ${colorClasses.icon} mb-6 transform transition-all duration-800 group-hover:scale-110 group-hover:rotate-6`}
                >
                  {card.icon}
                </div>

                {/* Title */}
                <h3
                  className={`text-xl md:text-2xl font-bold mb-4 text-center ${colorClasses.icon} transition-colors duration-800`}
                >
                  {card.title}
                </h3>

                {/* Divider */}
                <div
                  className={`w-16 h-1 bg-gradient-to-r ${colorClasses.glow} rounded-full mb-4 transform transition-all duration-800 group-hover:w-24`}
                ></div>

                {/* Content */}
                <p className="text-base md:text-lg text-[#2C3E50] text-center leading-relaxed">
                  {card.content}
                </p>

                {/* Bottom accent dot */}
                <div
                  className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 ${colorClasses.icon} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-800 animate-pulse-slow`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 flex justify-center animate-fade-in animation-delay-600">
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-3 h-1 rounded-full ${
                  i % 3 === 0
                    ? "bg-[#0066CC]"
                    : i % 3 === 1
                    ? "bg-[#FFD700]"
                    : "bg-[#00D4FF]"
                } animate-pulse-slow`}
                style={{ animationDelay: `${i * 200}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unique;
