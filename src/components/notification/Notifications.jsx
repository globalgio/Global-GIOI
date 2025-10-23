"use client";
import React, { useEffect, useState } from "react";
import { FaUserPlus, FaGlobe, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NotificationToast = ({ message, icon, onClose }) => (
  <motion.div
    className="relative flex items-center gap-4 p-5 rounded-2xl shadow-2xl bg-white border-2 border-blue-200 overflow-hidden group cursor-pointer"
    initial={{ opacity: 0, x: -100, scale: 0.8 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: 100, scale: 0.8 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{ scale: 1.02, borderColor: "#0066CC" }}
  >
    {/* Animated Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    {/* Animated Border Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>

    {/* Icon Container */}
    <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
      <div
        className="text-white text-xl animate-pulse"
        style={{ animationDuration: "2s" }}
      >
        {icon}
      </div>
    </div>

    {/* Content */}
    <div className="relative z-10 flex-1">
      <h4 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
        🎉 Live Update
      </h4>
      <p className="text-sm text-gray-700 font-medium leading-relaxed">
        {message}
      </p>
    </div>

    {/* Close Button */}
    <button
      onClick={onClose}
      className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100"
    >
      <FaTimes className="text-sm" />
    </button>

    {/* Progress Bar */}
    <motion.div
      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
      initial={{ width: "100%" }}
      animate={{ width: "0%" }}
      transition={{ duration: 5, ease: "linear" }}
    />

    {/* Decorative Dots */}
    <div className="absolute top-3 right-3 flex gap-1 opacity-30">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
      <div
        className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"
        style={{ animationDelay: "0.3s" }}
      ></div>
      <div
        className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"
        style={{ animationDelay: "0.6s" }}
      ></div>
    </div>
  </motion.div>
);

const Notifications = () => {
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    const getRandomValue = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const displayNotification = async () => {
      const randomValue = getRandomValue(10, 200);
      const randomValue2 = getRandomValue(1, 7);
      const isStudentNotification = Math.random() < 0.5;

      const notification = isStudentNotification
        ? {
            message: `${randomValue} students registered recently.`,
            icon: <FaUserPlus />,
          }
        : {
            message: `Participants from ${randomValue2} countries joined.`,
            icon: <FaGlobe />,
          };

      setCurrentNotification(notification);

      // Wait for fade-out before showing the next notification
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setCurrentNotification(null);

      // Wait a bit before the next notification
      await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    const interval = setInterval(() => {
      displayNotification();
    }, 8000);

    // Start immediately
    displayNotification();

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setCurrentNotification(null);
  };

  return (
    <div className="fixed bottom-6 left-6 w-96 z-50">
      <AnimatePresence mode="wait">
        {currentNotification && (
          <NotificationToast
            message={currentNotification.message}
            icon={currentNotification.icon}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
