"use client";

import Cursor from "@/components/cursor/Cursor";
import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";
import Privacy from "@/components/policies/privacy/Privacy";

const Page = () => {
  return (
    <div>
      <Cursor />
      <Navbar />
      <Privacy />
      <Footer />
    </div>
  );
};

export default Page;
