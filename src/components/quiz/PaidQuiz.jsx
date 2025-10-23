"use client";

import { useEffect, useState, useCallback } from "react";

// Mock data for demo
const mockQuestions = [
  {
    question: "What is the primary function of mitochondria in a cell?",
    options: [
      "Protein synthesis",
      "Energy production (ATP)",
      "Cell division",
      "Waste removal",
    ],
    answer: "Energy production (ATP)",
    subject: "Science",
  },
  {
    question: "Which programming paradigm does JavaScript primarily support?",
    options: [
      "Object-oriented only",
      "Functional only",
      "Multi-paradigm (OOP, Functional, Procedural)",
      "Logic programming",
    ],
    answer: "Multi-paradigm (OOP, Functional, Procedural)",
    subject: "Computer Science",
  },
  {
    question: "What is the solution to the equation: 2x + 5 = 15?",
    options: ["x = 5", "x = 10", "x = 7", "x = 3"],
    answer: "x = 5",
    subject: "Mathematics",
  },
];

const PremiumQuiz = () => {
  const [questions] = useState(mockQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isPaused, setIsPaused] = useState(false);
  const [warning, setWarning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const userProfile = {
    name: "Alex Johnson",
    schoolName: "Innovation Academy",
  };

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(45);
    }
  }, [currentQuestion, questions.length]);

  const enterFullScreen = () => {
    setIsFullscreen(true);
    setWarning(false);
    setIsPaused(false);
  };

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !isPaused) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNext();
    }
  }, [timeLeft, isPaused, handleNext]);

  const handleAnswer = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        score += 4;
      } else if (selectedAnswers[index]) {
        score -= 1;
      }
    });

    alert(`Quiz Completed! Your score: ${score}/${questions.length * 4}`);
    setShowSubmitConfirm(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const timeProgress = (timeLeft / 45) * 100;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-400 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Warning Modal */}
      {warning && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-md w-full animate-slide-in-up">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-3xl blur-xl opacity-50 animate-pulse-slow"></div>

            <div className="relative bg-gradient-to-br from-white via-gray-50 to-red-50 rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-4">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
                  Warning!
                </h2>

                <p className="text-gray-700 mb-6">
                  You left the quiz window. The current question has been
                  skipped. Please stay focused to continue.
                </p>

                <button
                  onClick={enterFullScreen}
                  className="group relative w-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform transition-all duration-300 group-hover:scale-105">
                    Continue Quiz
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-md w-full animate-slide-in-up">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-cyan-400 to-blue-500 rounded-3xl blur-xl opacity-50 animate-rotate-gradient"></div>

            <div className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mb-4">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
                  Submit Quiz?
                </h2>

                <p className="text-gray-700 mb-2">
                  You've answered{" "}
                  <span className="font-bold text-blue-600">
                    {selectedAnswers.filter((a) => a).length}
                  </span>{" "}
                  out of <span className="font-bold">{questions.length}</span>{" "}
                  questions.
                </p>

                <p className="text-gray-600 text-sm mb-6">
                  Are you sure you want to submit your answers?
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSubmitConfirm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="group relative flex-1 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform transition-all duration-300 group-hover:scale-105">
                      Submit
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Card */}
          <div className="relative animate-fade-in">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-gold-400 rounded-2xl blur-lg opacity-30"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl blur-md opacity-50"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">GIO</span>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                      GLOBAL INNOVATOR OLYMPIAD
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-2 text-sm">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                        👤 {userProfile.name}
                      </span>
                      <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full font-medium">
                        🏫 {userProfile.schoolName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Time Left
                    </div>
                    <div
                      className={`text-3xl font-bold ${
                        timeLeft <= 10
                          ? "text-red-500 animate-pulse"
                          : "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                      }`}
                    >
                      {timeLeft}s
                    </div>
                  </div>
                  <div className="relative w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#E5E7EB"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke={timeLeft <= 10 ? "#EF4444" : "url(#gradient)"}
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 28 * (1 - timeProgress / 100)
                        }`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#2563EB" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Progress
                  </span>
                  <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {currentQuestion + 1} / {questions.length}
                  </span>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide-shine"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="relative animate-fade-in-up animation-delay-200">
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-gold-400 rounded-tl-2xl animate-pulse-slow z-20"></div>
            <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-cyan-400 rounded-tr-2xl animate-pulse-slow animation-delay-200 z-20"></div>

            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-gold-400 rounded-2xl blur-xl opacity-30 animate-rotate-gradient"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                    {currentQuestion + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Question {currentQuestion + 1}
                    </h2>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {questions[currentQuestion].subject}
                    </span>
                  </div>
                </div>

                <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
                  +4 marks
                </span>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 rounded-xl border-l-4 border-blue-500">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {questions[currentQuestion].question}
                </p>
              </div>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, i) => {
                  const isSelected =
                    selectedAnswers[currentQuestion] === option;
                  const optionLabels = ["A", "B", "C", "D"];

                  return (
                    <div
                      key={i}
                      onClick={() => handleAnswer(option)}
                      className={`group relative cursor-pointer transition-all duration-300 ${
                        isSelected ? "scale-[1.02]" : "hover:scale-[1.01]"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur-sm opacity-60"></div>
                      )}

                      <div
                        className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg"
                            : "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-800"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shrink-0 ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 group-hover:from-blue-200 group-hover:to-cyan-200"
                          }`}
                        >
                          {optionLabels[i]}
                        </div>

                        <span className="flex-1 font-medium">{option}</span>

                        {isSelected && (
                          <div className="shrink-0">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleNext}
                  disabled={currentQuestion === questions.length - 1}
                  className={`group relative px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                    currentQuestion === questions.length - 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 hover:scale-105 shadow-md hover:shadow-lg"
                  }`}
                >
                  Skip Question →
                </button>

                {currentQuestion === questions.length - 1 && (
                  <button
                    onClick={() => setShowSubmitConfirm(true)}
                    className="group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg transform transition-all duration-300 group-hover:scale-105 flex items-center gap-2">
                      Submit Quiz
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-gold-400 to-cyan-400 rounded-full opacity-60 blur-xl animate-float z-0"></div>
          </div>

          {/* Question Navigator */}
          <div className="relative animate-fade-in-up animation-delay-400">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-cyan-400/30 rounded-2xl blur"></div>

            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-10 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`aspect-square rounded-lg font-bold text-sm transition-all duration-300 hover:scale-110 ${
                      index === currentQuestion
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg ring-2 ring-blue-400 ring-offset-2"
                        : selectedAnswers[index]
                        ? "bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 border-2 border-green-300"
                        : "bg-gray-100 text-gray-600 border-2 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 mt-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-200"></div>
                  <span>Unanswered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
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
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-35px, 25px) scale(1.08);
          }
          66% {
            transform: translate(25px, -15px) scale(0.92);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.08);
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
        @keyframes rotate-gradient {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
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
        .animate-float {
          animation: float 9s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-rotate-gradient {
          animation: rotate-gradient 8s linear infinite;
        }
        .animate-slide-shine {
          animation: slide-shine 2s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .bg-gold-400 {
          background-color: #ffd700;
        }
        .border-gold-400 {
          border-color: #ffd700;
        }
        .from-gold-400 {
          --tw-gradient-from: #ffd700;
        }
        .to-gold-400 {
          --tw-gradient-to: #ffd700;
        }
      `}</style>
    </div>
  );
};

export default PremiumQuiz;
