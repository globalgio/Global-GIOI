import { useState } from "react";

// Star SVG Component
const StarIcon = ({ filled, size = 30 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleClick = (starValue) => {
    setRating(starValue);
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  const activeRating = hover || rating;
  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Star Container */}
      <div className="relative">
        {/* Glow Effect */}
        {activeRating > 0 && (
          <div
            className="absolute inset-0 blur-xl opacity-40 animate-pulse-slow pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${
                activeRating >= 4
                  ? "#FFD700"
                  : activeRating >= 3
                  ? "#FFA500"
                  : "#FF6B6B"
              } 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Stars */}
        <div className="relative flex gap-2">
          {[...Array(5)].map((star, index) => {
            const starValue = index + 1;
            const isActive = starValue <= activeRating;
            const isHovered = starValue <= hover;

            return (
              <label key={index} className="relative cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  onClick={() => handleClick(starValue)}
                  className="hidden"
                />

                {/* Star Glow on Hover */}
                {isHovered && (
                  <div className="absolute inset-0 scale-150 blur-lg opacity-50 animate-pulse-glow pointer-events-none">
                    <StarIcon filled size={30} />
                  </div>
                )}

                {/* Main Star */}
                <div
                  className={`
                    relative transition-all duration-300 
                    ${isActive ? "scale-110" : "scale-100"}
                    ${clicked && starValue === rating ? "animate-star-pop" : ""}
                    group-hover:scale-125
                  `}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    color: isActive
                      ? starValue <= 2
                        ? "#EF4444" // Red for low ratings
                        : starValue <= 3
                        ? "#F59E0B" // Orange for medium
                        : starValue <= 4
                        ? "#FFD700" // Gold for good
                        : "#FFD700" // Bright gold for excellent
                      : "#D1D5DB", // Gray for inactive
                    filter: isActive
                      ? "drop-shadow(0 2px 8px currentColor)"
                      : "none",
                  }}
                >
                  <StarIcon filled={isActive} size={30} />
                </div>

                {/* Particle Effect on Click */}
                {clicked && starValue === rating && (
                  <>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-400 rounded-full animate-particle-up-1" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-400 rounded-full animate-particle-up-2" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-400 rounded-full animate-particle-up-3" />
                  </>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Rating Label */}
      {activeRating > 0 && (
        <div className="relative animate-fade-in-up">
          <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-gold-400 to-cyan-400" />
          <div className="relative text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-cyan-300 bg-clip-text text-transparent animate-shimmer">
              {ratingLabels[activeRating - 1]}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {activeRating} out of 5 stars
            </div>
          </div>
        </div>
      )}

      {/* Rating Description */}
      {rating > 0 && !hover && (
        <div className="text-center text-sm text-gray-500 animate-fade-in max-w-xs">
          {rating >= 4
            ? "Thank you! We're thrilled you had a great experience!"
            : rating === 3
            ? "Thanks for your feedback. We'll work to improve!"
            : "We're sorry to hear that. We'd love to make it right."}
        </div>
      )}

      {/* Global Styles */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes star-pop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.4) rotate(10deg);
          }
          100% {
            transform: scale(1.1) rotate(0deg);
          }
        }

        @keyframes particle-up-1 {
          0% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-30%, -30px) scale(0);
            opacity: 0;
          }
        }

        @keyframes particle-up-2 {
          0% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -40px) scale(0);
            opacity: 0;
          }
        }

        @keyframes particle-up-3 {
          0% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-70%, -30px) scale(0);
            opacity: 0;
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
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
        .animate-star-pop {
          animation: star-pop 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-particle-up-1 {
          animation: particle-up-1 0.6s ease-out forwards;
        }
        .animate-particle-up-2 {
          animation: particle-up-2 0.7s ease-out forwards;
        }
        .animate-particle-up-3 {
          animation: particle-up-3 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        .bg-gold-400 {
          background-color: #ffd700;
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

// Demo Component
const StarRatingDemo = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Main Card */}
      <div className="relative">
        {/* Glow Border */}
        <div className="absolute -inset-5 bg-gradient-to-r from-blue-500 via-cyan-400 to-gold-400 rounded-3xl blur-2xl opacity-40 animate-rotate-gradient" />

        {/* Card Content */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border-[5px] border-white/50 ring-4 ring-gold-400/30 max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-gold-500 bg-clip-text text-transparent">
                Rate Your Experience
              </span>
            </h2>
            <p className="text-gray-600">How would you rate our service?</p>
          </div>

          <StarRating rating={rating} setRating={setRating} />

          {rating > 0 && (
            <button
              onClick={() => alert(`You rated: ${rating} stars`)}
              className="mt-8 w-full group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform transition-all duration-300 group-hover:scale-105">
                Submit Rating
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Background Animations */}
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

        @keyframes rotate-gradient {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float 9s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-rotate-gradient {
          animation: rotate-gradient 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default StarRatingDemo;
