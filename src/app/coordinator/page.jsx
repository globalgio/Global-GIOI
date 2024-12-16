"use client";

import CoordinatorRegisterForm from "@/components/coordinator/CoordinatorRegistration";

import Cursor from "@/components/cursor/Cursor";
import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";

const Page = () => {
  return (
    <div>
      <Cursor />
      <Navbar />
      <CoordinatorRegisterForm />
      <Footer />
    </div>
  );
};

export default Page;
