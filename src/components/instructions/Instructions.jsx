"use client";
import React from "react";
import Link from "next/link";
import {
  FaBookOpen,
  FaBalanceScale,
  FaBan,
  FaEye,
  FaGlobe,
  FaRocket,
  FaCheckCircle,
  FaClock,
  FaTrophy,
} from "react-icons/fa";

const Instructions = () => {
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

          .animation-delay-1000 {
            animation-delay: 1s;
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

      <div className="relative min-h-screen bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA] py-16 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#0066CC] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#FFD700] rounded-full blur-3xl animate-float-delayed"></div>
          <div
            className="absolute top-1/2 left-1/2 w-[450px] h-[450px] bg-[#10B981] rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-slide-in-up">
            <div className="inline-flex items-center gap-3 mb-6">
              <FaBookOpen className="text-5xl text-[#0066CC] animate-pulse-slow" />
              <FaTrophy
                className="text-5xl text-[#FFD700] animate-pulse-slow"
                style={{ animationDelay: "0.3s" }}
              />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] mb-4">
              GIO Mock Test{" "}
              <span className="gradient-text animate-shimmer">
                Instructions
              </span>
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] mx-auto rounded-full mb-6"></div>

            <p className="text-lg sm:text-xl lg:text-2xl text-[#2C3E50] max-w-4xl mx-auto leading-relaxed">
              Read carefully before starting your{" "}
              <span className="font-bold text-[#0066CC]">practice test</span>
            </p>
          </div>

          {/* Main Content Card */}
          <div className="animate-fade-in-up animation-delay-200">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] rounded-3xl blur-2xl opacity-20 animate-rotate-gradient"></div>

              <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-14 border-4 border-white ring-4 ring-[#0066CC]/20">
                {/* Section 1: Exam Overview */}
                <div className="mb-10 animate-fade-in-up animation-delay-400">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#0066CC] to-[#4D9FFF] flex items-center justify-center shadow-lg">
                      <FaBookOpen className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0066CC]">
                      Exam Overview
                    </h3>
                  </div>

                  <div className="space-y-4 pl-0 sm:pl-16">
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#0066CC]/5 to-transparent rounded-xl border-l-4 border-[#0066CC]">
                      <FaCheckCircle className="text-[#0066CC] text-xl flex-shrink-0 mt-1" />
                      <p className="text-base sm:text-lg text-[#2C3E50]">
                        The mock test consists of{" "}
                        <span className="font-bold text-[#0066CC]">
                          25 questions
                        </span>{" "}
                        designed to help you prepare for the Global Innovation
                        Olympiad (GIO).
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#10B981]/5 to-transparent rounded-xl border-l-4 border-[#10B981]">
                      <FaCheckCircle className="text-[#10B981] text-xl flex-shrink-0 mt-1" />
                      <p className="text-base sm:text-lg text-[#2C3E50]">
                        This test is{" "}
                        <span className="font-bold text-[#10B981]">
                          free of charge
                        </span>{" "}
                        and is intended for practice purposes only.
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#FFD700]/5 to-transparent rounded-xl border-l-4 border-[#FFD700]">
                      <FaCheckCircle className="text-[#FFD700] text-xl flex-shrink-0 mt-1" />
                      <p className="text-base sm:text-lg text-[#2C3E50]">
                        Each question is formatted as a{" "}
                        <span className="font-bold text-[#FFD700]">
                          multiple-choice question (MCQ)
                        </span>{" "}
                        with four options to choose from.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Exam Rules */}
                <div className="mb-10 animate-fade-in-up animation-delay-600">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center shadow-lg">
                      <FaBalanceScale className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFD700]">
                      Exam Rules
                    </h3>
                  </div>

                  <div className="space-y-4 pl-0 sm:pl-16">
                    <div className="relative p-6 bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 rounded-2xl border-2 border-[#10B981]/30">
                      <div className="flex items-start gap-3 mb-2">
                        <FaTrophy className="text-[#10B981] text-2xl flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-lg text-[#1A1A1A] mb-2">
                            Marking Scheme:
                          </h4>
                          <p className="text-base sm:text-lg text-[#2C3E50]">
                            <span className="font-bold text-[#10B981]">
                              +4 marks
                            </span>{" "}
                            for correct answers,{" "}
                            <span className="font-bold text-[#EF4444]">
                              -1 mark
                            </span>{" "}
                            for incorrect answers.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative p-6 bg-gradient-to-br from-[#00D4FF]/10 to-[#00D4FF]/5 rounded-2xl border-2 border-[#00D4FF]/30">
                      <div className="flex items-start gap-3 mb-2">
                        <FaClock className="text-[#00D4FF] text-2xl flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-lg text-[#1A1A1A] mb-2">
                            Time Limit:
                          </h4>
                          <p className="text-base sm:text-lg text-[#2C3E50]">
                            You will have{" "}
                            <span className="font-bold text-[#00D4FF]">
                              45 seconds
                            </span>{" "}
                            per question to complete your responses.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative p-6 bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5 rounded-2xl border-2 border-[#8B5CF6]/30">
                      <div className="flex items-start gap-3 mb-2">
                        <FaTrophy className="text-[#8B5CF6] text-2xl flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-lg text-[#1A1A1A] mb-2">
                            Score Tracking:
                          </h4>
                          <p className="text-base sm:text-lg text-[#2C3E50]">
                            Your highest score will be recorded and compared to
                            your previous attempts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Window Restrictions */}
                <div className="mb-10 animate-fade-in-up animation-delay-800">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#DC2626] flex items-center justify-center shadow-lg">
                      <FaBan className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#EF4444]">
                      Window Restrictions
                    </h3>
                  </div>

                  <div className="pl-0 sm:pl-16">
                    <div className="p-6 bg-gradient-to-r from-[#EF4444]/10 to-transparent rounded-xl border-l-4 border-[#EF4444]">
                      <p className="text-base sm:text-lg text-[#2C3E50] leading-relaxed">
                        While this is a practice test, we encourage you to{" "}
                        <span className="font-bold text-[#EF4444]">
                          simulate the exam environment
                        </span>
                        . Try to stay focused and avoid navigating away from the
                        test screen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Monitoring */}
                <div className="mb-10 animate-fade-in-up animation-delay-1000">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center shadow-lg">
                      <FaEye className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#8B5CF6]">
                      Monitoring
                    </h3>
                  </div>

                  <div className="pl-0 sm:pl-16">
                    <div className="p-6 bg-gradient-to-r from-[#8B5CF6]/10 to-transparent rounded-xl border-l-4 border-[#8B5CF6]">
                      <p className="text-base sm:text-lg text-[#2C3E50] leading-relaxed">
                        Ensure that you are in a{" "}
                        <span className="font-bold text-[#8B5CF6]">
                          distraction-free environment
                        </span>{" "}
                        to mimic the real testing conditions and maintain focus
                        throughout the test.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 5: Additional Notes */}
                <div className="mb-12 animate-fade-in-up animation-delay-1000">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-lg">
                      <FaGlobe className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#10B981]">
                      Additional Notes
                    </h3>
                  </div>

                  <div className="space-y-4 pl-0 sm:pl-16">
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#10B981]/5 to-transparent rounded-xl border-l-4 border-[#10B981]">
                      <FaCheckCircle className="text-[#10B981] text-xl flex-shrink-0 mt-1" />
                      <p className="text-base sm:text-lg text-[#2C3E50]">
                        Ensure you have a{" "}
                        <span className="font-bold text-[#10B981]">
                          stable internet connection
                        </span>
                        .
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#00D4FF]/5 to-transparent rounded-xl border-l-4 border-[#00D4FF]">
                      <FaCheckCircle className="text-[#00D4FF] text-xl flex-shrink-0 mt-1" />
                      <p className="text-base sm:text-lg text-[#2C3E50]">
                        Use a{" "}
                        <span className="font-bold text-[#00D4FF]">
                          desktop or laptop
                        </span>{" "}
                        for the best experience.
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#F59E0B]/5 to-transparent rounded-xl border-l-4 border-[#F59E0B]">
                      <FaCheckCircle className="text-[#F59E0B] text-xl flex-shrink-0 mt-1" />
                      <p className="text-base sm:text-lg text-[#2C3E50]">
                        We recommend{" "}
                        <span className="font-bold text-[#F59E0B]">
                          disabling pop-up blockers
                        </span>{" "}
                        to avoid interruptions during the test.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <div className="text-center">
                  <Link href="/gio-event/quiz">
                    <button className="group relative px-12 py-6 bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] text-white font-bold text-xl rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#0066CC]/50 flex items-center justify-center gap-3 mx-auto">
                      <span className="relative z-10 flex items-center gap-3">
                        <FaRocket className="text-2xl" />
                        <span>Start Mock Test</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4D9FFF] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </Link>
                </div>

                {/* Bottom Info */}
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700]/10 rounded-full border border-[#FFD700]/30">
                    <span className="text-2xl">🎯</span>
                    <span className="text-sm font-semibold text-[#2C3E50]">
                      Good luck on your practice test!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructions;
