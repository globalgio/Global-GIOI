"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Hero from "@/components/home/Hero/hero";
import AboutGO from "@/components/home/aboutgo/aboutgo";
import BookNow from "@/components/home/booknow/booknow";
import Databanner from "@/components/home/databanner/databanner";
import Flags from "@/components/home/flags/flags";
import Students from "@/components/home/students/students";
import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const message = searchParams.get("message");

    if (message === "signup-success") {
      toast.success("Welcome!");
      router.replace("/", undefined, { shallow: true });
    } else if (message === "login-success") {
      toast.success("Logged in successfully!");
      router.replace("/", undefined, { shallow: true });
    }
  }, [searchParams, router]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Hero />
      <AboutGO />
      <Students />
      <Flags />
      <Databanner />
      <BookNow />
      <Footer />
    </div>
  );
};

export default Page;
