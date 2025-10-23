"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaGlobe, FaUsers, FaArrowRight } from "react-icons/fa";

const Hero = () => {
  const router = useRouter();

  const handleRoute = () => {
    router.push("/gio-profile");
  };

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

          @keyframes slide-in-left {
            0% {
              opacity: 0;
              transform: translateX(-60px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slide-in-right {
            0% {
              opacity: 0;
              transform: translateX(60px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
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

          .animate-slide-in-left {
            animation: slide-in-left 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animate-slide-in-right {
            animation: slide-in-right 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

          .animation-delay-800 {
            animation-delay: 0.8s;
          }

          .hover-shine {
            position: relative;
            overflow: hidden;
          }

          .hover-shine::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            );
            transition: left 0.6s ease;
          }

          .hover-shine:hover::before {
            left: 200%;
          }
        }
      `}</style>

      <section className="relative bg-gradient-to-br from-[#0066CC] via-[#004C99] to-[#0066CC] py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D4FF] rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Section: Text Content */}
          <div className="w-full lg:w-1/2 animate-slide-in-left">
            <div className="space-y-8">
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
                <span className="text-white drop-shadow-lg">What's </span>
                <span className="bg-gradient-to-r from-[#FFD700] via-[#FFE55C] to-[#FFD700] bg-clip-text text-transparent animate-shimmer">
                  GIO?
                </span>
              </h1>

              {/* Feature List */}
              <ul className="space-y-5 lg:space-y-6">
                <li className="flex items-start gap-4 animate-fade-in-up animation-delay-200 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FaCheckCircle className="text-white text-lg" />
                  </div>
                  <span className="text-xl sm:text-2xl lg:text-3xl text-white font-bold pt-1">
                    Extensive Preparation Resources
                  </span>
                </li>

                <li className="flex items-start gap-4 animate-fade-in-up animation-delay-400 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#D4AF37] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FaUsers className="text-white text-lg" />
                  </div>
                  <span className="text-xl sm:text-2xl lg:text-3xl text-white font-bold pt-1">
                    Proven Reach and Participation
                  </span>
                </li>

                <li className="flex items-start gap-4 animate-fade-in-up animation-delay-600 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#00D4FF] to-[#0066CC] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FaGlobe className="text-white text-lg" />
                  </div>
                  <span className="text-xl sm:text-2xl lg:text-3xl text-white font-bold pt-1">
                    Global Presence
                  </span>
                </li>
              </ul>

              {/* CTA Button */}
              <div className="animate-fade-in-up animation-delay-800">
                <button
                  onClick={handleRoute}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-lg sm:text-xl rounded-full shadow-2xl shadow-green-500/30 hover:shadow-green-400/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-rotate-1 hover-shine group"
                >
                  Register Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Section: Logo Image */}
          <div className="w-full lg:w-1/2 animate-slide-in-right">
            <div className="relative max-w-lg mx-auto">
              {/* Rotating Gradient Glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#FFD700] rounded-3xl blur-2xl opacity-40 animate-rotate-gradient"></div>

              {/* Corner Decorations */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-[5px] border-l-[5px] border-[#FFD700] rounded-tl-3xl animate-pulse-slow z-20"></div>
              <div
                className="absolute -bottom-4 -right-4 w-16 h-16 border-b-[5px] border-r-[5px] border-[#00D4FF] rounded-br-3xl animate-pulse-slow z-20"
                style={{ animationDelay: "1.5s" }}
              ></div>

              {/* Main Logo Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#FFD700]/20 border-[5px] border-white ring-4 ring-[#FFD700]/30 transform transition-all duration-800 hover:scale-105 hover:rotate-1 hover:shadow-[#00D4FF]/40 bg-white">
                <div className="relative w-full aspect-square p-8">
                  <Image
                    src="/GIOLOGO.png"
                    alt="Global Innovator Olympiad Logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Floating Accent Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#D4AF37] rounded-full opacity-60 blur-xl animate-float z-0"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-[#00D4FF] to-[#0066CC] rounded-full opacity-70 blur-xl animate-float-delayed z-0"></div>

              {/* Decorative Dots */}
              <div className="absolute top-1/4 -right-12 flex flex-col gap-3 hidden lg:flex">
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

        {/* Decorative Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent"></div>
      </section>
    </>
  );
};

export default Hero;
