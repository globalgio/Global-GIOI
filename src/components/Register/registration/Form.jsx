"use client";

import { useState } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaWhatsapp, FaGlobe, FaMapMarkerAlt, FaCity, FaSchool, FaGraduationCap, FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    PhoneNumber: "",
    teacherPhoneNumber: "",
    whatsappNumber: "",
    sameAsPhone: false,
    standard: "",
    schoolName: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "sameAsPhone") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
        whatsappNumber: checked ? prevData.PhoneNumber : "",
      }));
      return;
    }

    if (name === "country") {
      const selectedCountry = Country.getAllCountries().find(
        (country) => country.isoCode === value
      );
      setStates(State.getStatesOfCountry(selectedCountry?.isoCode || ""));
      setFormData({
        ...formData,
        country: selectedCountry ? selectedCountry.name : "",
        countryCode: value,
        state: "",
        city: "",
      });
      setCities([]);
      return;
    }

    if (name === "state") {
      const selectedState = states.find((state) => state.isoCode === value);
      setCities(
        City.getCitiesOfState(
          Country.getAllCountries().find((c) => c.name === formData.country)
            ?.isoCode || "",
          selectedState?.isoCode || ""
        )
      );
      setFormData({
        ...formData,
        state: selectedState ? selectedState.name : "",
        stateCode: value,
        city: "",
      });
      return;
    }

    if (name === "city") {
      const selectedCity = cities.find((city) => city.name === value);
      setFormData({
        ...formData,
        city: selectedCity ? selectedCity.name : "",
      });
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!formData.username || !formData.password) {
        toast.error("Username and password are required for login.");
        return;
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Passwords do not match.");
        toast.error("Passwords do not match.");
        return;
      }
      setPasswordError("");
    }

    setLoading(true);

    try {
      const url = isLogin
        ? `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/login`
        : `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/register`;

      const response = await axios.post(url, formData);

      localStorage.setItem("token", response.data.token);

      toast.success(`${isLogin ? "Login" : "Registration"} successful!`);

      window.location.href = "/profile";
    } catch (error) {
      console.error(`${isLogin ? "Login" : "Registration"} failed:`, error);

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          `${isLogin ? "Login" : "Registration"} failed. Please try again.`
        );
      }
    } finally {
      setLoading(false);
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

          .animation-delay-200 {
            animation-delay: 0.2s;
          }

          .animation-delay-400 {
            animation-delay: 0.4s;
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

      <div className="relative min-h-screen bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA] py-16 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden">
        <ToastContainer position="top-right" autoClose={3000} />

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
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-slide-in-up">
            <div className="inline-flex items-center gap-3 mb-6">
              <FaUserShield className="text-5xl text-[#0066CC] animate-pulse-slow" />
              <FaGraduationCap
                className="text-5xl text-[#FFD700] animate-pulse-slow"
                style={{ animationDelay: "0.3s" }}
              />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] mb-4">
              {isLogin ? (
                <>
                  Rediscover{" "}
                  <span className="gradient-text animate-shimmer">
                    Innovation
                  </span>
                </>
              ) : (
                <>
                  Step Into{" "}
                  <span className="gradient-text animate-shimmer">
                    Innovation
                  </span>
                </>
              )}
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] mx-auto rounded-full mb-6"></div>

            <p className="text-lg sm:text-xl lg:text-2xl text-[#2C3E50] max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              {isLogin ? (
                <>
                  ✨ Access your gateway to global brilliance.{" "}
                  <span className="font-bold text-[#0066CC]">
                    Log in to GIO
                  </span>{" "}
                  and keep innovating! ✨
                </>
              ) : (
                <>
                  🌟 Unleash your potential and join the global stage of
                  innovation.{" "}
                  <span className="font-bold text-[#FFD700]">
                    Register now for the GIO
                  </span>{" "}
                  and make your mark! 🌟
                </>
              )}
            </p>

            {/* Video Link */}
            {/* Video Link */}
            {!isLogin && (
              <div className="mt-6 animate-fade-in-up animation-delay-400">
                <a
                  href="https://www.youtube.com/watch?v=CKCYNEJmjK4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <span className="text-2xl">📹</span>
                  <span>Watch Registration Guide</span>
                </a>
              </div>
            )}

            {/* Toggle Login/Register */}
            <div className="mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-lg text-[#0066CC] font-bold hover:text-[#00D4FF] underline transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Register here"
                  : "Already have an account? Login here"}
              </button>
            </div>
          </div>

          {/* Form Card */}
          <div className="animate-fade-in-up animation-delay-400">
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#FFD700] rounded-3xl blur-2xl opacity-20 animate-rotate-gradient"></div>

              <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-14 border-4 border-white ring-4 ring-[#0066CC]/20">
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {/* Username */}
                  <div className="relative">
                    <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-lg z-10" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black"
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-lg z-10" />
                      <input
                        type={passwordVisibility.password ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-12 py-3 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("password")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-xl z-10"
                      >
                        {passwordVisibility.password ? (
                          <FaEye />
                        ) : (
                          <FaEyeSlash />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  {!isLogin && (
                    <div className="relative">
                      <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-lg z-10" />
                        <input
                          type={
                            passwordVisibility.confirmPassword
                              ? "text"
                              : "password"
                          }
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full pl-12 pr-12 py-3 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black"
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            togglePasswordVisibility("confirmPassword")
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-xl z-10"
                        >
                          {passwordVisibility.confirmPassword ? (
                            <FaEye />
                          ) : (
                            <FaEyeSlash />
                          )}
                        </button>
                      </div>
                      {passwordError && (
                        <p className="text-[#EF4444] text-sm mt-1 font-semibold">
                          {passwordError}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Registration Fields */}
                  {!isLogin && (
                    <>
                      {/* Full Name */}
                      <div className="relative">
                        <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                          Full Name
                          <span className="text-xs ml-1 text-[#FFD700]">
                            (as on certificate)
                          </span>
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-lg z-10" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black uppercase"
                            placeholder="FULL NAME"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="relative">
                        <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-lg z-10" />
                          <input
                            type="tel"
                            name="PhoneNumber"
                            value={formData.PhoneNumber}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black"
                            placeholder="+1234567890"
                            required
                          />
                        </div>
                      </div>

                      {/* WhatsApp Number */}
                      <div className="relative">
                        <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                          WhatsApp Number
                        </label>
                        <div className="relative">
                          <FaWhatsapp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#25D366] text-lg z-10" />
                          <input
                            type="tel"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-[#25D366]/30 rounded-xl focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/20 transition-all duration-300 text-base font-medium text-black disabled:bg-gray-100"
                            placeholder="+1234567890"
                            required
                            disabled={formData.sameAsPhone}
                          />
                        </div>
                      </div>

                      {/* Same as Phone Checkbox */}
                      <div className="flex items-center gap-3 pt-8">
                        <input
                          type="checkbox"
                          name="sameAsPhone"
                          checked={formData.sameAsPhone}
                          onChange={handleChange}
                          className="w-5 h-5 text-[#0066CC] focus:ring-[#0066CC] border-[#0066CC] rounded"
                        />
                        <label className="text-base font-semibold text-[#2C3E50]">
                          Same as Phone Number
                        </label>
                      </div>

                      {/* Country */}
                      <div className="relative">
                        <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                          Country
                        </label>
                        <div className="relative">
                          <FaGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-lg z-10" />
                          <select
                            name="country"
                            value={formData.countryCode || ""}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black appearance-none bg-white"
                            required
                          >
                            <option value="">Select Country</option>
                            {Country.getAllCountries().map((country) => (
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

                      {/* State */}
                      <div className="relative">
                        <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                          State
                        </label>
                        <div className="relative">
                          <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-lg z-10" />
                          <select
                            name="state"
                            value={formData.stateCode || ""}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black appearance-none bg-white"
                            required
                          >
                            <option value="">Select State</option>
                            {states.map((state) => (
                              <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* City */}
                      <div className="relative">
                        <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                          City
                        </label>
                        <div className="relative">
                          <FaCity className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-lg z-10" />
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black appearance-none bg-white"
                            required
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

                      {/* Teacher Phone */}
                      <div className="relative">
                        <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                          Teacher Phone Number
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-lg z-10" />
                          <input
                            type="tel"
                            name="teacherPhoneNumber"
                            value={formData.teacherPhoneNumber}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black"
                            placeholder="+1234567890"
                            required
                          />
                        </div>
                      </div>

                      {/* Standard */}
                      <div className="relative">
                        <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                          Standard
                        </label>
                        <div className="relative">
                          <FaGraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-lg z-10" />
                          <select
                            name="standard"
                            value={formData.standard}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black appearance-none bg-white"
                            required
                          >
                            <option value="">Select Standard</option>
                            {["5th", "6th", "7th", "8th", "9th", "10th"].map(
                              (std) => (
                                <option key={std} value={std}>
                                  {std}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>

                      {/* School Name */}
                      <div className="relative">
                        <label className="block font-bold text-base text-[#1A1A1A] mb-2">
                          School Name
                        </label>
                        <div className="relative">
                          <FaSchool className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0066CC] text-lg z-10" />
                          <input
                            type="text"
                            name="schoolName"
                            value={formData.schoolName}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-[#0066CC]/30 rounded-xl focus:border-[#0066CC] focus:ring-4 focus:ring-[#0066CC]/20 transition-all duration-300 text-base font-medium text-black uppercase"
                            placeholder="SCHOOL NAME"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Submit Button */}
                  <div className="col-span-full mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full py-5 bg-gradient-to-r from-[#0066CC] to-[#4D9FFF] text-white font-bold text-xl rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[#0066CC]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>{isLogin ? "Login" : "Register"}</span>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4D9FFF] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;