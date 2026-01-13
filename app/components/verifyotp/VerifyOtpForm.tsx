"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/axios";
import { VerifyOtpData, verifyOtpSchema } from "@/app/schemas/verifyotp.schema";

export default function VerifyOtpForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const { register, handleSubmit, formState: { errors } } = useForm<VerifyOtpData>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;  // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < 5 && value) {
      document.getElementById(`otp-${index + 1}`)?.focus();  // Focus next input if current is filled
    }
  };

  const onSubmit = async () => {
    const otpValue = otp.join("");
    try {
      await api.post("/auth/verify-otp", { otp: otpValue });
      toast.success("✅ OTP verified successfully", { theme: "dark" });
      router.push("/auth/reset-password");  // Navigate to reset password page
    } catch (err: any) {
      toast.error(
        err.response?.status === 400
          ? "❌ Invalid OTP"
          : "❌ OTP verification failed",
        { theme: "dark" }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            id={`otp-${index}`}
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            className={`w-12 h-12 text-center text-2xl bg-gray-700 text-white border ${errors.otp ? "border-red-500" : "border-gray-600"}`}
          />
        ))}
      </div>
      {errors.otp && (
        <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold flex items-center justify-center gap-2"
      >
        Verify OTP
      </button>
    </form>
  );
}
