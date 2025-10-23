"use client";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#E8F4FF] via-[#FFFFFF] to-[#FFF9E6] py-20 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#0066CC] rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[#FFD700] rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#00D4FF] rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
        {/* Left Section: Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-8 animate-slide-in-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.15] text-[#1A1A1A]">
            The Prestigious{" "}
            <span className="relative inline-block mt-2">
              <span className="relative z-10">Online Olympiad</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-gradient-to-r from-[#FFD700]/40 via-[#00D4FF]/30 to-transparent animate-expand-line"></span>
            </span>
            <br />
            <span className="block mt-3">Exams From</span>
            <br />
            <span className="relative inline-block bg-gradient-to-r from-[#0066CC] via-[#4D9FFF] to-[#0066CC] bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              Class V to X
            </span>
          </h1>

          <div className="animate-fade-in-up animation-delay-300">
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[#2C3E50] leading-relaxed max-w-2xl mx-auto md:mx-0">
              The{" "}
              <span className="font-extrabold text-[#0066CC] drop-shadow-sm">
                Global Innovator Olympiad (GIO)
              </span>
              , organized by{" "}
              <a
                href="https://www.isrc.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="relative font-extrabold text-[#00D4FF] hover:text-[#0066CC] transition-all duration-500 group"
              >
                <span className="relative z-10">ISRC</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] group-hover:w-full transition-all duration-500"></span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#FFD700]/20 blur-sm"></span>
              </a>
              , is an international competition where students apply creativity
              and problem-solving skills to real-world challenges.
            </p>
          </div>

          {/* Decorative accent line */}
          <div className="flex items-center justify-center md:justify-start gap-4 animate-fade-in animation-delay-500">
            <div className="relative w-20 h-1 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#0066CC] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-white/50 animate-slide-shine"></div>
            </div>
            <div className="flex gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700] shadow-lg shadow-[#FFD700]/50 animate-bounce-slow"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#0066CC] shadow-lg shadow-[#0066CC]/50 animate-bounce-slow animation-delay-200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#00D4FF] shadow-lg shadow-[#00D4FF]/50 animate-bounce-slow animation-delay-400"></div>
            </div>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end animate-slide-in-right">
          <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[550px] xl:max-w-[650px]">
            {/* Animated glow border - more prominent */}
            <div className="absolute -inset-6 bg-gradient-to-r from-[#FFD700] via-[#0066CC] to-[#00D4FF] rounded-3xl blur-3xl opacity-40 animate-rotate-gradient"></div>

            {/* Corner decorations - larger and more visible */}
            <div className="absolute -top-5 -left-5 w-16 h-16 border-t-[5px] border-l-[5px] border-[#FFD700] rounded-tl-3xl animate-pulse-slow z-20 shadow-lg shadow-[#FFD700]/30"></div>
            <div className="absolute -bottom-5 -right-5 w-16 h-16 border-b-[5px] border-r-[5px] border-[#0066CC] rounded-br-3xl animate-pulse-slow animation-delay-400 z-20 shadow-lg shadow-[#0066CC]/30"></div>

            {/* Main image with enhanced styling */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white ring-4 ring-[#FFD700]/30 transform transition-all duration-800 hover:scale-105 hover:rotate-1 hover:shadow-[0_30px_60px_rgba(0,102,204,0.3)]">
              <Image
                src="/hero.png"
                alt="Smiling student"
                width={750}
                height={900}
                layout="responsive"
                className="rounded-2xl object-cover"
              />

              {/* Overlay gradient on hover - more visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0066CC]/30 via-[#FFD700]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-800"></div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-800">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
              </div>
            </div>

            {/* Floating accent elements - larger and more colorful */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#FFE55C] rounded-full opacity-70 blur-2xl animate-float z-0 shadow-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-gradient-to-br from-[#00D4FF] to-[#0066CC] rounded-full opacity-60 blur-2xl animate-float-delayed z-0 shadow-2xl"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes expand-line {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
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

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(25px, -25px) scale(1.15);
          }
          66% {
            transform: translate(-25px, 25px) scale(0.85);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-35px, 35px) scale(1.15);
          }
          66% {
            transform: translate(35px, -35px) scale(0.85);
          }
        }

        @keyframes rotate-gradient {
          0% {
            transform: rotate(0deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1.1);
          }
        }

        @keyframes slide-shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }

        .animate-expand-line {
          animation: expand-line 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: left;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 9s ease-in-out infinite;
        }

        .animate-rotate-gradient {
          animation: rotate-gradient 10s linear infinite;
        }

        .animate-slide-shine {
          animation: slide-shine 2s ease-in-out infinite;
        }

        .animate-shine {
          animation: shine 3s ease-in-out infinite;
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
      `}</style>
    </div>
  );
};

export default Hero;
