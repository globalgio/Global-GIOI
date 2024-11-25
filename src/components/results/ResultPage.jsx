"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const Results = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ensure searchParams are handled only in client-side rendering
    const scoreParam = parseInt(searchParams?.get("score"), 10) || 0;
    const totalParam = parseInt(searchParams?.get("total"), 10) || 0;
    const questionsParam = JSON.parse(searchParams?.get("questions") || "[]");
    const selectedAnswersParam = JSON.parse(
      searchParams?.get("selectedAnswers") || "[]"
    );

    setScore(scoreParam);
    setTotal(totalParam);
    setQuestions(questionsParam);
    setSelectedAnswers(selectedAnswersParam);

    // Simulate progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < scoreParam) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 20);

    return () => clearInterval(interval);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-white flex flex-col items-center py-10 px-6">
      {/* Progress Section */}
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-[#2563EB] mb-8">
          Your Results
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

      {/* Action Buttons */}
      <div className="flex space-x-6 mt-10">
        <button
          onClick={() => router.push("/gio-event/quiz")}
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
