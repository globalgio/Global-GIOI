import Image from "next/image";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      {/* Sticky WhatsApp Button */}
      <a
        href="https://wa.me/919594402916"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 md:p-5 hover:text-black hover:scale-110"
        title="Chat with us on WhatsApp"
        style={{ fontSize: "2.5rem" }} // Adjust font size for better visibility
      >
        <FaWhatsapp />
      </a>

      <footer className="bg-blue-500 text-white p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start space-y-8 md:space-y-0 md:space-x-8">
          {/* Contact Section */}
          <div className="w-full md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left">
            <Image
              src="/GIOLOGO.png" // Replace with the actual path to your logo image
              alt="Global Innovator Olympiad Logo"
              width={100}
              height={100}
              className="mb-4"
            />
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <p>Call: +91 959 440 2916</p>
            <p>Email: globalinnovatorolympiad@gmail.com</p>
            <p className="text-center md:text-left">
              Head-Office, BKC, Mumbai, India, 400070
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h3 className="text-lg font-bold mb-2">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/aboutus" className="hover:underline">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/olympiad" className="hover:underline">
                  Olympiad
                </a>
              </li>
              <li>
                <a href="/coordinator" className="hover:underline">
                  Coordinator
                </a>
              </li>
            </ul>
          </div>

          {/* Category Links */}
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h3 className="text-lg font-bold mb-2">Category</h3>
            <ul className="space-y-2">
              <li>
                <a href="/olympiad" className="hover:underline">
                  Olympiad Details
                </a>
              </li>
              <li>
                <a href="/olympiad" className="hover:underline">
                  Syllabus and Preparation
                </a>
              </li>
              <li>
                <a href="/olympiad" className="hover:underline">
                  Eligibility Criteria
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="w-full md:w-1/4 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com" // Replace with actual Facebook link
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded transition duration-300 transform hover:text-black hover:scale-110 shadow-lg"
              >
                <FaFacebookF className="text-blue-500" />
              </a>
              <a
                href="https://linkedin.com" // Replace with actual LinkedIn link
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded transition duration-300 transform hover:text-black hover:scale-110 shadow-lg"
              >
                <FaLinkedinIn className="text-blue-500" />
              </a>
              <a
                href="https://instagram.com" // Replace with actual Instagram link
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded transition duration-300 transform hover:text-black hover:scale-110 shadow-lg"
              >
                <FaInstagram className="text-pink-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4">
          <div className="flex flex-col items-center space-y-2 text-sm">
            <div className="flex space-x-4">
              <a href="/aboutus" className="hover:underline">
                About
              </a>
              <a href="/refund-policy" className="hover:underline">
                Refund Policy
              </a>
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
              <a href="/terms-conditions" className="hover:underline">
                Terms & Conditions
              </a>
            </div>
            <p>© GIO All Rights Reserved. Edu Momentum LLP</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
