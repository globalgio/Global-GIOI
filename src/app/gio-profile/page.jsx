import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";
import Form from "@/components/registration/Form";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <Form />
      <Footer />
    </div>
  );
};

export default page;
