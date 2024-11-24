"use client"

import Login from "@/components/form/login";
import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";



const Page = () => {
  return (
    <div>
    <Navbar/> 
    <Login/>
    <Footer/>
    </div>
  );
};

export default Page;
