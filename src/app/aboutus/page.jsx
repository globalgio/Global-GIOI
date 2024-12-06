"use client";

import Hero from "@/components/aboutus/hero/hero";
import Unique from "@/components/aboutus/unique/unique";
import Cursor from "@/components/cursor/Cursor";
import Flags from "@/components/home/flags/flags";
import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";

const Page = () => {
  return (
    <div>
      <Cursor />
      <Navbar />
      <Hero />
      <Flags />
      <Unique />
      <Footer />
    </div>
  );
};

export default Page;
