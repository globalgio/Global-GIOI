import Image from "next/image";

const Hero = () => {
  return (
    <>
      <style>{`
        @layer utilities {
          @keyframes slide-in-left {
            from {
              opacity: 0;
              transform: translateX(-60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slide-in-right {
            from {
              opacity: 0;
              transform: translateX(60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
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

          @keyframes expand-line {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }

          .animate-slide-in-left {
            animation: slide-in-left 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animate-slide-in-right {
            animation: slide-in-right 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

          .animate-expand-line {
            animation: expand-line 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

          .gradient-text {
            background: linear-gradient(90deg, #0066CC, #00D4FF, #FFD700, #00D4FF, #0066CC);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      `}</style>

      <section className="relative bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA] py-16 md:py-20 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#0066CC] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-[450px] h-[450px] bg-[#FFD700] rounded-full blur-3xl animate-float-delayed"></div>
          <div
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#00D4FF] rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Section: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left animate-slide-in-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-[#0066CC]/10 to-[#00D4FF]/10 rounded-full border border-[#0066CC]/20 animate-fade-in-up">
              <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse-slow"></div>
              <span className="text-sm font-semibold text-[#0066CC]">
                India's First AI-Powered Olympiad
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#1A1A1A] leading-tight mb-6">
              The Global Innovator <br />
              Olympiad{" "}
              <span className="relative inline-block">
                <span className="gradient-text animate-shimmer">(GIO)</span>
                {/* Animated Underline */}
                <span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] rounded-full animate-expand-line"
                  style={{ transformOrigin: "left" }}
                ></span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl lg:text-2xl text-[#2C3E50] leading-relaxed mb-8 animate-fade-in-up animation-delay-200">
              India's first{" "}
              <span className="font-bold text-[#0066CC]">
                AI-powered Olympiad
              </span>
              , offering students worldwide a chance to compete in{" "}
              <span className="font-semibold text-[#FFD700]">English</span>,{" "}
              <span className="font-semibold text-[#00D4FF]">Mathematics</span>,{" "}
              <span className="font-semibold text-[#10B981]">Science</span>,{" "}
              <span className="font-semibold text-[#8B5CF6]">
                Social Science
              </span>
              , and{" "}
              <span className="font-semibold text-[#F59E0B]">
                Mental Ability
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up animation-delay-400">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] text-white font-bold rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#0066CC]/50">
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4D9FFF] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group relative px-8 py-4 bg-white text-[#0066CC] font-bold rounded-xl shadow-xl border-2 border-[#0066CC] overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#0066CC]/30">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Learn More
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0066CC] to-[#00D4FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center md:justify-start mt-10 animate-fade-in-up animation-delay-600">
              <div className="text-center md:text-left">
                <div className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-[#0066CC] to-[#00D4FF] bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-sm text-[#8B95A5] font-medium">
                  Students Registered
                </div>
              </div>
              <div className="w-px bg-gradient-to-b from-transparent via-[#0066CC]/30 to-transparent"></div>
              <div className="text-center md:text-left">
                <div className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                  100+
                </div>
                <div className="text-sm text-[#8B95A5] font-medium">
                  Countries Participating
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Image */}
          <div className="w-full md:w-1/2 flex justify-center animate-slide-in-right">
            <div className="relative max-w-lg w-full">
              {/* Rotating Gradient Glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] rounded-3xl blur-2xl opacity-40 animate-rotate-gradient"></div>

              {/* Corner Decorations */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-[5px] border-l-[5px] border-[#FFD700] rounded-tl-3xl animate-pulse-slow z-20"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-[5px] border-r-[5px] border-[#00D4FF] rounded-br-3xl animate-pulse-slow z-20"></div>
              <div
                className="absolute -top-4 -right-4 w-16 h-16 border-t-[5px] border-r-[5px] border-[#0066CC] rounded-tr-3xl animate-pulse-slow z-20"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 border-b-[5px] border-l-[5px] border-[#10B981] rounded-bl-3xl animate-pulse-slow z-20"
                style={{ animationDelay: "0.3s" }}
              ></div>

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[5px] border-white ring-4 ring-[#FFD700]/30 transform transition-all duration-800 hover:scale-105 hover:rotate-1 hover:shadow-[0_35px_60px_-15px_rgba(255,215,0,0.4)]">
                <Image
                  src="/hero.png"
                  alt="Student reading a book"
                  width={500}
                  height={600}
                  className="object-contain w-full h-auto"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0066CC]/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Accent Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#D4AF37] rounded-full opacity-70 blur-xl animate-float z-0"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-br from-[#00D4FF] to-[#0066CC] rounded-full opacity-60 blur-2xl animate-float-delayed z-0"></div>

              {/* Decorative Badge */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#1A1A1A] px-6 py-3 rounded-full font-bold text-sm shadow-2xl z-30 animate-pulse-slow border-4 border-white">
                ✨ AI-Powered Platform
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
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
      </section>
    </>
  );
};

export default Hero;
