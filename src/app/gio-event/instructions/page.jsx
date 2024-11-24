import React from 'react';
import Link from 'next/link';

const Instructions = () => {
  return (
    <div className="container mx-auto mt-10 px-6">
      <h2 className="text-center text-3xl font-bold mb-8 text-[#0D1028]">
        📚 GIO Mock Test Instructions
      </h2>

      <div className="bg-[#E3F2FD] p-6 rounded-lg shadow-lg">
        {/* Exam Overview */}
        <h3 className="text-xl font-semibold text-[#0D1028] mb-4">1. 🖍 Exam Overview:</h3>
        <ul className="list-none space-y-2 text-[#0D1028] text-lg">
          <li>• The mock test consists of 25 questions designed to help you prepare for the Global Innovation Olympiad (GIO).</li>
          <li>• This test is free of charge and is intended for practice purposes only.</li>
          <li>• Each question is formatted as a multiple-choice question (MCQ) with four options to choose from.</li>
        </ul>

        {/* Exam Rules */}
        <h3 className="text-xl font-semibold text-[#0D1028] mt-8 mb-4">2. ⚖️ Exam Rules:</h3>
        <ul className="list-none space-y-2 text-[#0D1028] text-lg">
          <li>• Marking Scheme: +4 marks for correct answers, -1 mark for incorrect answers. ❗</li>
          <li>• ⏰ Time Limit: You will have 45 seconds per question to complete your responses.</li>
          <li>• 📊 Score Tracking: Your highest score will be recorded and compared to your previous attempts.</li>
        </ul>

        {/* Window Restrictions */}
        <h3 className="text-xl font-semibold text-[#0D1028] mt-8 mb-4">3. 🚫 Window Restrictions:</h3>
        <p className="text-[#0D1028] text-lg">
          While this is a practice test, we encourage you to simulate the exam environment. Try to stay focused and avoid navigating away from the test screen.
        </p>

        {/* Monitoring */}
        <h3 className="text-xl font-semibold text-[#0D1028] mt-8 mb-4">4. 👀 Monitoring:</h3>
        <p className="text-[#0D1028] text-lg">
          Ensure that you are in a distraction-free environment to mimic the real testing conditions and maintain focus throughout the test.
        </p>

        {/* Additional Notes */}
        <h3 className="text-xl font-semibold text-[#0D1028] mt-8 mb-4">5. 🌐 Additional Notes:</h3>
        <ul className="list-none space-y-2 text-[#0D1028] text-lg">
          <li>• Ensure you have a stable internet connection.</li>
          <li>• Use a desktop or laptop for the best experience.</li>
          <li>• We recommend disabling pop-up blockers to avoid interruptions during the test.</li>
        </ul>

        {/* Start Mock Test Button */}
        <div className="text-center mt-10">
          <Link href="/gio-event/quiz">
            <span className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#2563EB] transition duration-300 inline-block text-lg font-semibold">
              Start Mock Test
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
