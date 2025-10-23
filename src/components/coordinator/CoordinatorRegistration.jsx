"use client";

import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaWhatsapp,
  FaGlobe,
  FaMapMarkerAlt,
  FaCity,
  FaCheckCircle,
  FaUserShield,
} from "react-icons/fa";

const CoordinatorRegisterForm = () => {
  const router = useRouter();

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");

  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState)
    : [];

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const handleSameAsPhoneChange = () => {
    setSameAsPhone(!sameAsPhone);
    if (!sameAsPhone) {
      setWhatsappNumber(phoneNumber);
    } else {
      setWhatsappNumber("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    if (isLoginMode) {
      if (!email || !password) {
        setErrorMessage("Email and Password are required for login.");
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/coordinator/login`,
          { email, password }
        );
        localStorage.setItem("coordinatorToken", response.data.token);
        router.push("/coordinatorDashboard");
      } catch (error) {
        console.error("Login error:", error);
        if (error.response?.status === 403) {
          setErrorMessage("Your account is pending approval by admin.");
        } else {
          setErrorMessage(error.response?.data?.error || "Login failed");
        }
      }
    } else {
      if (
        !email ||
        !password ||
        !phoneNumber ||
        !whatsappNumber ||
        !selectedCountry ||
        !selectedState ||
        !selectedCity ||
        !name
      ) {
        setErrorMessage("All fields are required for registration.");
        return;
      }

      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters.");
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/coordinator/register`,
          {
            name,
            email,
            password,
            phoneNumber,
            whatsappNumber,
            country: Country.getCountryByCode(selectedCountry)?.name,
            state: State.getStateByCodeAndCountry(
              selectedState,
              selectedCountry
            )?.name,
            city: selectedCity,
          }
        );

        if (
          response.data &&
          response.data.data &&
          response.data.data.status === "pending"
        ) {
          setRegistrationSuccess(true);
          setRegistrationMessage(
            "Registration successful! Your account is pending approval by an administrator. You will receive a confirmation email once approved."
          );

          setName("");
          setEmail("");
          setPassword("");
          setPhoneNumber("");
          setWhatsappNumber("");
          setSelectedCountry("");
          setSelectedState("");
          setSelectedCity("");
          setSameAsPhone(false);

          localStorage.removeItem("coordinatorToken");
        } else {
          setErrorMessage(
            "Registration completed, but no pending status. Check server response."
          );
        }
      } catch (error) {
        console.error("Registration error:", error);
        setErrorMessage(error.response?.data?.error || "Registration failed");
      }
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

          @keyframes success-pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
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

          .animate-success-pulse {
            animation: success-pulse 1.5s ease-in-out infinite;
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

      <div className="relative w-full bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA] py-16 md:py-20 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden min-h-screen">
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
        <div className="relative z-10 max-w-6xl mx-auto">
          {registrationSuccess ? (
            <div className="animate-slide-in-up">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#10B981] via-[#00D4FF] to-[#10B981] rounded-3xl blur-2xl opacity-30 animate-rotate-gradient"></div>

                <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 border-4 border-white ring-4 ring-[#10B981]/30">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full mb-6 animate-success-pulse">
                      <FaCheckCircle className="text-5xl text-white" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] mb-6">
                      Registration{" "}
                      <span className="gradient-text animate-shimmer">
                        Successful!
                      </span>
                    </h2>

                    <div className="w-32 h-1 bg-gradient-to-r from-[#10B981] via-[#00D4FF] to-[#10B981] mx-auto rounded-full mb-8"></div>

                    <p className="text-lg sm:text-xl lg:text-2xl text-[#2C3E50] max-w-2xl mx-auto mb-10 leading-relaxed">
                      {registrationMessage}
                    </p>

                    <button
                      onClick={() => router.push("/coordinator")}
                      className="group relative px-10 py-5 bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] text-white font-bold text-xl rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#0066CC]/50"
                    >
                      <span className="relative z-10">Go to Login</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4D9FFF] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Header Section */}
              <div className="text-center mb-12 animate-slide-in-up">
                <div className="inline-flex items-center gap-3 mb-6">
                  <FaUserShield className="text-5xl text-[#0066CC] animate-pulse-slow" />
                  <FaCheckCircle
                    className="text-5xl text-[#FFD700] animate-pulse-slow"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] mb-4">
                  {isLoginMode ? (
                    <>
                      Coordinator{" "}
                      <span className="gradient-text animate-shimmer">
                        Login
                      </span>
                    </>
                  ) : (
                    <>
                      Join as a Global{" "}
                      <span className="gradient-text animate-shimmer">
                        Olympiad Mentor
                      </span>
                    </>
                  )}
                </h1>

                <div className="w-32 h-1 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] mx-auto rounded-full mb-6"></div>

                {!isLoginMode && (
                  <p className="text-lg sm:text-xl lg:text-2xl text-[#2C3E50] max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
                    Are you a{" "}
                    <span className="font-bold text-[#0066CC]">Teacher</span>,{" "}
                    <span className="font-bold text-[#FFD700]">Principal</span>,{" "}
                    <span className="font-bold text-[#10B981]">Headmaster</span>
                    , or{" "}
                    <span className="font-bold text-[#00D4FF]">
                      Social Worker
                    </span>
                    ? Join us as a Global Innovator Olympiad Coordinator!
                  </p>
                )}
              </div>

              {/* Form Card */}
              <div className="animate-fade-in-up animation-delay-400">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] rounded-3xl blur-2xl opacity-20 animate-rotate-gradient"></div>

                  <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-14 border-4 border-white ring-4 ring-[#0066CC]/20">
                    {/* Error/Info Messages */}
                    {errorMessage && (
                      <div className="mb-6 p-4 bg-[#EF4444]/10 border-2 border-[#EF4444] rounded-xl flex items-center gap-3">
                        <span className="text-2xl">⚠️</span>
                        <p className="text-[#EF4444] font-semibold">
                          {errorMessage}
                        </p>
                      </div>
                    )}
                    {infoMessage && (
                      <div className="mb-6 p-4 bg-[#10B981]/10 border-2 border-[#10B981] rounded-xl flex items-center gap-3">
                        <FaCheckCircle className="text-2xl text-[#10B981]" />
                        <p className="text-[#10B981] font-semibold">
                          {infoMessage}
                        </p>
                      </div>
                    )}

                    {!isLoginMode && (
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-10 text-[#0066CC]">
                        Personal Details
                      </h2>
                    )}

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {!isLoginMode && (
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="block font-bold text-lg text-[#1A1A1A] mb-2"
                          >
                            Your Name
                          </label>
                          <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-xl" />
                            <input
                              type="text"
                              id="name"
                              placeholder="Enter your full name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full pl-12 pr-4 py-4 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black"
                            />
                          </div>
                        </div>
                      )}

                      <div className="relative">
                        <label
                          htmlFor="email"
                          className="block font-bold text-lg text-[#1A1A1A] mb-2"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-xl" />
                          <input
                            type="email"
                            id="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label
                          htmlFor="password"
                          className="block font-bold text-lg text-[#1A1A1A] mb-2"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-xl" />
                          <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black"
                          />
                        </div>
                        {!isLoginMode && (
                          <p className="mt-2 text-sm text-[#8B95A5]">
                            Minimum 8 characters required
                          </p>
                        )}
                      </div>

                      {!isLoginMode && (
                        <>
                          <div className="relative">
                            <label
                              htmlFor="contact"
                              className="block font-bold text-lg text-[#1A1A1A] mb-2"
                            >
                              Phone Number
                            </label>
                            <div className="relative">
                              <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-xl" />
                              <input
                                type="tel"
                                id="contact"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+1234567890"
                                className="w-full pl-12 pr-4 py-4 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black"
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <input
                                type="checkbox"
                                id="sameAsPhone"
                                checked={sameAsPhone}
                                onChange={handleSameAsPhoneChange}
                                className="w-5 h-5 text-[#0066CC] focus:ring-[#0066CC] border-[#0066CC] rounded"
                              />
                              <label
                                htmlFor="sameAsPhone"
                                className="text-base text-[#2C3E50] font-semibold"
                              >
                                Same as Phone Number
                              </label>
                            </div>
                            <label
                              htmlFor="whatsapp"
                              className="block font-bold text-lg text-[#1A1A1A] mb-2"
                            >
                              WhatsApp Number
                            </label>
                            <div className="relative">
                              <FaWhatsapp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#25D366] text-xl" />
                              <input
                                type="tel"
                                id="whatsapp"
                                value={whatsappNumber}
                                onChange={(e) =>
                                  setWhatsappNumber(e.target.value)
                                }
                                placeholder="+1234567890"
                                className="w-full pl-12 pr-4 py-4 border-2 border-[#25D366]/30 rounded-xl focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/20 transition-all duration-300 text-base font-medium text-black"
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <label
                              htmlFor="country"
                              className="block font-bold text-lg text-[#1A1A1A] mb-2"
                            >
                              Country
                            </label>
                            <div className="relative">
                              <FaGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-xl z-10" />
                              <select
                                id="country"
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                className="w-full pl-12 pr-4 py-4 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black appearance-none bg-white"
                              >
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                  <option
                                    key={country.isoCode}
                                    value={country.isoCode}
                                  >
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="relative">
                            <label
                              htmlFor="state"
                              className="block font-bold text-lg text-[#1A1A1A] mb-2"
                            >
                              State
                            </label>
                            <div className="relative">
                              <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-xl z-10" />
                              <select
                                id="state"
                                value={selectedState}
                                onChange={handleStateChange}
                                className="w-full pl-12 pr-4 py-4 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black appearance-none bg-white"
                              >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                  <option
                                    key={state.isoCode}
                                    value={state.isoCode}
                                  >
                                    {state.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="relative">
                            <label
                              htmlFor="city"
                              className="block font-bold text-lg text-[#1A1A1A] mb-2"
                            >
                              City
                            </label>
                            <div className="relative">
                              <FaCity className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-xl z-10" />
                              <select
                                id="city"
                                value={selectedCity}
                                onChange={(e) =>
                                  setSelectedCity(e.target.value)
                                }
                                className="w-full pl-12 pr-4 py-4 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black appearance-none bg-white"
                              >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                  <option key={city.name} value={city.name}>
                                    {city.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      className="group relative w-full mt-10 py-5 bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] text-white font-bold text-xl rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#0066CC]/50"
                    >
                      <span className="relative z-10">
                        {isLoginMode ? "Login" : "Register"}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4D9FFF] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    {/* Toggle Login/Register */}
                    <div className="text-center mt-6 text-lg">
                      {isLoginMode ? (
                        <>
                          <span className="text-[#2C3E50]">
                            Don't have an account?{" "}
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsLoginMode(false)}
                            className="text-[#0066CC] font-bold underline hover:text-[#00D4FF] transition-colors"
                          >
                            Register Here
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-[#2C3E50]">
                            Already have an account?{" "}
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsLoginMode(true)}
                            className="text-[#0066CC] font-bold underline hover:text-[#00D4FF] transition-colors"
                          >
                            Login
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CoordinatorRegisterForm;
