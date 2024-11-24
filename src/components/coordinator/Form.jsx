"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Country, State, City } from 'country-state-city';

const Form = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(false);

  const countries = Country.getAllCountries();
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
  };

  const handleSameAsPhoneChange = () => {
    setSameAsPhone(!sameAsPhone);
    if (!sameAsPhone) {
      setWhatsappNumber(phoneNumber);
    } else {
      setWhatsappNumber('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!phoneNumber || !selectedCountry || !selectedState || !selectedCity) {
      alert('Please fill out all required fields.');
      return;
    }

    const name = document.getElementById('name').value.trim();

    if (!name) {
      alert('Please enter your name.');
      return;
    }

    // Construct the WhatsApp message
    const countryName = Country.getCountryByCode(selectedCountry)?.name || 'Not Selected';
    const stateName = State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name || 'Not Selected';
    const message = `Hello,
    
    Become a Mentor for the Global Innovator Olympiad and Light the Path to Success!

Name: ${name}
Phone Number: ${phoneNumber}
WhatsApp Number: ${whatsappNumber || 'Not Provided'}
Country: ${countryName}
State: ${stateName}
City: ${selectedCity}`;

    // WhatsApp URL
    const whatsappURL = `https://wa.me/919594402916?text=${encodeURIComponent(message)}`;

    // Open WhatsApp Web
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="flex flex-col items-center py-10 px-4 bg-gradient-to-b from-blue-200 via-white to-blue-100 min-h-screen font-poppins">
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-6 text-blue-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Join as a Global Olympiad Mentor
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl lg:text-2xl text-center text-gray-600 max-w-3xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Are you a Teacher, Principal, Headmaster, or Social Worker? Join us as a
        Global Innovator Olympiad Coordinator! Help schools discover the
        educational benefits we offer. Fill out the Coordinator's form to get
        started today!
      </motion.p>

      <motion.form
        className="w-full max-w-4xl bg-white p-8 sm:p-10 md:p-12 rounded-xl shadow-xl border-2 border-gray-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-700"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Personal Details
        </motion.h2>

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
          {/* Name Input */}
          <motion.div>
            <label htmlFor="name" className="block font-semibold text-xl text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="mt-2 block w-full rounded-lg border-2 border-blue-400 shadow-sm text-lg p-4 focus:border-blue-600 focus:ring-blue-600 text-black"
            />
          </motion.div>

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
          <motion.div className="flex items-center gap-2">
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
          </motion.div>

          <motion.div>
            <label htmlFor="whatsapp" className="block font-semibold text-xl text-gray-700">
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
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="button"
          onClick={handleSubmit}
          className="mt-8 mx-auto block bg-blue-600 text-white text-xl py-4 px-8 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Register
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Form;
