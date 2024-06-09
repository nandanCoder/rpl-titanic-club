"use client";
import DashCard from "@/components/Dash-Card";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RecentPayment from "@/components/RecentPayment";
import Sidebar from "@/components/Sidebar";
import UserpaymentCard from "@/components/UserpaymentCard";
import { Button } from "@/components/ui/button";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import axios from "axios";

export default function Home() {
  const getUser = async () => {
    const user = await axios.get("/api/get-current-user");
    //console.log(user);
  };
  return (
    <div className="w-full  h-full">
      <Sidebar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
