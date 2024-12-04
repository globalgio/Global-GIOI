import Cursor from "@/components/cursor/Cursor";
import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";
import VerifyCertificate from "@/components/verify/verifycertificate";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Cursor />
      <Navbar />
      <VerifyCertificate />
      <Footer />
    </div>
  );
};

export default page;
