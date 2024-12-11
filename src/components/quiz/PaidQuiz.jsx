"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { questionDistributions } from "@/utils/QuestionDis2";

const PaidQuiz = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isPaused, setIsPaused] = useState(false);
  const [warning, setWarning] = useState(false);

  // Handle moving to the next question
  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(45); // Reset timer for the next question
    }
  }, [currentQuestion, questions.length]);

  // Enter full-screen mode
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Failed to enter full-screen mode:", err);
      });
    }
  };

  // Detect window switching or exiting fullscreen
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setWarning(true);
        setIsPaused(true);
        handleNext(); // Skip the question
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setWarning(true);
        setIsPaused(true);
        handleNext(); // Skip the question
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleNext]);

  // Fetch user profile and validate payment and test completion
  useEffect(() => {
    const validateUserAccess = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/gio-event/login");
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
        const { paymentStatus, testCompleted } = data.user;

        if (paymentStatus !== "paid_but_not_attempted") {
          router.push("/payment"); // Redirect to payment if not paid
        } else if (testCompleted) {
          router.push("/gio-event/results"); // Redirect to results if test completed
        } else {
          setUserProfile(data.user); // Allow access if everything is valid
        }
      } catch (err) {
        console.error(err.message);
        setError(err.message);
        router.push("/gio-event/login");
      }
    };

    validateUserAccess();
  }, [router]);

  // Fetch questions based on user's standard
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!userProfile) return;

      try {
        let rawStandard = userProfile.standard;
        console.log("Fetched standard:", rawStandard); // Debugging output

        // Ensure rawStandard is converted to a string
        if (typeof rawStandard !== "string") {
          rawStandard = rawStandard.toString();
        }

        // Remove 'th' suffix if present (useful for strings like "10th")
        const standard = rawStandard.replace(/th$/, "");

        const distribution = questionDistributions[standard]?.subjects;
        if (!distribution) {
          throw new Error(
            `No question distribution found for standard: ${standard}`
          );
        }

        const allQuestions = [];
        const totalQuestions = 100;
        let remainingQuestions = totalQuestions;

        for (const [subject, percentage] of Object.entries(distribution)) {
          const subjectCount = Math.floor((percentage / 100) * totalQuestions);
          const fetchUrl = `/questions/${standard}/${standard}_${subject}.json`;
          const res = await fetch(fetchUrl);
          const subjectQuestions = await res.json();

          const selectedQuestions = subjectQuestions
            .sort(() => 0.5 - Math.random())
            .slice(0, subjectCount);

          allQuestions.push(...selectedQuestions);
          remainingQuestions -= subjectCount;
        }

        if (remainingQuestions > 0) {
          const extraQuestions = allQuestions
            .sort(() => 0.5 - Math.random())
            .slice(0, remainingQuestions);
          allQuestions.push(...extraQuestions);
        }

        setQuestions(allQuestions.sort(() => 0.5 - Math.random()));
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchQuestions();
  }, [userProfile]);

  // Timer logic
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

  const saveLiveResults = async (score, total) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not logged in.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/save-quiz-marks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score,
            total,
            type: "live", // Distinguish between mock and live test
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save live quiz results.");
      }

      console.log("Live quiz results saved successfully.");
    } catch (err) {
      console.error("Error saving live quiz results:", err.message);
    }
  };

  const handleSubmit = async () => {
    let score = 0;

    // Calculate score
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        score += 4; // +4 for correct answers
      } else if (selectedAnswers[index]) {
        score -= 1; // -1 for incorrect answers
      }
    });

    const total = questions.length * 4;

    const resultData = {
      score,
      total,
      percentage: ((score / total) * 100).toFixed(0),
      questions,
      selectedAnswers,
      type: "live",
      timestamp: Date.now(),
    };

    saveLiveResults(score, total);

    localStorage.setItem("paidQuizResult", JSON.stringify(resultData));

    const token = localStorage.getItem("token");

    try {
      // Update payment status to "unpaid" after quiz submission to allow reattempt
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/update-payment-status`,
        {
          paymentStatus: "unpaid", // Set to "unpaid" to allow reattempt
          testCompleted: true, // Ensure test is marked as completed
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        console.log("Test completed successfully. Redirecting to results...");
        router.push(`/gio-event/results`); // Redirect to results page
      } else {
        console.error("Failed to update payment status.");
      }
    } catch (error) {
      console.error("Error resetting payment status:", error);
    }
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
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Image
              src="/GIOLOGO.png"
              alt="QUIZ LOGO"
              width={48}
              height={48}
              className="h-12 w-12 mr-4"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2563EB] text-center sm:text-left">
              GLOBAL INNOVATOR OLYMPIAD
            </h1>
          </div>
          <div className="flex items-center">
            <span className="text-[#FF2D55] font-semibold">{timeLeft}s</span>
          </div>
        </div>
        <motion.div className="relative w-full h-4 mt-4 rounded-full bg-gray-300 overflow-hidden shadow-md">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / 45) * 100}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300"
          ></motion.div>
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

export default PaidQuiz;
