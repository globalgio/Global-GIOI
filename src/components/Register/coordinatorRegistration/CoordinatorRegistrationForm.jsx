"use client";

import React, { useState } from "react";
import { Country, State, City } from "country-state-city";

const CoordinatorRegisterForm = () => {
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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setRegistrationMessage("");

    if (isSubmitting) return;
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (isLoginMode) {
        console.log("Login successful!");
        setIsSubmitting(false);
      } else {
        setRegistrationSuccess(true);
        setRegistrationMessage(
          "Registration successful! Your account is pending approval by an administrator."
        );
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#004C99] via-[#0066CC] to-[#1A1A1A] py-20 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden font-sans">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#00D4FF] rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#4D9FFF] rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {registrationSuccess ? (
          <div className="animate-fade-in-up">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#10B981] via-[#FFD700] to-[#10B981] rounded-3xl blur-2xl opacity-30 animate-pulse-slow"></div>

              {/* Success Card */}
              <div className="relative bg-white p-10 sm:p-12 md:p-16 rounded-3xl shadow-2xl border-[5px] border-white ring-4 ring-[#10B981]/30">
                {/* Corner Decorations */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-[5px] border-l-[5px] border-[#10B981] rounded-tl-3xl animate-pulse-slow"></div>
                <div className="absolute -top-4 -right-4 w-16 h-16 border-t-[5px] border-r-[5px] border-[#FFD700] rounded-tr-3xl animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-[5px] border-l-[5px] border-[#00D4FF] rounded-bl-3xl animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-[5px] border-r-[5px] border-[#10B981] rounded-br-3xl animate-pulse-slow"></div>

                <div className="text-center">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#10B981] via-[#FFD700] to-[#10B981] bg-clip-text text-transparent animate-shimmer">
                    Registration Successful!
                  </h2>
                  <p className="text-xl sm:text-2xl text-[#2C3E50] mb-8 leading-relaxed">
                    {registrationMessage}
                  </p>
                  <button
                    onClick={() => {
                      setRegistrationSuccess(false);
                      setIsLoginMode(true);
                    }}
                    className="group relative inline-block bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white text-xl font-bold py-4 px-10 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <span className="relative z-10">Go to Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-12 animate-slide-in-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 text-white drop-shadow-lg">
                {isLoginMode ? (
                  <>
                    <span className="bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#4D9FFF] bg-clip-text text-transparent animate-shimmer">
                      Coordinator
                    </span>{" "}
                    <span>Login</span>
                  </>
                ) : (
                  <>
                    Join as a{" "}
                    <span className="bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#FFD700] bg-clip-text text-transparent animate-shimmer">
                      Global Olympiad
                    </span>{" "}
                    Mentor
                  </>
                )}
              </h1>

              {!isLoginMode && (
                <p className="text-xl sm:text-2xl text-[#F5F7FA] max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
                  Are you a Teacher, Principal, Headmaster, or Social Worker?
                  Join us as a{" "}
                  <span className="text-[#FFD700] font-bold">
                    Global Innovator Olympiad
                  </span>{" "}
                  partner! Fill out the form to get started.
                </p>
              )}
            </div>

            {/* Form Container */}
            <div className="relative animate-slide-in-right animation-delay-400">
              {/* Rotating Gradient Glow */}
              <div className="absolute -inset-5 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#4D9FFF] rounded-3xl blur-2xl opacity-40 animate-rotate-gradient"></div>

              {/* Main Form Card */}
              <div className="relative bg-white p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl border-[5px] border-white ring-4 ring-[#FFD700]/30">
                {/* Corner Decorations */}
                <div className="absolute -top-4 -left-4 w-14 h-14 border-t-[5px] border-l-[5px] border-[#FFD700] rounded-tl-3xl animate-pulse-slow z-20"></div>
                <div className="absolute -top-4 -right-4 w-14 h-14 border-t-[5px] border-r-[5px] border-[#00D4FF] rounded-tr-3xl animate-pulse-slow z-20"></div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 border-b-[5px] border-l-[5px] border-[#0066CC] rounded-bl-3xl animate-pulse-slow z-20"></div>
                <div className="absolute -bottom-4 -right-4 w-14 h-14 border-b-[5px] border-r-[5px] border-[#FFD700] rounded-br-3xl animate-pulse-slow z-20"></div>

                <div>
                  {errorMessage && (
                    <div className="mb-6 p-4 bg-[#EF4444]/10 border-2 border-[#EF4444] rounded-xl text-[#EF4444] text-lg animate-fade-in">
                      {errorMessage}
                    </div>
                  )}

                  {!isLoginMode && (
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#0066CC] to-[#004C99] bg-clip-text text-transparent">
                      Personal Details
                    </h2>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {!isLoginMode && (
                      <div className="animate-fade-in-up animation-delay-200">
                        <label
                          htmlFor="name"
                          className="block font-bold text-lg text-[#2C3E50] mb-2"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-xl border-2 border-[#0066CC] shadow-md text-lg p-4 focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 text-[#1A1A1A] transition-all duration-300"
                        />
                      </div>
                    )}

                    <div className="animate-fade-in-up animation-delay-300">
                      <label
                        htmlFor="email"
                        className="block font-bold text-lg text-[#2C3E50] mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border-2 border-[#0066CC] shadow-md text-lg p-4 focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 text-[#1A1A1A] transition-all duration-300"
                      />
                    </div>

                    <div className="animate-fade-in-up animation-delay-400">
                      <label
                        htmlFor="password"
                        className="block font-bold text-lg text-[#2C3E50] mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border-2 border-[#0066CC] shadow-md text-lg p-4 focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 text-[#1A1A1A] transition-all duration-300"
                      />
                    </div>

                    {!isLoginMode && (
                      <>
                        <div className="animate-fade-in-up animation-delay-500">
                          <label
                            htmlFor="contact"
                            className="block font-bold text-lg text-[#2C3E50] mb-2"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="contact"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+1 234 567 8900"
                            className="w-full rounded-xl border-2 border-[#0066CC] shadow-md text-lg p-4 focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 text-[#1A1A1A] transition-all duration-300"
                          />
                        </div>

                        <div className="animate-fade-in-up animation-delay-600">
                          <div className="flex items-center gap-3 mb-3">
                            <input
                              type="checkbox"
                              id="sameAsPhone"
                              checked={sameAsPhone}
                              onChange={handleSameAsPhoneChange}
                              className="h-6 w-6 text-[#0066CC] focus:ring-[#FFD700] border-[#0066CC] rounded cursor-pointer"
                            />
                            <label
                              htmlFor="sameAsPhone"
                              className="text-lg text-[#2C3E50] font-semibold cursor-pointer"
                            >
                              Same as Phone Number
                            </label>
                          </div>
                          <label
                            htmlFor="whatsapp"
                            className="block font-bold text-lg text-[#2C3E50] mb-2"
                          >
                            WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            id="whatsapp"
                            value={whatsappNumber}
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                            placeholder="+1 234 567 8900"
                            className="w-full rounded-xl border-2 border-[#0066CC] shadow-md text-lg p-4 focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 text-[#1A1A1A] transition-all duration-300"
                          />
                        </div>

                        <div className="animate-fade-in-up animation-delay-700">
                          <label
                            htmlFor="country"
                            className="block font-bold text-lg text-[#2C3E50] mb-2"
                          >
                            Country
                          </label>
                          <select
                            id="country"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            className="w-full rounded-xl border-2 border-[#0066CC] shadow-md text-lg p-4 focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 text-[#1A1A1A] transition-all duration-300"
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

                        <div className="animate-fade-in-up animation-delay-800">
                          <label
                            htmlFor="state"
                            className="block font-bold text-lg text-[#2C3E50] mb-2"
                          >
                            State
                          </label>
                          <select
                            id="state"
                            value={selectedState}
                            onChange={handleStateChange}
                            className="w-full rounded-xl border-2 border-[#0066CC] shadow-md text-lg p-4 focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 text-[#1A1A1A] transition-all duration-300"
                          >
                            <option value="">Select State</option>
                            {states.map((state) => (
                              <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="animate-fade-in-up animation-delay-900">
                          <label
                            htmlFor="city"
                            className="block font-bold text-lg text-[#2C3E50] mb-2"
                          >
                            City
                          </label>
                          <select
                            id="city"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="w-full rounded-xl border-2 border-[#0066CC] shadow-md text-lg p-4 focus:border-[#FFD700] focus:ring-4 focus:ring-[#FFD700]/30 text-[#1A1A1A] transition-all duration-300"
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group relative mt-10 mx-auto block bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#FFD700] text-[#1A1A1A] text-xl font-extrabold py-5 px-12 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="relative z-10">
                      {isLoginMode
                        ? "Login"
                        : isSubmitting
                        ? "Processing..."
                        : "Register Now"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>

                  <div className="text-center mt-8 text-lg">
                    {isLoginMode ? (
                      <>
                        <span className="text-[#2C3E50]">
                          Don't have an account?{" "}
                        </span>
                        <button
                          onClick={() => setIsLoginMode(false)}
                          className="text-[#0066CC] font-bold underline hover:text-[#FFD700] transition-colors duration-300"
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
                          onClick={() => setIsLoginMode(true)}
                          className="text-[#0066CC] font-bold underline hover:text-[#FFD700] transition-colors duration-300"
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

      <style jsx global>{`
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

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        .animate-slide-in-left {
          animation: slide-in-left 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
          opacity: 0;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default CoordinatorRegisterForm;
