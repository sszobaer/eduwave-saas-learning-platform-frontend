"use client";

import { ToastContainer } from "react-toastify";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ForgotPasswordCard from "../components/forgotpassword/ForgotPasswordCard";

export default function ForgotPasswordPage() {
  return (
    <>
      <ToastContainer />
      <Navbar />

      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
        {/* Background Gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <ForgotPasswordCard />
      </div>

      <Footer />
    </>
  );
}
