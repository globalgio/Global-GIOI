"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import axios from "axios";

const Quiz = ({ token }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isFinalSubmit, setIsFinalSubmit] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Fetch User Standard
  const fetchUserStandard = async (token) => {
    try {
      const storedToken = JSON.parse(localStorage.getItem("token") || "null");
      if (!storedToken) throw new Error("Token not found");

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/getUserStd`,
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      return data.std;
    } catch (error) {
      console.error("Error fetching user standard:", error);
      throw new Error("Failed to fetch user standard");
    }
  };

  // Fetch Questions based on Standard and Branch
  const fetchQuestions = async (std, branch) => {
    const fileName = `${std}/${std}_${branch}.json`;
    try {
      const response = await fetch(`/questions/${fileName}`);
      if (!response.ok) throw new Error(`Failed to fetch questions for ${branch}.`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching questions for ${branch}:`, error);
      throw error;
    }
  };

  const calculateQuestionsPerSubject = (std) => {
    return {
      English: 5,
      Mathematics: 5,
      Mental_ability: 5,
      Science: 5,
      Social_Science: 5,
    };
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const std = await fetchUserStandard(token);
        const questionCounts = calculateQuestionsPerSubject(std);
        const allQuestions = [];

        for (const [branch, count] of Object.entries(questionCounts)) {
          const questions = await fetchQuestions(std, branch);
          const selected = questions.slice(0, count); // Select the first 'count' questions
          allQuestions.push(...selected);
        }

        setSelectedQuestions(allQuestions);
        setUserAnswers(Array(allQuestions.length).fill(null));
        setTimeLeft(45);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    };

    loadQuestions();
  }, [token]);

  const handleOptionClick = (option) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!submitted && userAnswers[currentQuestionIndex]) {
      if (currentQuestionIndex === selectedQuestions.length - 1) {
        setIsFinalSubmit(true);
      } else {
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
          handleNextQuestion();
        }, 1000);
      }
    }
  };

  const handleNextQuestion = useCallback(() => {
    setTimeLeft(45);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }, []);

  const handleContinue = () => {
    setIsWarningVisible(false);
    setIsTimerPaused(false);
    handleNextQuestion();
  };

  const handleSkip = () => {
    if (currentQuestionIndex === selectedQuestions.length - 1) {
      setIsFinalSubmit(true);
    } else {
      handleNextQuestion();
    }
  };

  const calculateMarks = () => {
    return userAnswers.reduce((total, answer, index) => {
      if (answer === null) return total;
      return answer === selectedQuestions[index].answer ? total + 4 : total - 1;
    }, 0);
  };

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#2563EB] mb-4">Quiz Results</h2>
            <p className="text-lg mb-4">Score: {calculateMarks()} / {selectedQuestions.length * 4}</p>
            {selectedQuestions.map((question, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <p><strong>Question:</strong> {question.question}</p>
                <p><strong>Your Answer:</strong> {userAnswers[index] || "Skipped"}</p>
                <p><strong>Correct Answer:</strong> {question.answer}</p>
                <p><strong>Explanation:</strong> {question.explanation}</p>
                {userAnswers[index] === question.answer ? (
                  <p className="text-green-500 flex items-center"><CheckCircle2 className="mr-1" /> Correct!</p>
                ) : (
                  <p className="text-red-500 flex items-center"><XCircle className="mr-1" /> Incorrect!</p>
                )}
              </div>
            ))}
            <div className="space-x-4">
              <Button onClick={() => window.location.reload()} className="bg-[#2563EB] text-white hover:bg-blue-600">Try Again</Button>
              <Button onClick={() => window.location.href = "/gio-event"} className="bg-[#2563EB] text-white hover:bg-blue-600">Return to Page</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-[#2563EB]">Question {currentQuestionIndex + 1}</h2>
              <p className="text-lg mb-4">{currentQuestion?.question}</p>
            </div>
            <Progress value={(timeLeft / 45) * 100} className="mb-4" />
            <div className="space-y-3">
              {currentQuestion?.options.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full p-4 rounded-lg border border-[#2563EB] transition-colors ${userAnswers[currentQuestionIndex] === option ? 'bg-[#2563EB] text-white' : 'bg-white text-[#2563EB] hover:bg-[#2563EB] hover:text-white'}`}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <Button onClick={handleSkip} className="bg-gray-500 text-white hover:bg-gray-600">Skip</Button>
              <Button onClick={handleSubmit} className="bg-[#2563EB] text-white hover:bg-blue-600">Submit Answer</Button>
            </div>
          </>
        )}

        {/* Final Submission Modal */}
        {isFinalSubmit && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Submit Quiz</h2>
              <p className="mb-6">Are you sure you want to submit your answers?</p>
              <div className="space-x-4">
                <Button onClick={() => {
                  setSubmitted(true);
                  setIsFinalSubmit(false);
                  storeMarks();
                }} className="bg-[#2563EB] text-white hover:bg-blue-600">Submit</Button>
                <Button onClick={() => setIsFinalSubmit(false)} className="bg-gray-300 text-black hover:bg-gray-400">Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Animation Overlay */}
        {showAnimation && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <Clock className="animate-spin text-[#2563EB] text-4xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
