"use client";

import Refund from "@/components/policies/refund/Refund";
import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";

const Page = () => {
  return (
    <div>
      <Navbar />
      <Refund />
      <Footer />
    </div>
  );
};

export default Page;
