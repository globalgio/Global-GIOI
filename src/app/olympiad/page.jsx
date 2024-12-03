"use client"

import Details from "@/components/olympiad/details/details";
import Hero from "@/components/olympiad/hero/hero";
import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";
import Cards from "@/components/olympiad/standardcards/cards";
import Cursor from "@/components/cursor/Cursor";


const Page = () => {
  return (
    <div>
        <Cursor/>
        <Navbar/>
        <Hero/>
        <Details/>
        <Cards/>
     <Footer/>
    </div>
  );
};

export default Page;
