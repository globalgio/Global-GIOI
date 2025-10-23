"use client";
import { useEffect, useState } from "react";
import { FaGlobeAmericas, FaGraduationCap, FaStar } from "react-icons/fa";

const Databanner = () => {
  const [stats, setStats] = useState({
    countries: 0,
    students: 0,
    schools: 0,
    tests: 0,
  });

  useEffect(() => {
    let countInterval;
    const animateNumbers = () => {
      const duration = 2000;
      const increment = (endValue) => endValue / (duration / 100);

      let currentCountries = 0;
      let currentSchools = 0;
      let currentStudents = 0;
      let currentTests = 0;

      countInterval = setInterval(() => {
        currentCountries += increment(10);
        currentSchools += increment(3887);
        currentStudents += increment(517343);
        currentTests += increment(4010231);

        if (currentCountries >= 10) currentCountries = 10;
        if (currentSchools >= 3887) currentSchools = 3887;
        if (currentStudents >= 517343) currentStudents = 517343;
        if (currentTests >= 4010231) currentTests = 4010231;

        setStats({
          countries: Math.floor(currentCountries),
          schools: Math.floor(currentSchools),
          students: Math.floor(currentStudents),
          tests: Math.floor(currentTests),
        });

        if (
          currentCountries === 10 &&
          currentSchools === 3887 &&
          currentStudents === 517343 &&
          currentTests === 4010231
        ) {
          clearInterval(countInterval);
        }
      }, 100);
    };

    animateNumbers();
    return () => clearInterval(countInterval);
  }, []);

  const formatNumber = (number) => {
    return number.toLocaleString("en-IN");
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

          @keyframes scale-in {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1);
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

          .animate-scale-in {
            animation: scale-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animation-delay-200 {
            animation-delay: 0.2s;
          }

          .animation-delay-400 {
            animation-delay: 0.4s;
          }

          .stat-card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .stat-card-hover:hover {
            transform: translateY(-8px) scale(1.02);
          }
        }
      `}</style>

      <section className="relative bg-gradient-to-br from-[#0066CC] via-[#004C99] to-[#0066CC] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-10 left-20 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#00D4FF] rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Stats Grid - 3 Equal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            {/* Box 1: Nations + Schools */}
            <div className="animate-scale-in">
              <div className="stat-card-hover relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Corner Bracket */}
                <div className="absolute -top-1 -right-1 w-12 h-12 border-t-[3px] border-r-[3px] border-[#FFD700] rounded-tr-2xl"></div>

                {/* Top Icon Circle */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#D4AF37] rounded-full flex items-center justify-center shadow-lg z-10">
                  <FaGlobeAmericas className="text-white text-lg" />
                </div>

                {/* Content */}
                <div className="pt-10 pb-8 px-6">
                  {/* First Stat */}
                  <div className="text-center mb-6">
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#FFD700] via-white to-[#FFD700] bg-clip-text text-transparent animate-shimmer leading-tight">
                      {stats.countries}+
                    </h3>
                    <p className="text-lg sm:text-xl font-bold text-white mt-2">
                      Nations
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto my-4"></div>

                  {/* Second Stat */}
                  <div className="text-center">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#00D4FF] via-white to-[#00D4FF] bg-clip-text text-transparent animate-shimmer leading-tight">
                      {formatNumber(stats.schools)}+
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-white mt-2">
                      Schools Collaborated
                    </p>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent rounded-full"></div>
              </div>
            </div>

            {/* Box 2: Students Last Year */}
            <div className="animate-scale-in animation-delay-200">
              <div className="stat-card-hover relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Corner Bracket */}
                <div className="absolute -top-1 -right-1 w-12 h-12 border-t-[3px] border-r-[3px] border-[#00D4FF] rounded-tr-2xl"></div>

                {/* Top Icon Circle */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-[#00D4FF] to-[#0066CC] rounded-full flex items-center justify-center shadow-lg z-10">
                  <FaGraduationCap className="text-white text-lg" />
                </div>

                {/* Content */}
                <div className="pt-10 pb-8 px-6 flex flex-col items-center justify-center min-h-[240px] sm:min-h-[260px]">
                  <div className="text-center">
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#FFD700] via-white to-[#FFD700] bg-clip-text text-transparent animate-shimmer leading-tight">
                      {formatNumber(stats.students)}+
                    </h3>
                    <p className="text-lg sm:text-xl font-bold text-white mt-3 px-2">
                      Students Joined Last Year
                    </p>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent rounded-full"></div>
              </div>
            </div>

            {/* Box 3: Total Impact */}
            <div className="animate-scale-in animation-delay-400">
              <div className="stat-card-hover relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Corner Bracket */}
                <div className="absolute -top-1 -right-1 w-12 h-12 border-t-[3px] border-r-[3px] border-[#FFD700] rounded-tr-2xl"></div>

                {/* Top Icon Circle */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#D4AF37] rounded-full flex items-center justify-center shadow-lg z-10">
                  <FaStar className="text-white text-lg" />
                </div>

                {/* Content */}
                <div className="pt-10 pb-8 px-6 flex flex-col items-center justify-center min-h-[240px] sm:min-h-[260px]">
                  <div className="text-center">
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#00D4FF] via-white to-[#00D4FF] bg-clip-text text-transparent animate-shimmer leading-tight">
                      {formatNumber(stats.tests)}+
                    </h3>
                    <p className="text-lg sm:text-xl font-bold text-white mt-3 px-2">
                      Total Students Impacted
                    </p>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent rounded-full"></div>
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

export default Databanner;
