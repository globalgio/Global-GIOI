"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
  const [isLogin, setIsLogin] = useState(false); // Track if we are in login or register mode

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

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "country") {
      const selectedCountry = Country.getAllCountries().find(
        (country) => country.isoCode === value
      );
      setStates(State.getStatesOfCountry(selectedCountry?.isoCode || ""));
      setFormData({ ...formData, country: value, state: "", city: "" });
      setCities([]);
    }

    if (name === "state") {
      const selectedState = states.find((state) => state.isoCode === value);
      setCities(
        City.getCitiesOfState(formData.country, selectedState?.isoCode || "")
      );
      setFormData({ ...formData, state: value, city: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isLogin
        ? `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/auth/login`
        : `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/auth/register`;

      const response = await axios.post(url, formData);
      const userData = response.data.user;

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      toast.success(`${isLogin ? "Login" : "Registration"} successful!`);

      // Redirect or show feedback after successful registration/login
      window.location.href = "/profile"; // Redirect to profile page (or homepage)
    } catch (error) {
      console.error(`${isLogin ? "Login" : "Registration"} failed:`, error);
      toast.error(
        `${isLogin ? "Login" : "Registration"} failed. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-6">
          {isLogin ? "Login" : "Registration"} Form
        </h1>

        <div className="text-center mb-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-500 hover:underline"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>

        <p className="text-sm sm:text-base text-center text-gray-600 mb-8">
          {isLogin
            ? "Please enter your credentials to login"
            : "Fill in your details to register for the Global Innovator Olympiad"}
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 w-full">
          {/* Email */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

          {/* Registration-specific fields */}
          {!isLogin && (
            <>
              {/* Name */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              {/* WhatsApp Number */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                  disabled={formData.sameAsPhone}
                />
              </div>

              {/* Same as Phone Number */}
              <div className="col-span-2 flex items-center">
                <input
                  type="checkbox"
                  name="sameAsPhone"
                  checked={formData.sameAsPhone}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Same as Phone Number
                </label>
              </div>

              {/* Country, State, City */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  {Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Teacher Phone Number */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher Phone Number
                </label>
                <input
                  type="text"
                  name="teacherPhoneNumber"
                  value={formData.teacherPhoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              {/* Standard */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Standard
                </label>
                <select
                  name="standard"
                  value={formData.standard}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  <option value="" disabled>
                    Select Standard
                  </option>
                  {["5th", "6th", "7th", "8th", "9th", "10th"].map((std) => (
                    <option key={std} value={std}>
                      {std}
                    </option>
                  ))}
                </select>
              </div>

              {/* School Name */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`col-span-1 sm:col-span-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-3 rounded-lg font-semibold text-sm shadow-md transition`}
          >
            {loading ? "Submitting..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
