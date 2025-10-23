const Refund = () => {
  return (
    <>
      {/* Header Section */}
      <div className="relative w-full h-80 bg-gradient-to-br from-[#0066CC] via-[#004C99] to-[#0066CC] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-[#00D4FF] rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 animate-fade-in-up">
          <div className="mb-4 animate-fade-in animation-delay-200">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-6 animate-expand-line"></div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-white via-[#FFE55C] to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                  REFUND POLICY
                </span>
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl lg:text-2xl mt-4 font-medium max-w-3xl leading-relaxed animate-fade-in-up animation-delay-400">
            Learn about our refund policy for{" "}
            <span className="font-bold text-[#FFD700]">GIO</span> events and
            activities.
          </p>

          <div className="flex items-center gap-2 text-sm md:text-base mt-6 animate-fade-in animation-delay-600">
            <a
              href="/"
              className="text-white hover:text-[#FFD700] transition-colors duration-300 font-semibold"
            >
              Home
            </a>
            <span className="text-[#00D4FF]">/</span>
            <span className="text-[#FFD700] font-bold">Refund Policy</span>
          </div>

          {/* Decorative dots */}
          <div className="flex gap-2 mt-8 animate-fade-in animation-delay-600">
            <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-bounce-slow"></div>
            <div className="w-2 h-2 rounded-full bg-white animate-bounce-slow animation-delay-200"></div>
            <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-bounce-slow animation-delay-400"></div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="relative bg-gradient-to-br from-[#FFFFFF] via-[#F5F7FA] to-[#E8F4FF] px-6 sm:px-12 lg:px-20 py-12 md:py-20 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-40 right-20 w-96 h-96 bg-[#0066CC] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-20 w-[450px] h-[450px] bg-[#FFD700] rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Main Title */}
          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] mb-4">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#0066CC] via-[#4D9FFF] to-[#0066CC] bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                  Refund Policy
                </span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-[#FFD700]/30 to-transparent animate-expand-line"></span>
              </span>
            </h2>

            <div className="flex items-center gap-4 mt-6">
              <div className="relative w-24 h-1 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#0066CC] rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-white/50 animate-slide-shine"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FFD700] shadow-lg shadow-[#FFD700]/50 animate-bounce-slow"></div>
                <div className="w-2 h-2 rounded-full bg-[#0066CC] shadow-lg shadow-[#0066CC]/50 animate-bounce-slow animation-delay-200"></div>
                <div className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-lg shadow-[#00D4FF]/50 animate-bounce-slow animation-delay-400"></div>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="relative bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-3xl border-3 border-[#0066CC]/20 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up animation-delay-200">
            {/* Corner decorations */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-[#FFD700] rounded-tl-2xl animate-pulse-slow"></div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-[#00D4FF] rounded-br-2xl animate-pulse-slow animation-delay-400"></div>

            {/* Content */}
            <div className="space-y-8">
              {/* Policy Statement */}
              <div className="relative">
                <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-[#0066CC] to-[#00D4FF] rounded-full"></div>
                <p className="text-lg md:text-xl text-[#2C3E50] leading-relaxed">
                  At <span className="font-extrabold text-[#0066CC]">GIO</span>,
                  we maintain a{" "}
                  <span className="relative inline-block font-bold text-[#EF4444]">
                    strict no-refund policy
                    <span className="absolute bottom-0 left-0 w-full h-2 bg-[#EF4444]/20"></span>
                  </span>{" "}
                  once the registration is completed. This policy applies to all
                  our events and activities. We believe in providing clear and
                  comprehensive information about our offerings so that
                  participants can make informed decisions before committing to
                  registration.
                </p>
              </div>

              {/* Contact Information Card */}
              <div className="relative bg-gradient-to-br from-[#E8F4FF] to-[#FFF9E6] p-6 md:p-8 rounded-2xl border-2 border-[#FFD700]/30 shadow-lg">
                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-3 border-l-3 border-[#00D4FF] rounded-tl-xl animate-pulse-slow"></div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#0066CC] to-[#4D9FFF] flex items-center justify-center shadow-lg animate-pulse-slow">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0066CC] mb-3">
                      Need Help?
                    </h3>
                    <p className="text-lg md:text-xl text-[#2C3E50] leading-relaxed mb-3">
                      If you encounter any issues or have a pending payment,
                      please do not hesitate to contact us at:
                    </p>
                    <a
                      href="mailto:globalinnovatorolympiad@gmail.com"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] text-white rounded-xl font-bold text-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#0066CC]/50 group"
                    >
                      <svg
                        className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      globalinnovatorolympiad@gmail.com
                    </a>
                    <p className="text-base text-[#8B95A5] mt-4">
                      Our team is here to assist you with any payment-related
                      concerns and ensure a smooth experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Thank You Message */}
              <div className="relative">
                <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-[#FFD700] to-[#00D4FF] rounded-full"></div>
                <p className="text-lg md:text-xl text-[#2C3E50] leading-relaxed">
                  Thank you for your understanding and support. We appreciate
                  your participation in the{" "}
                  <span className="font-extrabold bg-gradient-to-r from-[#0066CC] via-[#4D9FFF] to-[#0066CC] bg-clip-text text-transparent">
                    Global Innovator Olympiad
                  </span>{" "}
                  and look forward to a rewarding and enriching event for all
                  involved.
                </p>
              </div>

              {/* Important Notice Badge */}
              <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-[#FFD700]/10 to-[#FFE55C]/10 rounded-2xl border-2 border-[#FFD700]/30">
                <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center animate-pulse-slow">
                  <span className="text-xl">⚠️</span>
                </div>
                <p className="text-base md:text-lg font-bold text-[#2C3E50]">
                  Please read carefully before completing your registration
                </p>
              </div>
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="mt-16 flex justify-center animate-fade-in animation-delay-800">
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-1 rounded-full ${
                    i % 3 === 0
                      ? "bg-[#0066CC]"
                      : i % 3 === 1
                      ? "bg-[#FFD700]"
                      : "bg-[#00D4FF]"
                  } animate-pulse-slow`}
                  style={{ animationDelay: `${i * 150}ms` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Refund;
