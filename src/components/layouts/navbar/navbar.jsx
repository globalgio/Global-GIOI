"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // Track logged-in user state
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Fetch user data from the /me endpoint
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/auth/me`,
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );
      setUser(response.data.user); // Update the user state
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null); // Clear user state if not logged in
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user on component mount
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/auth/logout`,
        {},
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );
      setUser(null); // Clear user state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "/aboutus" },
    { name: "Olympiad", href: "/olympiad" },
    { name: "Verify Certificate", href: "/verifycertificate" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/GIOLOGO.png"
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
              
              <Link
                href="/profile"
                className="px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300"
            >
              Register/Login
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

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
                <span className="text-lg font-semibold text-gray-800">
                  Welcome, {user.name || user.email}
                </span>
                <Link
                  href="/profile"
                  onClick={toggleMenu}
                  className="px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={toggleMenu}
                className="px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300"
              >
                Register/Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
