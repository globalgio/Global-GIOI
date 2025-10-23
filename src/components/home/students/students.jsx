import Image from "next/image";
import { FaGlobeAmericas } from "react-icons/fa";

const Students = () => {
  return (
    <>
      <style>{`
        @layer utilities {
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -30px) scale(1.05);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.95);
            }
          }

          @keyframes float-delayed {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(-35px, 25px) scale(1.08);
            }
            66% {
              transform: translate(25px, -25px) scale(0.92);
            }
          }

          @keyframes pulse-slow {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.08);
              opacity: 0.9;
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

          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
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
            background-size: 200% auto;
            animation: shimmer 3s linear infinite;
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animate-rotate-gradient {
            animation: rotate-gradient 8s linear infinite;
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
        }
      `}</style>

      <div className="relative bg-gradient-to-br from-[#0066CC] via-[#004C99] to-[#0066CC] py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D4FF] rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
              Learners
            </h2>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-4">
              <span className="text-white">Engaging </span>
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFE55C] to-[#FFD700] bg-clip-text text-transparent animate-shimmer">
                Worldwide
              </span>
            </h3>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Description */}
            <div className="animate-fade-in-up animation-delay-200">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/20 shadow-2xl">
                {/* Corner Decoration */}
                <div className="absolute -top-2 -right-2 w-14 h-14 border-t-4 border-r-4 border-[#FFD700] rounded-tr-2xl animate-pulse-slow"></div>

                <div className="space-y-6">
                  <p className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed">
                    The{" "}
                    <span className="font-extrabold bg-gradient-to-r from-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                      Global Innovator Olympiad (GIO)
                    </span>{" "}
                    showcases excellence, bringing together outstanding learners
                    from more than{" "}
                    <span className="font-bold text-[#00D4FF]">10 nations</span>
                    , uniting brilliance globally.
                  </p>

                  {/* Divider */}
                  <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#FFD700] rounded-full mx-0"></div>

                  {/* Countries List */}
                  <div className="space-y-3">
                    <p className="text-base sm:text-lg font-semibold text-white/90 flex items-center gap-2">
                      <FaGlobeAmericas className="text-[#00D4FF] text-xl" />
                      Participating Nations:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "India",
                        "Saudi Arabia",
                        "UAE",
                        "South Africa",
                        "Norway",
                        "Nepal",
                        "USA",
                        "Qatar",
                        "Kuwait",
                      ].map((country, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-[#00D4FF]/20 to-[#0066CC]/20 border border-[#00D4FF]/40 rounded-full text-white font-bold text-sm shadow-lg backdrop-blur-sm"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="animate-fade-in-up animation-delay-400">
              <div className="relative max-w-2xl mx-auto">
                {/* Rotating Gradient Glow */}
                <div className="absolute -inset-6 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#FFD700] rounded-3xl blur-2xl opacity-40 animate-rotate-gradient"></div>

                {/* Corner Decorations */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-[5px] border-l-[5px] border-[#FFD700] rounded-tl-3xl animate-pulse-slow z-20"></div>
                <div
                  className="absolute -bottom-4 -right-4 w-16 h-16 border-b-[5px] border-r-[5px] border-[#00D4FF] rounded-br-3xl animate-pulse-slow z-20"
                  style={{ animationDelay: "1.5s" }}
                ></div>

                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#FFD700]/20 border-[5px] border-white ring-4 ring-[#FFD700]/30 transform transition-all duration-800 hover:scale-105 hover:rotate-1 hover:shadow-[#00D4FF]/40">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="/student1.jpg"
                      alt="Student smiling and engaging in learning"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Decorative Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0066CC]/20 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Floating Accent Elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#D4AF37] rounded-full opacity-60 blur-xl animate-float z-0"></div>
                <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-[#00D4FF] to-[#0066CC] rounded-full opacity-70 blur-xl animate-float-delayed z-0"></div>

                {/* Decorative Dots */}
                <div className="absolute top-1/4 -right-12 flex flex-col gap-3">
                  <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-pulse-slow"></div>
                  <div
                    className="w-3 h-3 bg-[#00D4FF] rounded-full animate-pulse-slow"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-white rounded-full animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent"></div>
      </div>
    </>
  );
};

export default Students;
