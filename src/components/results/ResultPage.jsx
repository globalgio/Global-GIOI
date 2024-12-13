"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

const Results = () => {
  const router = useRouter();
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [quizType, setQuizType] = useState(null);

  useEffect(() => {
    // Retrieve both quiz results from localStorage
    const mockQuizResult = JSON.parse(
      localStorage.getItem("quizResult") || "{}"
    );
    const paidQuizResult = JSON.parse(
      localStorage.getItem("paidQuizResult") || "{}"
    );

    // Get timestamps
    const mockTimestamp = mockQuizResult.timestamp || 0;
    const paidTimestamp = paidQuizResult.timestamp || 0;

    // Determine the latest test based on the timestamp
    const latestQuiz =
      mockTimestamp > paidTimestamp ? mockQuizResult : paidQuizResult;

    if (!latestQuiz || !latestQuiz.type) {
      return; // No quiz data found
    }

    setQuizType(latestQuiz.type);
    setScore(latestQuiz.score || 0);
    setTotal(latestQuiz.total || 0);
    setQuestions(latestQuiz.questions || []);
    setSelectedAnswers(latestQuiz.selectedAnswers || []);

    // Simulate progress animation
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

  const downloadPDF = () => {
    const userName = localStorage.getItem("userName") || "Participant"; // Get user's name
    const organization = "Global Innovator Olympiad"; // Organization name

    const doc = new jsPDF();

    // Add a banner
    doc.setFillColor(38, 99, 235); // Blue color
    doc.rect(0, 0, 210, 30, "F"); // Fill a rectangle (full-width banner)
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255); // White text
    doc.text(organization, 105, 12, { align: "center" }); // Organization Name
    doc.setFontSize(14);
    doc.text(`Certificate of Achievement`, 105, 20, { align: "center" });

    // Add user name
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(`Awarded to: ${userName}`, 105, 40, { align: "center" });

    // Add a score summary
    doc.setFontSize(14);
    doc.text(`Score: ${score} / ${total}`, 10, 60);
    doc.text(`Percentage: ${((score / total) * 100).toFixed(2)}%`, 10, 70);

    // Add a divider
    doc.setDrawColor(0, 0, 0); // Black color
    doc.line(10, 75, 200, 75); // Draw a horizontal line

    // Add question analysis
    doc.setFontSize(12);
    doc.text("Question Analysis:", 10, 85);
    let yPosition = 95; // Initial Y-position for question analysis
    questions.forEach((question, index) => {
      doc.setTextColor(0, 0, 0); // Black text
      doc.text(`Q${index + 1}: ${question.question}`, 10, yPosition);
      yPosition += 10;

      // Correct Answer
      doc.setTextColor(34, 139, 34); // Green text
      doc.text(`Correct Answer: ${question.answer}`, 20, yPosition);
      yPosition += 10;

      // Your Answer
      const userAnswer = selectedAnswers[index] || "Not Answered";
      const isCorrect = userAnswer === question.answer;
      doc.setTextColor(
        isCorrect ? 34 : 220,
        isCorrect ? 139 : 20,
        isCorrect ? 34 : 60
      ); // Green for correct, Red for incorrect
      doc.text(`Your Answer: ${userAnswer}`, 20, yPosition);
      yPosition += 10;

      // Status
      doc.setTextColor(0, 0, 0); // Black text
      doc.text(`Status: ${isCorrect ? "Correct" : "Incorrect"}`, 20, yPosition);
      yPosition += 15;

      // Page Break
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 10;
      }
    });

    // Footer with branding
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128); // Gray text
    doc.text(`${organization} - Empowering Minds for Innovation`, 105, 290, {
      align: "center",
    });

    // Save the PDF
    doc.save(`${userName}-quiz-results.pdf`);
  };

  if (score === null || total === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading results...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-white flex flex-col items-center py-10 px-6">
      {/* Progress Section */}
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-[#2563EB] mb-8">
          {quizType === "mock" ? "Mock Test Results" : "Paid Test Results"}
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
            Score: <span className="text-[#2563EB]">{progress}%</span>
          </h2>
          <div className="relative w-full bg-gray-300 rounded-lg h-8 overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${(progress / total) * 100}%` }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300"
            ></motion.div>
          </div>
          <p className="mt-6 text-center text-gray-600">
            You scored <span className="font-semibold">{score}</span> out of{" "}
            <span className="font-semibold">{total}</span>
          </p>
        </div>
      </div>

      {/* Question Analysis */}
      <div className="w-full max-w-4xl mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#2563EB] mb-6 text-center">
          Question Analysis
        </h2>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-md bg-gradient-to-r from-white via-[#F3F4F6] to-[#E3F2FD]"
            >
              <h3 className="font-semibold text-gray-800 mb-3">
                Q{index + 1}. {question.question}
              </h3>
              <div className="mt-2 flex flex-col space-y-2">
                <p
                  className={`p-3 rounded-md font-medium ${
                    selectedAnswers[index] === question.answer
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <span className="font-semibold">Your Answer:</span>{" "}
                  {selectedAnswers[index] || (
                    <span className="text-gray-500 italic">Not Answered</span>
                  )}
                </p>
                <p className="p-3 rounded-md bg-blue-100 text-blue-600">
                  <span className="font-semibold">Correct Answer:</span>{" "}
                  {question.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download PDF Button */}
      <button
        onClick={downloadPDF}
        className="px-6 py-3 bg-[#4CAF50] text-white rounded-lg shadow mt-8 hover:bg-[#45A049] transition transform hover:scale-105"
      >
        Download Results as PDF
      </button>

      {/* Action Buttons */}
      <div className="flex space-x-6 mt-10">
        <button
          onClick={() =>
            quizType === "mock"
              ? router.push("/gio-event/quiz")
              : router.push("/gio-event/paid-quiz")
          }
          className="px-6 py-3 bg-[#2563EB] text-white rounded-lg shadow hover:bg-[#1D4ED8] transition transform hover:scale-105"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/profile")}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition transform hover:scale-105"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Results;
