"use client";
import React, { useState, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaShieldAlt,
  FaCertificate,
  FaWhatsapp,
  FaInstagram,
  FaDownload,
} from "react-icons/fa";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const taglines = [
    "Believe in yourself and all that you are!",
    "Every step you take brings you closer to success.",
    "Your hard work will pay off; keep going!",
    "Dare to dream big and achieve greatness.",
    "The future belongs to those who prepare for it today.",
    "Mistakes are proof that you're trying.",
    "Education is the key to unlocking your potential.",
    "Great things never come from comfort zones.",
    "Your journey is your story. Make it amazing!",
    "Be fearless in the pursuit of what sets your soul on fire.",
    "Small steps lead to big results.",
    "You have the power to create a bright future.",
    "Learning is a treasure that will follow its owner everywhere.",
    "The harder you work, the luckier you get.",
    "Stay positive, work hard, and make it happen.",
  ];
  const [currentTagline, setCurrentTagline] = useState(taglines[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => {
        const currentIndex = taglines.indexOf(prev);
        const nextIndex = (currentIndex + 1) % taglines.length;
        return taglines[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVerificationStatus(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ certificateCode: certificateId }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Verification Failed. Please check the certificate number."
        );
      }

      const data = await response.json();

      setIsVerified(true);
      setVerificationStatus("Certificate Verified Successfully!");
      setCertificateData(data);
      generateCertificate(data);
    } catch (error) {
      console.error("Verification Error:", error.message);
      setIsVerified(false);
      setVerificationStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateCertificate = async (data) => {
    try {
      const templateUrl = "/GLOBAL INNOVATOR OLYMPIAD CERTIFICATE.pdf";
      const existingPdfBytes = await fetch(templateUrl).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      const nameX = 225;
      const nameY = 590;
      const schoolNameX = 230;
      const schoolNameY = 565;
      const globalRankX = 335;
      const globalRankY = 455;
      const countryRankX = 338;
      const countryRankY = 428;
      const stateRankX = 340;
      const stateRankY = 403;
      const certificateIdX = 310;
      const certificateIdY = 295;
      const dateX = 430;
      const dateY = 183;

      const name = data.name || "N/A";
      firstPage.drawText(name.toUpperCase(), {
        x: nameX,
        y: nameY,
        size: 18,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      const schoolName = data.schoolname || "N/A";
      firstPage.drawText(schoolName.toUpperCase(), {
        x: schoolNameX,
        y: schoolNameY,
        size: 16,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      const globalRank = data.rankings.global.rank || "N/A";
      firstPage.drawText(`#${globalRank}`, {
        x: globalRankX,
        y: globalRankY,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      const countryRank = data.rankings.country.rank || "N/A";
      firstPage.drawText(`#${countryRank}`, {
        x: countryRankX,
        y: countryRankY,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      const stateRank = data.rankings.state.rank || "N/A";
      firstPage.drawText(`#${stateRank}`, {
        x: stateRankX,
        y: stateRankY,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText((data.certificateCode || "N/A").toUpperCase(), {
        x: certificateIdX,
        y: certificateIdY,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      const formattedDate = `Date: ${new Date(
        data.timestamp
      ).toLocaleDateString()}`;
      firstPage.drawText(formattedDate, {
        x: dateX,
        y: dateY,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  return (
    <>
      <style>{`
        @layer utilities {
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

          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -30px) scale(1.05);
            }
            66% {
              transform: translate(-25px, 25px) scale(0.95);
            }
          }

          @keyframes float-delayed {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(-35px, 30px) scale(1.08);
            }
            66% {
              transform: translate(25px, -25px) scale(0.92);
            }
          }

          @keyframes pulse-slow {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.08);
              opacity: 0.8;
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

          @keyframes rotate-gradient {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes fade-slide {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes success-pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          .animate-slide-in-up {
            animation: slide-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animate-fade-in-up {
            opacity: 0;
            animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
            animation: shimmer 3s linear infinite;
          }

          .animate-rotate-gradient {
            animation: rotate-gradient 8s linear infinite;
          }

          .animate-fade-slide {
            animation: fade-slide 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .animate-success-pulse {
            animation: success-pulse 1s ease-in-out;
          }

          .animation-delay-200 {
            animation-delay: 0.2s;
          }

          .animation-delay-400 {
            animation-delay: 0.4s;
          }

          .animation-delay-600 {
            animation-delay: 0.6s;
          }

          .gradient-text {
            background: linear-gradient(90deg, #0066CC, #00D4FF, #FFD700, #00D4FF, #0066CC);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      `}</style>

      <section className="relative w-full bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA] py-16 md:py-20 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#0066CC] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#FFD700] rounded-full blur-3xl animate-float-delayed"></div>
          <div
            className="absolute top-1/2 left-1/2 w-[450px] h-[450px] bg-[#10B981] rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Main Card */}
          <div className="relative">
            {/* Rotating Gradient Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] rounded-3xl blur-2xl opacity-20 animate-rotate-gradient"></div>

            {/* Card Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-16 border-4 border-white ring-4 ring-[#0066CC]/20">
              {/* Header Section */}
              <div className="text-center mb-10 animate-slide-in-up">
                <div className="inline-flex items-center gap-3 mb-6">
                  <FaShieldAlt className="text-5xl text-[#0066CC] animate-pulse-slow" />
                  <FaCertificate
                    className="text-5xl text-[#FFD700] animate-pulse-slow"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] mb-4">
                  Certificate{" "}
                  <span className="gradient-text animate-shimmer">
                    Verification
                  </span>
                </h1>

                <div className="w-32 h-1 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] mx-auto rounded-full mb-6"></div>

                <p className="text-base sm:text-lg lg:text-xl text-[#2C3E50] max-w-2xl mx-auto">
                  Enter the{" "}
                  <span className="font-bold text-[#0066CC]">
                    Credential ID
                  </span>{" "}
                  to verify its authenticity and download your certificate.
                </p>
              </div>

              {/* Tagline Section */}
              <div className="text-center mb-8 animate-fade-in-up animation-delay-200">
                <div className="relative inline-block px-8 py-4 bg-gradient-to-r from-[#FFD700]/10 to-[#D4AF37]/10 rounded-2xl border-2 border-[#FFD700]/30">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse-slow"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse-slow"
                        style={{ animationDelay: "0.3s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-[#0066CC] animate-pulse-slow"
                        style={{ animationDelay: "0.6s" }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-lg sm:text-xl font-semibold text-[#1A1A1A] animate-fade-slide">
                    ✨ "{currentTagline}"
                  </p>
                </div>
              </div>

              {/* Video Link */}
              <div className="text-center mb-8 animate-fade-in-up animation-delay-400">
                <a
                  href="https://www.youtube.com/watch?v=yzqs5i_aASM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <span className="text-2xl">📹</span>
                  <span>Watch How to Verify</span>
                </a>
              </div>

              {/* Verification Form */}
              <div className="max-w-md mx-auto mb-8 animate-fade-in-up animation-delay-600">
                <div className="relative mb-6">
                  <label
                    htmlFor="certificateId"
                    className="block text-sm font-bold text-[#1A1A1A] mb-3"
                  >
                    Credential ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="certificateId"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      required
                      className="w-full px-5 py-4 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium"
                      placeholder="Enter your Credential ID"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <FaCertificate className="text-[#0066CC] text-xl" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleVerification}
                  className="group relative w-full py-4 bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] text-white font-bold rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#0066CC]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <FaShieldAlt />
                        <span>Verify Certificate</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4D9FFF] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Verification Status */}
              {verificationStatus && (
                <div
                  className={`text-center mb-8 animate-fade-in-up ${
                    isVerified ? "animate-success-pulse" : ""
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl border-3 ${
                      isVerified
                        ? "bg-[#10B981]/10 border-[#10B981] text-[#10B981]"
                        : "bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]"
                    }`}
                  >
                    {isVerified ? (
                      <FaCheckCircle className="text-3xl" />
                    ) : (
                      <FaTimesCircle className="text-3xl" />
                    )}
                    <span className="text-lg font-bold">
                      {verificationStatus}
                    </span>
                  </div>
                </div>
              )}

              {/* Certificate Preview */}
              {pdfUrl && (
                <div className="mt-10 animate-fade-in-up">
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#0066CC] rounded-2xl blur-xl opacity-30 animate-rotate-gradient"></div>
                    <iframe
                      src={pdfUrl}
                      width="100%"
                      height="600px"
                      className="relative rounded-2xl shadow-2xl border-4 border-white"
                      title="Certificate Preview"
                    ></iframe>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a
                      href={`https://wa.me/?text=Check out my certificate: ${pdfUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-6 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#25D366]/50 flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="text-2xl" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={pdfUrl}
                      download="Certificate.pdf"
                      className="group relative px-6 py-4 bg-gradient-to-r from-[#E4405F] to-[#C13584] text-white font-bold rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#E4405F]/50 flex items-center justify-center gap-2"
                    >
                      <FaInstagram className="text-2xl" />
                      <span>Instagram</span>
                    </a>

                    <a
                      href={pdfUrl}
                      download="Certificate.pdf"
                      className="group relative px-6 py-4 bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] text-white font-bold rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#0066CC]/50 flex items-center justify-center gap-2"
                    >
                      <FaDownload className="text-xl" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Security Badge */}
              <div className="mt-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 rounded-full border border-[#10B981]/30">
                  <FaShieldAlt className="text-[#10B981]" />
                  <span className="text-sm font-semibold text-[#10B981]">
                    Secure Verification System
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyCertificate;
