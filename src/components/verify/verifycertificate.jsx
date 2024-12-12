"use client";
import React, { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { motion } from "framer-motion";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVerificationStatus(null);

    try {
      // API call to verify the certificate
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ certificateCode: certificateId }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Verification Failed. Please check the certificate number."
        );
      }

      const data = await response.json();

      setIsVerified(true);
      setVerificationStatus("Certificate Verified Successfully!");
      setCertificateData(data); // Set certificate data fetched from the server
      console.log(data); //
      generateCertificate(data); // Generate PDF after successful verification
    } catch (error) {
      setIsVerified(false);
      setVerificationStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateCertificate = async (data) => {
    try {
      const templateUrl = "/gioi-certificate.pdf"; // Path to your existing PDF template
      const existingPdfBytes = await fetch(templateUrl).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Define positions based on the certificate template
      const nameX = 260;
      const nameY = 580;

      const globalRankX = 335;
      const globalRankY = 455;

      const countryRankX = 338;
      const countryRankY = 428;

      const stateRankX = 340;
      const stateRankY = 403;

      const certificateIdX = 310;
      const certificateIdY = 295;

      // Populate certificate details dynamically with the name, rankings, and certificate code
      firstPage.drawText((data.name || "N/A").toUpperCase(), {
        x: nameX,
        y: nameY,
        size: 18,
        font: font,
        color: rgb(0, 0, 0),
        opacity: 1,
        lineHeight: 1.2,
        fontSize: 18,
        fontWeight: "bold",
      });

      firstPage.drawText(
        (data.rankings.global.rank?.toString() || "N/A").toUpperCase(),
        {
          x: globalRankX,
          y: globalRankY,
          size: 16,
          font: font,
          color: rgb(0, 0, 0),
          opacity: 1,
          lineHeight: 1.2,
          fontSize: 16,
          fontWeight: "bold",
        }
      );

      firstPage.drawText(
        (data.rankings.country.rank?.toString() || "N/A").toUpperCase(),
        {
          x: countryRankX,
          y: countryRankY,
          size: 16,
          font: font,
          color: rgb(0, 0, 0),
          opacity: 1,
          lineHeight: 1.2,
          fontSize: 16,
          fontWeight: "bold",
        }
      );

      firstPage.drawText(
        (data.rankings.state.rank?.toString() || "N/A").toUpperCase(),
        {
          x: stateRankX,
          y: stateRankY,
          size: 16,
          font: font,
          color: rgb(0, 0, 0),
          opacity: 1,
          lineHeight: 1.2,
          fontSize: 16,
          fontWeight: "bold",
        }
      );

      firstPage.drawText((data.code || "N/A").toUpperCase(), {
        x: certificateIdX,
        y: certificateIdY,
        size: 14,
        font: font,
        color: rgb(0, 0, 0),
        opacity: 1,
        lineHeight: 1.2,
        fontSize: 14,
        fontWeight: "bold",
      });

      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url); // Update the state to render the certificate
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
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
            Please enter the unique certificate number to verify its
            authenticity.
          </motion.p>
        </div>

        {/* Certificate Verification Form */}
        <motion.form
          className="w-full max-w-md space-y-4"
          onSubmit={handleVerification} // Ensure handleVerification is properly bound to the form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <div>
            <label
              htmlFor="certificateId"
              className="block text-sm font-medium text-black"
            >
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

        {/* View Certificate Button */}
        {isVerified && !pdfUrl && (
          <motion.button
            className="mt-6 py-3 px-8 bg-green-500 text-white rounded-md"
            onClick={() => generateCertificate(certificateData)}
          >
            View Certificate
          </motion.button>
        )}

        {/* Render PDF in iframe */}
        {pdfUrl && (
          <div className="mt-6 w-full">
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              className="rounded-md shadow-lg"
              title="Certificate Preview"
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
};

export default VerifyCertificate;
