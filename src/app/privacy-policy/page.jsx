"use client"



import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";
import Privacy from "@/components/policies/privacy/privacy";



const Page = () => {
  return (
    <div>
    <Navbar/> 
    <Privacy/>
    <Footer/>
    </div>
  );
};

export default Page;
