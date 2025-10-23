"use client";
import { useState, useEffect, useRef } from "react";
import StarRating from "../rating/StarRating";

const ReviewPopup = ({ isVisible, onClose }) => {
  const [rating, setRating] = useState(5); // Default to 5 stars
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const popupRef = useRef(null);

  // Prevent closing the popup by clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Do nothing to prevent closing
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        // Do nothing to prevent closing
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setError(null);

    if (rating >= 4) {
      // Redirect to Google Review page
      window.open(
        "https://g.page/r/CT3KgmMruLDAEAE/review", // Your direct review link
        "_blank"
      );
      onClose();
      // Set flag to prevent re-showing
      localStorage.setItem("hasLeftGoogleReview", "true");
      setIsSubmitting(false);
    } else if (rating < 4) {
      // Store internal feedback in localStorage
      try {
        const feedback = {
          rating,
          comment: comment || "",
          timestamp: new Date().toISOString(),
        };

        // Retrieve existing feedback or initialize
        const existingFeedback =
          JSON.parse(localStorage.getItem("internalFeedback")) || [];
        existingFeedback.push(feedback);
        localStorage.setItem(
          "internalFeedback",
          JSON.stringify(existingFeedback)
        );

        onClose();
        localStorage.setItem("hasSubmittedFeedback", "true");
      } catch (err) {
        console.error("Error storing feedback:", err);
        setError("Failed to submit feedback. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-[#1A1A1A]/80 via-[#0066CC]/20 to-[#1A1A1A]/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={popupRef}
        className="relative bg-gradient-to-br from-white via-[#F5F7FA] to-white rounded-3xl p-8 w-11/12 max-w-md shadow-2xl border-4 border-[#FFD700]/30 animate-zoom-in"
        role="document"
      >
        {/* Animated background glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#0066CC] via-[#FFD700] to-[#00D4FF] rounded-3xl blur-xl opacity-30 animate-rotate-gradient -z-10"></div>

        {/* Corner decorations */}
        <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-[#FFD700] rounded-tl-2xl animate-pulse-slow"></div>
        <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-[#0066CC] rounded-br-2xl animate-pulse-slow animation-delay-400"></div>

        {/* Header */}
        <div className="text-center mb-6 animate-fade-in-up">
          <h2
            id="review-popup-title"
            className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] mb-2"
          >
            How Was Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#0066CC] via-[#4D9FFF] to-[#0066CC] bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                Experience
              </span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FFD700]/30 animate-expand-line"></span>
            </span>
            ?
          </h2>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-4 animate-fade-in animation-delay-300">
            <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-[#00D4FF] rounded-full animate-pulse-slow"></div>
            <div className="w-2 h-2 rounded-full bg-[#0066CC] animate-bounce-slow"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00D4FF] to-[#0066CC] rounded-full animate-pulse-slow animation-delay-200"></div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="animate-fade-in-up animation-delay-200">
          <StarRating rating={rating} setRating={setRating} />
        </div>

        {/* Feedback textarea for low ratings */}
        {rating < 4 && (
          <div className="mt-6 animate-fade-in-up animation-delay-400">
            <textarea
              className="w-full p-4 border-2 border-[#0066CC]/30 rounded-2xl resize-none focus:outline-none focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-[#2C3E50] placeholder-[#8B95A5] bg-white/80 backdrop-blur-sm"
              placeholder="Please let us know how we can improve..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              aria-label="Feedback comment"
            />
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-[#EF4444]/10 border-2 border-[#EF4444]/30 rounded-xl animate-fade-in">
            <p className="text-[#EF4444] text-center font-semibold">{error}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className={`relative w-full mt-6 bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-500 overflow-hidden group ${
            isSubmitting || !rating
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-2xl hover:shadow-[#0066CC]/50 hover:scale-105"
          }`}
          disabled={isSubmitting || !rating}
        >
          {/* Button shine effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shine"></span>

          {/* Button content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                {rating >= 4 ? "⭐ Leave Google Review" : "📝 Submit Feedback"}
              </>
            )}
          </span>
        </button>

        {/* Helper text */}
        <p className="text-center text-sm text-[#8B95A5] mt-4 animate-fade-in animation-delay-600">
          {rating >= 4
            ? "Thank you! You'll be redirected to Google Reviews"
            : "Your feedback helps us improve our service"}
        </p>

        {/* Decorative bottom dots */}
        <div className="flex justify-center gap-2 mt-6 animate-fade-in animation-delay-600">
          <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse-slow"></div>
          <div className="w-2 h-2 rounded-full bg-[#0066CC] animate-pulse-slow animation-delay-200"></div>
          <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse-slow animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
