"use client";
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  School,
  GraduationCap,
  Mail,
  Lock,
  User,
  Play,
} from "lucide-react";

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [principalName, setPrincipalName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const togglePasswordVisibility = (field) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!email || !password) {
      setMessage({
        type: "error",
        text: "Please fill in both email and password.",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setMessage({ type: "success", text: "Login successful!" });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (
      !schoolName ||
      !email ||
      !password ||
      !confirmPassword ||
      !principalName
    ) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setMessage({ type: "success", text: "Signup successful!" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#004C99] via-[#0066CC] to-[#1A1A1A] flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#00D4FF] rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#4D9FFF] rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg animate-fade-in-up">
        {/* Rotating Gradient Glow */}
        <div className="absolute -inset-5 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#4D9FFF] rounded-3xl blur-2xl opacity-40 animate-rotate-gradient"></div>

        {/* Main Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl border-[5px] border-white ring-4 ring-[#FFD700]/30 overflow-hidden">
          {/* Corner Decorations */}
          <div className="absolute -top-4 -left-4 w-16 h-16 border-t-[5px] border-l-[5px] border-[#FFD700] rounded-tl-3xl animate-pulse-slow z-20"></div>
          <div className="absolute -top-4 -right-4 w-16 h-16 border-t-[5px] border-r-[5px] border-[#00D4FF] rounded-tr-3xl animate-pulse-slow z-20"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-[5px] border-l-[5px] border-[#0066CC] rounded-bl-3xl animate-pulse-slow z-20"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-[5px] border-r-[5px] border-[#FFD700] rounded-br-3xl animate-pulse-slow z-20"></div>

          <div className="p-10">
            {/* Logo Section */}
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#00D4FF] rounded-full blur-xl opacity-60 animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-br from-[#0066CC] to-[#004C99] p-4 rounded-full shadow-lg">
                  <School className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Header Text */}
            <div className="text-center mb-8 animate-fade-in-up animation-delay-200">
              <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#0066CC] bg-clip-text text-transparent animate-shimmer">
                {activeTab === "login"
                  ? "Take Charge"
                  : "Activate Your School Dashboard"}
              </h1>
              <p className="text-lg text-[#2C3E50]">
                {activeTab === "login"
                  ? "Sign in to continue where you left off."
                  : "Sign up to manage your school data effortlessly."}
              </p>
            </div>

            {/* YouTube Link for Login */}
            {activeTab === "login" && (
              <div className="flex justify-center mb-6 animate-fade-in-up animation-delay-300">
                <a
                  href="https://www.youtube.com/watch?v=8dpts2MzKg4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[#0066CC] font-bold hover:text-[#FFD700] transition-colors duration-300"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch how it's done
                </a>
              </div>
            )}

            {/* Tab Buttons */}
            <div className="flex mb-8 bg-[#F5F7FA] rounded-xl p-1 animate-fade-in-up animation-delay-400">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white shadow-lg"
                    : "text-[#8B95A5] hover:text-[#0066CC]"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                  activeTab === "signup"
                    ? "bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white shadow-lg"
                    : "text-[#8B95A5] hover:text-[#0066CC]"
                }`}
              >
                Signup
              </button>
            </div>

            {/* Message Display */}
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-xl border-2 animate-fade-in ${
                  message.type === "error"
                    ? "bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]"
                    : "bg-[#10B981]/10 border-[#10B981] text-[#10B981]"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Login Form */}
            {activeTab === "login" && (
              <div className="space-y-5 animate-fade-in-up animation-delay-500">
                <div>
                  <label className="block text-[#2C3E50] font-bold mb-2 text-lg">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B95A5] w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-[#0066CC] rounded-xl focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 transition-all text-[#1A1A1A] text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2C3E50] font-bold mb-2 text-lg">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B95A5] w-5 h-5" />
                    <input
                      type={passwordVisible.password ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 border-2 border-[#0066CC] rounded-xl focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 transition-all text-[#1A1A1A] text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("password")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8B95A5] hover:text-[#0066CC] transition-colors"
                    >
                      {passwordVisible.password ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={isSubmitting}
                  className="group relative w-full bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#FFD700] text-[#1A1A1A] text-xl font-extrabold py-5 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Logging in..." : "Login"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            )}

            {/* Signup Form */}
            {activeTab === "signup" && (
              <div className="space-y-5 animate-fade-in-up animation-delay-500">
                <div>
                  <label className="block text-[#2C3E50] font-bold mb-2 text-lg">
                    School Name
                  </label>
                  <div className="relative">
                    <School className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B95A5] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Enter your school name"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-[#0066CC] rounded-xl focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 transition-all text-[#1A1A1A] text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2C3E50] font-bold mb-2 text-lg">
                    Principal Name
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B95A5] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Enter the principal's name"
                      value={principalName}
                      onChange={(e) => setPrincipalName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-[#0066CC] rounded-xl focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 transition-all text-[#1A1A1A] text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2C3E50] font-bold mb-2 text-lg">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B95A5] w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-[#0066CC] rounded-xl focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 transition-all text-[#1A1A1A] text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2C3E50] font-bold mb-2 text-lg">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B95A5] w-5 h-5" />
                    <input
                      type={passwordVisible.password ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 border-2 border-[#0066CC] rounded-xl focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 transition-all text-[#1A1A1A] text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("password")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8B95A5] hover:text-[#0066CC] transition-colors"
                    >
                      {passwordVisible.password ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#2C3E50] font-bold mb-2 text-lg">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B95A5] w-5 h-5" />
                    <input
                      type={
                        passwordVisible.confirmPassword ? "text" : "password"
                      }
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 border-2 border-[#0066CC] rounded-xl focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 transition-all text-[#1A1A1A] text-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8B95A5] hover:text-[#0066CC] transition-colors"
                    >
                      {passwordVisible.confirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSignup}
                  disabled={isSubmitting}
                  className="group relative w-full bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#FFD700] text-[#1A1A1A] text-xl font-extrabold py-5 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Creating Account..." : "Signup"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-25px, 25px) scale(0.9);
          }
          66% {
            transform: translate(35px, -15px) scale(1.1);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
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
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
        .animate-rotate-gradient {
          animation: rotate-gradient 8s linear infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default AuthForm;
