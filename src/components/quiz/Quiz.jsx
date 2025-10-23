"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { questionDistributions } from "@/utils/QuestionDistribution";

const Quiz = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isPaused, setIsPaused] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(45);
    }
  }, [currentQuestion, questions.length]);

  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Failed to enter full-screen mode:", err);
      });
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setWarning(true);
        setIsPaused(true);
        handleNext();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setWarning(true);
        setIsPaused(true);
        handleNext();
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleNext]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not logged in.");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/gio-profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile.");
        }

        const data = await response.json();
        setUserProfile(data.user);

        const rawStandard = data.user.standard;
        const standard = String(rawStandard).replace(/th$/, "");

        const distribution = questionDistributions[standard]?.subjects;
        if (!distribution) {
          throw new Error(
            `No question distribution found for standard: ${standard}`
          );
        }

        const allQuestions = [];
        for (const [subject, count] of Object.entries(distribution)) {
          const fetchUrl = `/questions/${standard}/${standard}_${subject}.json`;
          const res = await fetch(fetchUrl);
          const subjectQuestions = await res.json();

          const selectedQuestions = subjectQuestions
            .sort(() => 0.5 - Math.random())
            .slice(0, count);

          allQuestions.push(...selectedQuestions);
        }

        setQuestions(allQuestions.sort(() => 0.5 - Math.random()));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isPaused) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNext();
    }
  }, [timeLeft, isPaused, handleNext]);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const saveMockResults = async (score, total) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User is not logged in.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/save-quiz-marks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ score, total, type: "mock" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save mock test results.");
      }
    } catch (err) {
      console.error("Error saving mock test results:", err);
    }
  };

  const handleSubmit = async () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        score += 4;
      } else if (selectedAnswers[index]) {
        score -= 1;
      }
    });

    const percentageScore = ((score / (questions.length * 4)) * 100).toFixed(0);

    const resultData = {
      score,
      total: questions.length * 4,
      percentage: percentageScore,
      questions,
      selectedAnswers,
      type: "mock",
      timestamp: Date.now(),
    };

    localStorage.setItem("quizResult", JSON.stringify(resultData));
    await saveMockResults(score, questions.length * 4);
    router.push(`/gio-event/results`);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F7FA] to-[#E8F4FF]">
        <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-[#EF4444]/30 animate-fade-in-up">
          <p className="text-xl text-[#EF4444] font-bold">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!userProfile || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F7FA] to-[#E8F4FF]">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 border-4 border-[#0066CC] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-[#2C3E50] font-semibold">
            {!userProfile ? "Loading profile..." : "Loading questions..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#F5F7FA] via-[#FFFFFF] to-[#E8F4FF] py-8 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#0066CC] rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[#FFD700] rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Warning Modal */}
      {warning && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#1A1A1A]/90 to-[#0066CC]/30 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in">
          <div className="relative bg-gradient-to-br from-white to-[#FFF9E6] p-8 rounded-3xl shadow-2xl border-4 border-[#FFD700]/50 max-w-md animate-zoom-in">
            {/* Corner decorations */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-[#EF4444] rounded-tl-2xl animate-pulse-slow"></div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-[#EF4444] rounded-br-2xl animate-pulse-slow animation-delay-400"></div>

            <h2 className="text-3xl font-extrabold mb-4 text-[#EF4444] text-center">
              ⚠️ Warning!
            </h2>
            <p className="text-lg text-[#2C3E50] mb-6 text-center">
              Please return to the quiz to continue. Exiting full-screen or
              switching windows is not allowed.
            </p>
            <button
              onClick={() => {
                setWarning(false);
                setIsPaused(false);
                enterFullScreen();
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] hover:from-[#004C99] hover:to-[#0066CC] text-white rounded-2xl font-bold text-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              Continue Quiz
            </button>
          </div>
        </div>
      )}

      {/* Header Card */}
      <div className="relative w-full max-w-4xl bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border-4 border-[#FFD700]/30 mb-6 animate-slide-in-left z-10">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0066CC] via-[#FFD700] to-[#00D4FF] rounded-3xl blur-xl opacity-20 animate-rotate-gradient -z-10"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="relative">
              <div className="absolute -inset-2 bg-[#FFD700] rounded-full blur-lg opacity-50 animate-pulse-slow"></div>
              <Image
                src="/GIOLOGO.png"
                alt="QUIZ LOGO"
                width={48}
                height={48}
                className="h-12 w-12 mr-4 relative z-10"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-[#0066CC] via-[#4D9FFF] to-[#0066CC] bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                GLOBAL INNOVATOR OLYMPIAD
              </h1>
              <p className="text-sm text-[#2C3E50] font-semibold mt-1">
                Innovator:{" "}
                <span className="text-[#0066CC]">
                  {userProfile?.name || "User"}
                </span>
              </p>
              {userProfile?.schoolName && (
                <p className="text-sm text-[#2C3E50] mt-1">
                  School:{" "}
                  <span className="text-[#00D4FF]">
                    {userProfile.schoolName}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span
              className={`text-4xl font-extrabold ${
                timeLeft <= 10
                  ? "text-[#EF4444] animate-pulse"
                  : "text-[#FFD700]"
              }`}
            >
              {timeLeft}s
            </span>
            <span className="text-xs text-[#8B95A5] mt-1">Time Remaining</span>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div className="relative w-full h-3 mt-6 rounded-full bg-[#E8F4FF] overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / 45) * 100}%` }}
            transition={{ duration: 1 }}
            className={`h-full ${
              timeLeft <= 10
                ? "bg-gradient-to-r from-[#EF4444] to-[#FF6B6B]"
                : "bg-gradient-to-r from-[#0066CC] via-[#4D9FFF] to-[#00D4FF]"
            } shadow-lg`}
          />
        </motion.div>
      </div>

      {/* Question Card */}
      <div className="relative w-full max-w-4xl bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-4 border-[#0066CC]/20 animate-slide-in-right z-10">
        {/* Corner decorations */}
        <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#FFD700] rounded-tl-2xl animate-pulse-slow"></div>
        <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#00D4FF] rounded-br-2xl animate-pulse-slow animation-delay-400"></div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-[#1A1A1A]">
              Question{" "}
              <span className="text-[#0066CC]">{currentQuestion + 1}</span> of{" "}
              <span className="text-[#FFD700]">{questions.length}</span>
            </h2>
            <div className="px-4 py-2 bg-gradient-to-r from-[#0066CC]/10 to-[#00D4FF]/10 rounded-full border-2 border-[#0066CC]/30">
              <span className="text-sm font-bold text-[#0066CC]">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                Complete
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#F5F7FA] to-[#E8F4FF] p-6 rounded-2xl mb-6 border-2 border-[#0066CC]/10">
            <p className="text-lg text-[#2C3E50] font-medium leading-relaxed">
              {questions[currentQuestion].question}
            </p>
          </div>

          <ul className="space-y-4">
            {questions[currentQuestion].options.map((option, i) => (
              <li
                key={i}
                onClick={() => handleAnswer(option)}
                className={`relative p-5 rounded-2xl border-3 cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                  selectedAnswers[currentQuestion] === option
                    ? "bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] text-white border-[#0066CC] shadow-lg shadow-[#0066CC]/30 scale-102"
                    : "bg-white hover:bg-gradient-to-r hover:from-[#E8F4FF] hover:to-[#F5F7FA] border-[#0066CC]/20 hover:border-[#0066CC]/40 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      selectedAnswers[currentQuestion] === option
                        ? "bg-white text-[#0066CC]"
                        : "bg-[#E8F4FF] text-[#0066CC]"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-medium">{option}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-[#E8F4FF]">
          <button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
            className={`px-8 py-3 rounded-2xl font-bold text-lg shadow-lg transition-all duration-500 ${
              currentQuestion === questions.length - 1
                ? "bg-[#E8F4FF] text-[#8B95A5] cursor-not-allowed"
                : "bg-gradient-to-r from-[#8B95A5] to-[#2C3E50] text-white hover:scale-105 hover:shadow-xl"
            }`}
          >
            Next Question →
          </button>
          {currentQuestion === questions.length - 1 && (
            <button
              onClick={handleSubmit}
              className="relative px-8 py-3 rounded-2xl bg-gradient-to-r from-[#FFD700] to-[#FFE55C] text-[#1A1A1A] font-extrabold text-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#FFD700]/50 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 animate-shine"></span>
              <span className="relative z-10">🏆 Submit Quiz</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
