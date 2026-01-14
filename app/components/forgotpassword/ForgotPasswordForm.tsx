"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { api } from "@/app/lib/axios";
import { ForgotPasswordData, forgotPasswordSchema } from "@/app/schemas/forgotpassword.schema";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      // Store the email in localStorage
      localStorage.setItem("forgotPasswordEmail", data.email);
      await api.post("/auth/forgot-password", { email: data.email });
      toast.success("✅ OTP sent to your email", { theme: "dark" });
      router.push("/verifyotp");  // Navigate to the OTP verification page
    } catch (err: any) {
      toast.error(
        err.response?.status === 400
          ? "❌ Email not found"
          : "❌ Error sending OTP",
        { theme: "dark" }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 text-gray-500" size={20} />
          <input
            type="email"
            {...register("email")}
            className={`w-full px-4 py-2 pl-10 rounded-lg bg-gray-700 text-white ${errors.email ? "border border-red-500" : ""}`}
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold flex items-center justify-center gap-2"
      >
        Send OTP
      </button>
    </form>
  );
}
