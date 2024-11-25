"use client";

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
  const [timeLeft, setTimeLeft] = useState(45); // Timer for 45 seconds
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const [warning, setWarning] = useState(false); // Warning state

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(45); // Reset timer
    }
  }, [currentQuestion, questions.length]);

  // Enter full-screen mode (only user-initiated)
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Failed to enter full-screen mode:", err);
      });
    }
  };

  useEffect(() => {
    // Detect if user exits full-screen or switches windows
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
        const standard = rawStandard.replace(/th$/, "");

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
      handleNext(); // Automatically move to next question if time runs out
    }
  }, [timeLeft, isPaused, handleNext]);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    let score = 0;

    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        score += 4; // +4 for correct answers
      } else if (selectedAnswers[index]) {
        score -= 1; // -1 for incorrect answers
      }
    });

    const percentageScore = ((score / (questions.length * 4)) * 100).toFixed(0);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User is not authenticated.");
      }

      // Send the score to the backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/save-quiz-marks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the user's token
          },
          body: JSON.stringify({
            score: score,
            total: questions.length * 4,
            percentage: percentageScore,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save quiz marks.");
      }

      console.log("Quiz marks saved successfully.");
    } catch (error) {
      console.error("Error saving quiz marks:", error.message);
    }

    const queryString = new URLSearchParams({
      score: percentageScore,
      total: questions.length * 4,
      questions: JSON.stringify(questions),
      selectedAnswers: JSON.stringify(selectedAnswers),
    }).toString();

    router.push(`/gio-event/results?${queryString}`);
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userProfile) {
    return <p>Loading profile...</p>;
  }

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 px-4">
      {warning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Warning!</h2>
            <p className="text-gray-700 mb-4">
              Please return to the quiz to continue.
            </p>
            <button
              onClick={() => {
                setWarning(false);
                setIsPaused(false);
                enterFullScreen();
              }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Continue Quiz
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#2563EB]">Quiz</h1>
          <div className="flex items-center">
            <span className="text-[#FF2D55] font-semibold">{timeLeft}s</span>
          </div>
        </div>
        <motion.div className="relative w-full h-4 mt-4 rounded-full bg-gray-300 overflow-hidden shadow-md">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / 45) * 100}%` }} // Fixed the syntax error here
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300"
          />
        </motion.div>
      </div>

      <div className="w-full max-w-4xl mt-6 bg-white p-6 rounded-md shadow-md">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <p className="mt-4 text-gray-700">
            {questions[currentQuestion].question}
          </p>
          <ul className="mt-6 space-y-4">
            {questions[currentQuestion].options.map((option, i) => (
              <li
                key={i}
                onClick={() => handleAnswer(option)}
                className={`p-4 rounded-md border cursor-pointer transition-colors duration-200 ${
                  selectedAnswers[currentQuestion] === option
                    ? "bg-[#2563EB] text-white"
                    : "bg-white hover:bg-[#D6E9FF] hover:text-[#2563EB]"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Next
          </button>
          {currentQuestion === questions.length - 1 && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-md bg-[#FF2D55] hover:bg-[#E11D48] text-white"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
