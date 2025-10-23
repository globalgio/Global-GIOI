import {
  FaHome,
  FaCheckCircle,
  FaShieldAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Terms = () => {
  return (
    <>
      <style>{`
        @layer utilities {
          @keyframes float {
            0%, 100% {
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
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(-35px, 25px) scale(1.08);
            }
            66% {
              transform: translate(25px, -25px) scale(0.92);
            }
          }

          @keyframes pulse-slow {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.08);
              opacity: 0.9;
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

          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-float {
            animation: float 8s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 9s ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }

          .animate-shimmer {
            background-size: 200% auto;
            animation: shimmer 3s linear infinite;
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
        }
      `}</style>

      {/* Header Section */}
      <div className="relative w-full bg-gradient-to-br from-[#0066CC] via-[#004C99] to-[#0066CC] py-20 sm:py-24 lg:py-28 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-10 left-20 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#00D4FF] rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6">
          {/* Icon Badge */}
          <div className="mb-6 w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#D4AF37] rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow">
            <FaShieldAlt className="text-white text-3xl" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
            TERMS AND CONDITIONS
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mt-2 font-medium max-w-3xl drop-shadow-md">
            Learn about the terms and conditions for GIO events and activities.
          </p>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm sm:text-base mt-6 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <a
              href="/"
              className="text-white hover:text-[#FFD700] transition-colors duration-300 flex items-center gap-2 font-semibold"
            >
              <FaHome className="text-[#FFD700]" />
              Home
            </a>
            <span className="text-white/60">/</span>
            <span className="text-[#00D4FF] font-bold">
              Terms and Conditions
            </span>
          </div>
        </div>

        {/* Decorative Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="px-6 sm:px-8 lg:px-12 xl:px-20 py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#F5F7FA] to-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#0066CC] to-[#004C99] bg-clip-text text-transparent">
              Terms and Conditions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#FFD700] rounded-full"></div>
          </div>

          {/* Terms List */}
          <ol className="space-y-6">
            {[
              {
                title: "Acceptance of Terms",
                content:
                  "By participating in the Global Innovator Olympiad (GIO), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not participate in the GIO.",
              },
              {
                title: "Eligibility",
                content:
                  "Participation in the GIO is open to students, teams, and individuals who meet the eligibility criteria outlined on our website. We reserve the right to disqualify any participant who does not meet these criteria.",
              },
              {
                title: "Registration",
                content:
                  "Participants must complete the registration process as described on our website. All information provided must be accurate and complete. The GIO reserves the right to reject any registration that is incomplete or incorrect.",
              },
              {
                title: "Code of Conduct",
                content:
                  "Participants are expected to conduct themselves in a professional and respectful manner. Any behavior that disrupts the event, violates the rules, or is deemed inappropriate by the GIO will result in disqualification.",
              },
              {
                title: "Intellectual Property",
                content:
                  "All materials, including but not limited to content, logos, and images provided by GIO, are the property of GIO or its licensors. Participants may not use these materials without prior written consent.",
              },
              {
                title: "Use of Data",
                content:
                  "By participating in the GIO, you consent to the collection and use of your data for purposes related to the event, including but not limited to marketing, promotional activities, and administrative purposes.",
              },
              {
                title: "Prizes and Awards",
                content:
                  "Details of prizes and awards will be provided as part of the competition rules. The GIO reserves the right to modify or cancel prizes if necessary.",
              },
              {
                title: "Liability",
                content:
                  "GIO is not liable for any damages or losses incurred by participants as a result of their participation in the event. Participants agree to indemnify and hold GIO harmless from any claims arising from their participation.",
              },
              {
                title: "Changes to Terms",
                content:
                  "GIO reserves the right to modify these Terms and Conditions at any time. Participants will be notified of any changes through our website or other communication channels.",
              },
              {
                title: "Governing Law",
                content:
                  "These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in India.",
              },
            ].map((term, index) => (
              <li
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-[#E5E7EB] hover:shadow-xl hover:border-[#00D4FF]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#0066CC] to-[#004C99] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
                        {term.title}
                      </h3>
                      <p className="text-base lg:text-lg text-[#2C3E50] leading-relaxed">
                        {term.content}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            {/* Contact Information */}
            <li className="animate-fade-in-up" style={{ animationDelay: "1s" }}>
              <div className="bg-gradient-to-br from-[#0066CC] to-[#004C99] rounded-2xl p-6 lg:p-8 shadow-2xl border border-white/20">
                <div className="flex items-start gap-4">
                  {/* Number Badge */}
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    11
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                      Contact Information
                    </h3>
                    <p className="text-base lg:text-lg text-white/90 leading-relaxed mb-4">
                      For any questions or concerns regarding these Terms and
                      Conditions, please contact us at:
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 space-y-3">
                      <div className="text-white font-bold text-lg">
                        Global Innovator Olympiad
                      </div>

                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-[#FFD700] text-xl flex-shrink-0" />
                        <a
                          href="mailto:globalinnovatorolympiad@gmail.com"
                          className="text-[#00D4FF] hover:text-[#FFD700] transition-colors duration-300 font-semibold break-all"
                        >
                          globalinnovatorolympiad@gmail.com
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <FaPhone className="text-[#FFD700] text-xl flex-shrink-0" />
                        <a
                          href="tel:+919594402916"
                          className="text-white hover:text-[#00D4FF] transition-colors duration-300 font-semibold"
                        >
                          +91 95944 02916
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Terms;
