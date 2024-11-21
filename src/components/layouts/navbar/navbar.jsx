"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // State to track user login status
  const pathname = usePathname(); // Get the current path

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Simulate fetching user data (replace this with an actual API call)
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "/aboutus" },
    { name: "Olympiad", href: "/olympiad" },
    { name: "Verify Certificate", href: "/verifycertificate" }, // New page
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/GIOLOGO.png" // Replace with the actual path to your logo image
              alt="Logo"
              width={80}
              height={80}
              className="mr-3"
            />
            <h1 className="text-5xl font-extrabold text-blue-600 font-serif">
              GIO
            </h1>
          </Link>
        </div>

        {/* Right: Navigation Links and Button */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-2xl font-semibold ${
                pathname === link.href
                  ? "text-blue-600 animate-bounce border-b-2 border-blue-600"
                  : "text-gray-800"
              } hover:text-blue-600 hover:scale-105 transition duration-300 font-sans`}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-xl text-gray-800 font-medium">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300"
            >
              Login/Register
            </Link>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center p-4 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className={`text-2xl font-semibold ${
                  pathname === link.href
                    ? "text-blue-600 animate-bounce border-b-2 border-blue-600"
                    : "text-gray-800"
                } hover:text-blue-600 hover:scale-105 transition duration-300 font-sans`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="flex flex-col items-center space-y-2">
                <span className="text-xl text-gray-800 font-medium">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={toggleMenu}
                className="px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300"
              >
                Login/Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
