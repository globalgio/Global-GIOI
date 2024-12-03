"use client"


import Form from "@/components/coordinator/Form";
import Cursor from "@/components/cursor/Cursor";
import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";



const Page = () => {
  return (
    <div>
      <Cursor/>
    <Navbar/> 

   <Form/>
    <Footer/>
    </div>
  );
};

export default Page;
