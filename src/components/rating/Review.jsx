import { useState, useEffect } from "react";

// Mock ReviewPopup component - replace with your actual component
const ReviewPopup = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-slide-in-up">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-gold-400 rounded-3xl blur-xl opacity-30 animate-pulse-slow"></div>

        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center"
          >
            ×
          </button>

          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
            Share Your Experience
          </h3>

          <p className="text-gray-700 mb-6">
            Help others by sharing your experience with us!
          </p>

          <div className="flex flex-col gap-3">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
              Leave Google Review
            </button>
            <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
              Share Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewPage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleActionCompletion = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setHasInteracted(true);
  };

  useEffect(() => {
    // In production, check localStorage here
    // const hasLeftGoogleReview = localStorage.getItem("hasLeftGoogleReview");
    // const hasSubmittedFeedback = localStorage.getItem("hasSubmittedFeedback");

    if (!hasInteracted) {
      const timer = setTimeout(() => setIsPopupVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-400 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
        {/* Content Card */}
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent animate-shimmer">
                Welcome to the
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-cyan-300 bg-clip-text text-transparent">
                  Review Page
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 to-cyan-400 rounded-full animate-expand-line"></span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Complete your action to share your valuable feedback with our
              community
            </p>
          </div>

          {/* Action Card */}
          <div className="relative animate-fade-in-up animation-delay-400">
            {/* Glow Border */}
            <div className="absolute -inset-5 bg-gradient-to-r from-blue-500 via-cyan-400 to-gold-400 rounded-3xl blur-2xl opacity-40 animate-rotate-gradient"></div>

            {/* Corner Decorations */}
            <div className="absolute -top-4 -left-4 w-14 h-14 border-t-[5px] border-l-[5px] border-gold-400 rounded-tl-3xl animate-pulse-slow z-20"></div>
            <div className="absolute -top-4 -right-4 w-14 h-14 border-t-[5px] border-r-[5px] border-cyan-400 rounded-tr-3xl animate-pulse-slow animation-delay-200 z-20"></div>
            <div className="absolute -bottom-4 -left-4 w-14 h-14 border-b-[5px] border-l-[5px] border-blue-500 rounded-bl-3xl animate-pulse-slow animation-delay-400 z-20"></div>
            <div className="absolute -bottom-4 -right-4 w-14 h-14 border-b-[5px] border-r-[5px] border-gold-400 rounded-br-3xl animate-pulse-slow animation-delay-600 z-20"></div>

            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-gray-800/90 via-blue-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-[5px] border-white/10 ring-4 ring-gold-400/30 shadow-2xl">
              {/* Content */}
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Ready to Share Your Experience?
                </h2>

                <p className="text-gray-300 max-w-md mx-auto">
                  Your feedback helps us improve and helps others make informed
                  decisions
                </p>

                {/* Action Button */}
                <button
                  onClick={handleActionCompletion}
                  className="group relative inline-flex items-center justify-center overflow-hidden"
                >
                  {/* Button Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                  {/* Button Content */}
                  <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/50">
                    <span className="flex items-center gap-2">
                      Complete Action
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  </div>
                </button>

                {/* Decorative Elements */}
                <div className="flex justify-center gap-2 mt-8">
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce-slow"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce-slow animation-delay-200"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-slow animation-delay-400"></div>
                </div>
              </div>

              {/* Floating Accent */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-gold-400 to-cyan-400 rounded-full opacity-60 blur-xl animate-float z-0"></div>
            </div>
          </div>

          {/* Stats/Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 animate-fade-in-up animation-delay-600">
            {[
              { number: "10K+", label: "Happy Users", icon: "👥" },
              { number: "4.9", label: "Average Rating", icon: "⭐" },
              { number: "99%", label: "Satisfaction", icon: "💯" },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${600 + index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center transform transition-all duration-300 group-hover:scale-105 group-hover:bg-white/10">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-gold-400 to-cyan-300 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Popup */}
      <ReviewPopup isVisible={isPopupVisible} onClose={handleClosePopup} />

      {/* Global Styles */}
      <style jsx global>{`
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

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
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

        @keyframes expand-line {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
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

        .animate-float {
          animation: float 9s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
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
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-rotate-gradient {
          animation: rotate-gradient 8s linear infinite;
        }
        .animate-expand-line {
          animation: expand-line 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: left;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .bg-gold-400 {
          background-color: #ffd700;
        }
        .border-gold-400 {
          border-color: #ffd700;
        }
        .ring-gold-400\/30 {
          --tw-ring-color: rgb(255 215 0 / 0.3);
        }
        .text-gold-400 {
          color: #ffd700;
        }
        .from-gold-400 {
          --tw-gradient-from: #ffd700;
        }
        .to-gold-400 {
          --tw-gradient-to: #ffd700;
        }
        .via-gold-300 {
          --tw-gradient-via: #ffe55c;
        }
      `}</style>
    </div>
  );
};

export default ReviewPage;
