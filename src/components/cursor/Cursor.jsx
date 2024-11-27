"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Cursor = () => {
  // State to hold the cursor position
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Track mouse position
  useEffect(() => {
    // Check if the screen width is mobile (max-width 768px or adjust as needed)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check on load
    handleResize();

    // Track mouse move event
    const handleMouseMove = (e) => {
      if (!isMobile) {  // Only update the cursor position if not on mobile
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  // If it's a mobile device, return null to disable the cursor
  if (isMobile) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        pointerEvents: "none",
        zIndex: 9999,
        width: "15px", // Adjust size
        height: "15px", // Adjust size
        borderRadius: "50%", // Makes it a circle
        backgroundColor: "#2563EB", // Customize color
        transformOrigin: "center",
        transform: "translate(-50%, -50%)", // Ensure it follows the mouse pointer and stays centered
      }}
      animate={{
        left: cursorPosition.x,
        top: cursorPosition.y,
      }}
      transition={{
        type: "spring", // Smooth following
        stiffness: 300, // More stiffness for quicker follow
        damping: 25, // Smoother finish
      }}
    />
  );
};

export default Cursor;
