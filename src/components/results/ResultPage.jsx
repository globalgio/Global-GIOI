"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import {
  FaTrophy,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaRedo,
  FaHome,
  FaStar,
  FaMedal,
  FaChartLine,
} from "react-icons/fa";

const Results = () => {
  const router = useRouter();
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [quizType, setQuizType] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const mockQuizResult = JSON.parse(
      localStorage.getItem("quizResult") || "{}"
    );
    const paidQuizResult = JSON.parse(
      localStorage.getItem("paidQuizResult") || "{}"
    );

    const mockTimestamp = mockQuizResult.timestamp || 0;
    const paidTimestamp = paidQuizResult.timestamp || 0;

    const latestQuiz =
      mockTimestamp > paidTimestamp ? mockQuizResult : paidQuizResult;

    if (!latestQuiz || !latestQuiz.type) {
      return;
    }

    setQuizType(latestQuiz.type);
    setScore(latestQuiz.score || 0);
    setTotal(latestQuiz.total || 0);
    setQuestions(latestQuiz.questions || []);
    setSelectedAnswers(latestQuiz.selectedAnswers || []);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < latestQuiz.score) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const downloadPDF = async () => {
    setIsDownloading(true);

    const motivationalTagline =
      (score / total) * 100 >= 90
        ? "Outstanding Performance! Keep up the fantastic work!"
        : (score / total) * 100 >= 75
        ? "Great Job! You're on the path to success!"
        : (score / total) * 100 >= 50
        ? "Good Effort! Keep pushing for greatness!"
        : "Don't give up! Every step is a step forward.";

    const doc = new jsPDF();

    try {
      const firstPageImg = new Image();
      await new Promise((resolve, reject) => {
        firstPageImg.onload = resolve;
        firstPageImg.onerror = reject;
        firstPageImg.src = "/resultpage.jpg";
      });

      const secondPageImg = new Image();
      await new Promise((resolve, reject) => {
        secondPageImg.onload = resolve;
        secondPageImg.onerror = reject;
        secondPageImg.src = "/resultsndpage.jpg";
      });

      doc.addImage(firstPageImg, "JPEG", 0, 0, 210, 297);

      doc.setFontSize(26);
      doc.setTextColor(0, 51, 102);
      doc.setFont("helvetica", "bold");
      doc.text(`Your Score: ${score} / ${total}`, 105, 130, {
        align: "center",
      });

      doc.setFontSize(18);
      doc.setFont("helvetica", "normal");
      doc.text(`Percentage: ${((score / total) * 100).toFixed(2)}%`, 105, 145, {
        align: "center",
      });

      doc.setFontSize(16);
      doc.setTextColor(0, 102, 0);
      doc.setFont("times", "italic");
      doc.text(motivationalTagline, 105, 165, { align: "center" });

      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text("Question Analysis", 105, 190, { align: "center" });

      let yPosition = 200;

      const addNewPage = () => {
        doc.addPage();
        doc.addImage(secondPageImg, "JPEG", 0, 0, 210, 297);
        yPosition = 30;
      };

      questions.forEach((question, index) => {
        if (yPosition > 270) addNewPage();

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text(`Q${index + 1}: ${question.question}`, 20, yPosition);
        yPosition += 10;

        doc.setTextColor(34, 139, 34);
        doc.text(`Correct Answer: ${question.answer}`, 30, yPosition);
        yPosition += 10;

        const userAnswer = selectedAnswers[index] || "Not Answered";
        const isCorrect = userAnswer === question.answer;
        doc.setTextColor(
          isCorrect ? 34 : 220,
          isCorrect ? 139 : 20,
          isCorrect ? 34 : 60
        );
        doc.text(`Your Answer: ${userAnswer}`, 30, yPosition);
        yPosition += 15;
      });

      doc.save("quiz-results.pdf");
      setIsDownloading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsDownloading(false);
    }
  };

  const getPerformanceLevel = () => {
    const percentage = (score / total) * 100;
    if (percentage >= 90)
      return { level: "Outstanding", color: "#FFD700", icon: <FaTrophy /> };
    if (percentage >= 75)
      return { level: "Excellent", color: "#10B981", icon: <FaMedal /> };
    if (percentage >= 60)
      return { level: "Good", color: "#00D4FF", icon: <FaStar /> };
    if (percentage >= 50)
      return { level: "Average", color: "#F59E0B", icon: <FaChartLine /> };
    return {
      level: "Needs Improvement",
      color: "#EF4444",
      icon: <FaChartLine />,
    };
  };

  if (score === null || total === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0066CC] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-[#2C3E50]">
            Loading results...
          </p>
        </div>
      </div>
    );
  }

  const performance = getPerformanceLevel();
  const percentage = ((score / total) * 100).toFixed(2);
  const correctAnswers = selectedAnswers.filter(
    (ans, idx) => ans === questions[idx]?.answer
  ).length;
  const incorrectAnswers = selectedAnswers.filter(
    (ans, idx) => ans && ans !== questions[idx]?.answer
  ).length;
  const unanswered = total - correctAnswers - incorrectAnswers;

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

          @keyframes trophy-bounce {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(10deg);
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

          .animate-trophy-bounce {
            animation: trophy-bounce 2s ease-in-out infinite;
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
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-in-up">
            <div className="inline-flex items-center gap-3 mb-6">
              <div
                className="text-6xl animate-trophy-bounce"
                style={{ color: performance.color }}
              >
                {performance.icon}
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] mb-4">
              {quizType === "mock" ? "Mock Test " : "Paid Test "}
              <span className="gradient-text animate-shimmer">Results</span>
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] mx-auto rounded-full mb-6"></div>

            <div
              className="inline-block px-8 py-3 bg-gradient-to-r from-[performance.color]/10 to-[performance.color]/5 rounded-full border-2"
              style={{ borderColor: performance.color }}
            >
              <p
                className="text-2xl font-bold"
                style={{ color: performance.color }}
              >
                {performance.level} Performance!
              </p>
            </div>
          </div>

          {/* Score Card */}
          <div className="animate-fade-in-up animation-delay-200 mb-12">
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] rounded-3xl blur-2xl opacity-30 animate-rotate-gradient"></div>

              <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border-4 border-white ring-4 ring-[#0066CC]/20">
                {/* Score Display */}
                <div className="text-center mb-8">
                  <h2
                    className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-4"
                    style={{ color: performance.color }}
                  >
                    {percentage}%
                  </h2>
                  <p className="text-2xl sm:text-3xl text-[#2C3E50] font-semibold">
                    {score} out of {total} Questions
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full bg-[#E5E7EB] rounded-full h-6 overflow-hidden mb-8">
                  <div
                    className="h-full bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="relative p-6 bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 rounded-2xl border-2 border-[#10B981]/30">
                    <div className="flex items-center gap-3 mb-2">
                      <FaCheckCircle className="text-3xl text-[#10B981]" />
                      <span className="text-4xl font-extrabold text-[#10B981]">
                        {correctAnswers}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#2C3E50]">
                      Correct Answers
                    </p>
                  </div>

                  <div className="relative p-6 bg-gradient-to-br from-[#EF4444]/10 to-[#EF4444]/5 rounded-2xl border-2 border-[#EF4444]/30">
                    <div className="flex items-center gap-3 mb-2">
                      <FaTimesCircle className="text-3xl text-[#EF4444]" />
                      <span className="text-4xl font-extrabold text-[#EF4444]">
                        {incorrectAnswers}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#2C3E50]">
                      Incorrect Answers
                    </p>
                  </div>

                  <div className="relative p-6 bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 rounded-2xl border-2 border-[#F59E0B]/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">⏭️</span>
                      <span className="text-4xl font-extrabold text-[#F59E0B]">
                        {unanswered}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#2C3E50]">
                      Unanswered
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Analysis */}
          <div className="animate-fade-in-up animation-delay-400 mb-12">
            <div className="relative max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-[#1A1A1A]">
                Question <span className="text-[#0066CC]">Analysis</span>
              </h2>

              <div className="space-y-6">
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.answer;
                  const isUnanswered = !userAnswer;

                  return (
                    <div key={index} className="relative">
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${
                          isCorrect
                            ? "from-[#10B981] to-[#059669]"
                            : isUnanswered
                            ? "from-[#F59E0B] to-[#D97706]"
                            : "from-[#EF4444] to-[#DC2626]"
                        } rounded-2xl blur-lg opacity-20`}
                      ></div>

                      <div
                        className="relative bg-white rounded-2xl shadow-xl p-6 border-2"
                        style={{
                          borderColor: isCorrect
                            ? "#10B981"
                            : isUnanswered
                            ? "#F59E0B"
                            : "#EF4444",
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                              isCorrect
                                ? "bg-[#10B981]"
                                : isUnanswered
                                ? "bg-[#F59E0B]"
                                : "bg-[#EF4444]"
                            }`}
                          >
                            {index + 1}
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">
                              {question.question}
                            </h3>

                            <div className="space-y-3">
                              <div
                                className={`p-4 rounded-xl border-2 ${
                                  isCorrect
                                    ? "bg-[#10B981]/10 border-[#10B981]"
                                    : isUnanswered
                                    ? "bg-[#F59E0B]/10 border-[#F59E0B]"
                                    : "bg-[#EF4444]/10 border-[#EF4444]"
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  {isCorrect ? (
                                    <FaCheckCircle className="text-[#10B981] text-xl" />
                                  ) : isUnanswered ? (
                                    <span className="text-xl">⏭️</span>
                                  ) : (
                                    <FaTimesCircle className="text-[#EF4444] text-xl" />
                                  )}
                                  <span className="font-bold text-[#1A1A1A]">
                                    Your Answer:
                                  </span>
                                </div>
                                <p
                                  className={`ml-7 font-semibold ${
                                    isCorrect
                                      ? "text-[#10B981]"
                                      : isUnanswered
                                      ? "text-[#F59E0B] italic"
                                      : "text-[#EF4444]"
                                  }`}
                                >
                                  {userAnswer || "Not Answered"}
                                </p>
                              </div>

                              <div className="p-4 rounded-xl bg-[#0066CC]/10 border-2 border-[#0066CC]">
                                <div className="flex items-center gap-2 mb-1">
                                  <FaCheckCircle className="text-[#0066CC] text-xl" />
                                  <span className="font-bold text-[#1A1A1A]">
                                    Correct Answer:
                                  </span>
                                </div>
                                <p className="ml-7 font-semibold text-[#0066CC]">
                                  {question.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="animate-fade-in-up animation-delay-600">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-lg rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#10B981]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isDownloading ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <FaDownload className="text-xl" />
                      <span>Download Results</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#059669] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() =>
                  quizType === "mock"
                    ? router.push("/gio-event/quiz")
                    : router.push("/gio-event/paid-quiz")
                }
                className="group relative px-8 py-4 bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] text-white font-bold text-lg rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#0066CC]/50 flex items-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaRedo className="text-xl" />
                  <span>Try Again</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4D9FFF] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() => router.push("/profile")}
                className="group relative px-8 py-4 bg-white text-[#0066CC] font-bold text-lg rounded-xl shadow-xl border-2 border-[#0066CC] overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#0066CC]/30 flex items-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                  <FaHome className="text-xl" />
                  <span>Return Home</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0066CC] to-[#00D4FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
