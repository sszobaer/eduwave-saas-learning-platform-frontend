"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/axios";

export default function VerifyOtpForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("forgotPasswordEmail");
    if (!storedEmail) {
      toast.error("❌ Session expired", { theme: "dark" });
      router.push("/auth/forgot-password");
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
  if (e.key === "Backspace") {
    e.preventDefault();
    const newOtp = [...otp];

    if (newOtp[index]) {
      // If current input has value → clear it
      newOtp[index] = "";
      setOtp(newOtp);
    } else if (index > 0) {
      // If empty → go to previous and clear
      document.getElementById(`otp-${index - 1}`)?.focus();
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  }

  if (e.key === "ArrowLeft" && index > 0) {
    e.preventDefault();
    document.getElementById(`otp-${index - 1}`)?.focus();
  }

  if (e.key === "ArrowRight" && index < 5) {
    e.preventDefault();
    document.getElementById(`otp-${index + 1}`)?.focus();
  }
};

  

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("❌ OTP must be 6 digits", { theme: "dark" });
      return;
    }

    try {
      const res= await api.post("/auth/verify-otp", { email, otp: otpValue });
      localStorage.removeItem("forgotPasswordEmail");
      localStorage.setItem("resetToken", res.data.resetToken);
      console.log(res.data.resetToken);
      toast.success("✅ OTP verified", { theme: "dark" });
      router.push("/resetpassword");
    } catch {
      toast.error("❌ Invalid or expired OTP");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex gap-4 justify-center">
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-12 h-12 text-center text-3xl bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl transition-all duration-200"
          />
        ))}
      </div>

      <button className="w-full bg-blue-600 py-3 rounded-lg text-white">
        Verify OTP
      </button>
    </form>
  );
}
