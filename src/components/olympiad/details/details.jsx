import {
  FaAward,
  FaExclamationTriangle,
  FaClock,
  FaLaptop,
} from "react-icons/fa";

const cardData = [
  {
    title: "Marks",
    description: "Each question is worth 4 marks.",
    icon: <FaAward />,
    color: "#FFD700",
    gradient: "from-[#FFD700] to-[#D4AF37]",
  },
  {
    title: "Negative Marking",
    description: "1 mark will be deducted for every incorrect answer.",
    icon: <FaExclamationTriangle />,
    color: "#EF4444",
    gradient: "from-[#EF4444] to-[#DC2626]",
  },
  {
    title: "Time Limit",
    description: "You have 45 seconds to answer each question.",
    icon: <FaClock />,
    color: "#00D4FF",
    gradient: "from-[#00D4FF] to-[#0066CC]",
  },
  {
    title: "Mode",
    description:
      "The Olympiad is completely online, hosted on a secure AI-driven platform.",
    icon: <FaLaptop />,
    color: "#10B981",
    gradient: "from-[#10B981] to-[#059669]",
  },
];

const Details = () => {
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
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-15px) scale(1.1);
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

          .animation-delay-200 {
            animation-delay: 0.2s;
          }

          .animation-delay-400 {
            animation-delay: 0.4s;
          }

          .animation-delay-600 {
            animation-delay: 0.6s;
          }

          .animation-delay-800 {
            animation-delay: 0.8s;
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
            className="absolute top-1/2 left-1/2 w-[450px] h-[450px] bg-[#00D4FF] rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-16 animate-slide-in-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] mb-4">
              Olympiad{" "}
              <span className="gradient-text animate-shimmer inline-block">
                Details
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] mx-auto rounded-full"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cardData.map((card, index) => (
              <div
                key={index}
                className={`animate-fade-in-up animation-delay-${
                  (index + 1) * 200
                }`}
              >
                <div className="relative group h-full">
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-slow`}
                  ></div>

                  {/* Corner Decorations */}
                  <div
                    className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 rounded-tl-2xl z-20 animate-pulse-slow"
                    style={{ borderColor: card.color }}
                  ></div>
                  <div
                    className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 rounded-br-2xl z-20 animate-pulse-slow"
                    style={{ borderColor: card.color }}
                  ></div>

                  {/* Main Card */}
                  <div
                    className="relative flex flex-col items-center justify-center p-8 h-80 rounded-2xl bg-white shadow-2xl border-4 border-white ring-4 transition-all duration-500 transform group-hover:scale-105 group-hover:-rotate-1 overflow-hidden"
                    style={{
                      ringColor: `${card.color}40`,
                      boxShadow: `0 25px 50px -12px ${card.color}20`,
                    }}
                  >
                    {/* Background Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    ></div>

                    {/* Rotating Border Effect */}
                    <div
                      className={`absolute -inset-6 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 blur-2xl group-hover:opacity-30 animate-rotate-gradient`}
                    ></div>

                    {/* Icon with Animation */}
                    <div
                      className="relative text-7xl mb-6 group-hover:animate-bounce-icon transition-all duration-300 z-10"
                      style={{ color: card.color }}
                    >
                      {card.icon}

                      {/* Icon Glow */}
                      <div
                        className="absolute inset-0 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity"
                        style={{ color: card.color }}
                      >
                        {card.icon}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="relative text-center z-10">
                      <h3
                        className="text-2xl lg:text-3xl font-extrabold mb-4 text-[#1A1A1A] group-hover:scale-105 transition-transform duration-300"
                        style={{
                          textShadow: `0 0 20px ${card.color}30`,
                        }}
                      >
                        {card.title}
                      </h3>

                      {/* Animated Underline */}
                      <div className="relative inline-block mb-4">
                        <div
                          className="absolute -bottom-1 left-0 right-0 h-1 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                          style={{ backgroundColor: card.color }}
                        ></div>
                      </div>

                      <p className="text-sm lg:text-base text-[#2C3E50] leading-relaxed px-2">
                        {card.description}
                      </p>
                    </div>

                    {/* Decorative Dots */}
                    <div className="absolute top-6 right-6 flex gap-1.5 opacity-30 z-10">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse-slow"
                        style={{ backgroundColor: card.color }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-pulse-slow"
                        style={{
                          backgroundColor: card.color,
                          animationDelay: "0.3s",
                        }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-pulse-slow"
                        style={{
                          backgroundColor: card.color,
                          animationDelay: "0.6s",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Accent */}
          <div className="mt-16 flex justify-center gap-3 animate-fade-in-up animation-delay-800">
            <div className="w-3 h-3 rounded-full bg-[#0066CC] animate-pulse-slow"></div>
            <div
              className="w-3 h-3 rounded-full bg-[#FFD700] animate-pulse-slow"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-[#00D4FF] animate-pulse-slow"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
