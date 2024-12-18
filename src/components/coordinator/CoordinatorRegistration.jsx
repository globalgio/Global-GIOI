"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { useRouter } from "next/navigation"; // For Next.js 13+ App Router

const CoordinatorRegisterForm = () => {
  const router = useRouter(); // useRouter hook to navigate programmatically

  // Form fields state
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

  const countries = Country.getAllCountries();
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

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

    if (isLoginMode) {
      // Login logic
      if (!email || !password) {
        alert("Email and Password are required for login.");
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/coordinator/login`,
          { email, password }
        );

        // On successful login, store token and redirect to dashboard
        localStorage.setItem("coordinatorToken", response.data.token);
        router.push("/coordinatorDashboard"); // Use router.push
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage(error.response?.data?.error || "Login failed");
      }
    } else {
      // Registration logic
      // Validate form fields
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
        alert("All fields are required for registration.");
        return;
      }

      if (password.length < 8) {
        alert("Password must be at least 8 characters.");
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
            state: State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name,
            city: selectedCity,
          }
        );
        // Registration successful, store token and redirect
        localStorage.setItem("coordinatorToken", response.data.token);
        router.push("/coordinatorDashboard"); // Use router.push
      } catch (error) {
        console.error("Registration error:", error);
        setErrorMessage(error.response?.data?.error || "Registration failed");
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-10 px-4 bg-gradient-to-b from-blue-200 via-white to-blue-100 min-h-screen font-poppins">
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-6 text-blue-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {isLoginMode ? "Coordinator Login" : "Join as a Global Olympiad Mentor"}
      </motion.h1>

      {!isLoginMode && (
        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-center text-gray-600 max-w-3xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Are you a Teacher, Principal, Headmaster, or Social Worker? Join us as a
          Global Innovator Olympiad Coordinator! Fill out the form to get started.
        </motion.p>
      )}

      <motion.form
        className="w-full max-w-4xl bg-white p-8 sm:p-10 md:p-12 rounded-xl shadow-xl border-2 border-gray-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        onSubmit={handleSubmit}
      >
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        {!isLoginMode && (
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-700"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Personal Details
          </motion.h2>
        )}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ staggerChildren: 0.2 }}
        >
          {/* Name Input (Only in Register Mode) */}
          {!isLoginMode && (
            <motion.div>
              <label htmlFor="name" className="block font-semibold text-xl text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full rounded-lg border-2 border-blue-400 shadow-sm text-lg p-4 focus:border-blue-600 focus:ring-blue-600 text-black"
              />
            </motion.div>
          )}

          {/* Email Input */}
          <motion.div>
            <label htmlFor="email" className="block font-semibold text-xl text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-lg border-2 border-blue-400 shadow-sm text-lg p-4 focus:border-blue-600 focus:ring-blue-600 text-black"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div>
            <label htmlFor="password" className="block font-semibold text-xl text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-lg border-2 border-blue-400 shadow-sm text-lg p-4 focus:border-blue-600 focus:ring-blue-600 text-black"
            />
          </motion.div>

          {/* The following fields only show up in Register mode */}
          {!isLoginMode && (
            <>
              {/* Phone Number Input */}
              <motion.div>
                <label htmlFor="contact" className="block font-semibold text-xl text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="contact"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  className="mt-2 block w-full rounded-lg border-2 border-blue-400 shadow-sm text-lg p-4 focus:border-blue-600 focus:ring-blue-600 text-black"
                />
              </motion.div>

              {/* WhatsApp Number Input */}
              <motion.div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sameAsPhone"
                    checked={sameAsPhone}
                    onChange={handleSameAsPhoneChange}
                    className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sameAsPhone" className="text-xl text-gray-700 font-semibold">
                    Same as Phone Number
                  </label>
                </div>
                <label htmlFor="whatsapp" className="block font-semibold text-xl text-gray-700 mt-4">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="WhatsApp Number"
                  className="mt-2 block w-full rounded-lg border-2 border-blue-400 shadow-sm text-lg p-4 focus:border-blue-600 focus:ring-blue-600 text-black"
                />
              </motion.div>

              {/* Country Dropdown */}
              <motion.div>
                <label htmlFor="country" className="block font-semibold text-xl text-gray-700">
                  Country
                </label>
                <select
                  id="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="mt-2 block w-full rounded-lg border-2 border-blue-400 shadow-sm text-lg p-4 focus:border-blue-600 focus:ring-blue-600 text-black"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* State Dropdown */}
              <motion.div>
                <label htmlFor="state" className="block font-semibold text-xl text-gray-700">
                  State
                </label>
                <select
                  id="state"
                  value={selectedState}
                  onChange={handleStateChange}
                  className="mt-2 block w-full rounded-lg border-2 border-blue-400 shadow-sm text-lg p-4 focus:border-blue-600 focus:ring-blue-600 text-black"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* City Dropdown */}
              <motion.div>
                <label htmlFor="city" className="block font-semibold text-xl text-gray-700">
                  City
                </label>
                <select
                  id="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="mt-2 block w-full rounded-lg border-2 border-blue-400 shadow-sm text-lg p-4 focus:border-blue-600 focus:ring-blue-600 text-black"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="mt-8 mx-auto block bg-blue-600 text-white text-xl py-4 px-8 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {isLoginMode ? "Login" : "Register"}
        </motion.button>

        {/* Toggle between Register and Login */}
        <div className="text-center mt-6">
          {isLoginMode ? (
            <>
              <span>Don't have an account? </span>
              <button
                type="button"
                onClick={() => setIsLoginMode(false)}
                className="text-blue-600 underline"
              >
                Register Here
              </button>
            </>
          ) : (
            <>
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={() => setIsLoginMode(true)}
                className="text-blue-600 underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default CoordinatorRegisterForm;