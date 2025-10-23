import React from "react";
import Image from "next/image";

const BookNow = () => {
  return (
    <>
      <style>{`
        @layer utilities {
          /* Keyframe Animations */
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

          @keyframes rotate-gradient {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
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

          @keyframes shine {
            0% {
              left: -100%;
            }
            100% {
              left: 200%;
            }
          }

          /* Animation Classes */
          .animate-slide-in-left {
            animation: slide-in-left 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animate-slide-in-right {
            animation: slide-in-right 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animate-fade-in-up {
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

          .animate-rotate-gradient {
            animation: rotate-gradient 8s linear infinite;
          }

          .animate-shimmer {
            background-size: 200% auto;
            animation: shimmer 3s linear infinite;
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

          /* Hover Shine Effect */
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

      <div className="relative bg-gradient-to-br from-[#0066CC] via-[#004C99] to-[#0066CC] py-20 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D4FF] rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Section: Text Content */}
          <div className="w-full md:w-1/2 animate-slide-in-left">
            <div className="space-y-6">
              {/* Heading with Gradient Text */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="text-[#1A1A1A] drop-shadow-sm">
                  Let's Connect –
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-[#FFD700] to-white bg-clip-text text-transparent animate-shimmer">
                  We're Here to Help You
                </span>
              </h2>

              {/* Description Text */}
              <p className="text-lg sm:text-xl text-white/90 animate-fade-in-up animation-delay-200 max-w-xl">
                Ready to start your journey? Chat with us now and discover how
                we can make your experience exceptional.
              </p>

              {/* Chat Now Button */}
              <div className="animate-fade-in-up animation-delay-400">
                <a
                  href="https://wa.me/919594402916"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-lg rounded-full shadow-2xl shadow-green-500/30 hover:shadow-green-400/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-rotate-1 hover-shine group"
                >
                  <svg
                    className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Chat Now
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4 animate-fade-in-up animation-delay-600">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066CC] border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-[#F5F7FA] border-2 border-white"></div>
                  </div>
                  <span className="text-white/90 text-sm font-semibold">
                    1000+ Happy Clients
                  </span>
                </div>
                <div className="h-6 w-px bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFD700] text-2xl">★★★★★</span>
                  <span className="text-white/90 text-sm font-semibold">
                    5.0 Rating
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Image with Premium Effects */}
          <div className="w-full md:w-1/2 animate-slide-in-right">
            <div className="relative max-w-md mx-auto">
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
                <div className="relative w-full h-64 md:h-80">
                  <Image
                    src="/booknow.png"
                    alt="Smiling person ready to help"
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>

                {/* Let's Chat Badge */}
                <div className="absolute top-6 left-6 bg-gradient-to-r from-white to-[#F5F7FA] text-[#1A1A1A] px-5 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 animate-pulse-slow border-2 border-[#FFD700]">
                  <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
                  Let's Chat
                </div>

                {/* Decorative Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0066CC]/20 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Floating Accent Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#D4AF37] rounded-full opacity-60 blur-xl animate-float z-0"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-[#00D4FF] to-[#0066CC] rounded-full opacity-70 blur-xl animate-float-delayed z-0"></div>

              {/* Decorative Dots */}
              <div className="absolute top-1/4 -left-12 flex flex-col gap-3">
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

        {/* Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
      </div>
    </>
  );
};

export default BookNow;
