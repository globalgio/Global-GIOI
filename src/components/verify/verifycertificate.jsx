"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle verification logic
  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVerificationStatus(null);

    // Simulate an API call to verify the certificate
    setTimeout(() => {
      if (certificateId === "12345") {
        setIsVerified(true);
        setVerificationStatus("Certificate Verified Successfully!");
      } else {
        setIsVerified(false);
        setVerificationStatus("Verification Failed. Please check the certificate number.");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="verify-section w-full flex items-center justify-center bg-[#f4f6f9] py-8 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl flex flex-col items-center p-6 md:p-8 lg:p-12 shadow-lg">
        {/* Title and Description */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-[#106EB5]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Certificate Verification
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg mt-4 text-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            Please enter the unique certificate number to verify its authenticity.
          </motion.p>
        </div>

        {/* Certificate Verification Form */}
        <motion.form
          className="w-full max-w-md space-y-4"
          onSubmit={handleVerification}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <div>
            <label htmlFor="certificateId" className="block text-sm font-medium text-black">
              Certificate Number
            </label>
            <input
              type="text"
              id="certificateId"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md mt-2 text-sm md:text-base"
              placeholder="Enter the certificate number"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 text-white bg-[#106EB5] rounded-md mt-6 text-sm md:text-base"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
          >
            {loading ? "Verifying..." : "Verify Certificate"}
          </motion.button>
        </motion.form>

        {/* Verification Status */}
        {verificationStatus && (
          <motion.div
            className={`mt-4 text-center text-sm md:text-xl font-semibold ${
              isVerified ? "text-green-500" : "text-red-500"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          >
            {verificationStatus}
          </motion.div>
        )}

        {/* Download Button (conditional rendering if verified) */}
        {isVerified && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
          >
            {/* Uncomment when backend provides actual certificate data */}
            <button
              className="py-3 px-8 bg-green-500 text-white rounded-md text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
            >
              Download Certificate
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default VerifyCertificate;
