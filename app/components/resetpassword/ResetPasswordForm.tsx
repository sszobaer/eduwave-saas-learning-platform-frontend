"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/axios";
import { Eye, EyeOff } from "lucide-react";
import { resetPasswordSchema, ResetPasswordData } from "@/app/schemas/resetpassword.schema";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("resetToken");
    if (!storedToken) {
      toast.error("❌ Session expired");
      router.push("/auth/forgot-password");
      return;
    }
    setToken(storedToken);
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    /*if (data.password !== data.confirmPassword) {
      toast.error("❌ Passwords do not match");
      return;
    }*/

    try {
      await api.post("/auth/reset-password", { resetToken: token, newPassword: data.password });
      toast.success("✅ Password reset successfully", { theme: "dark" });
      setTimeout(() => {
        localStorage.removeItem("resetToken");
        router.push("/login");
      }, 2000);
    } catch (err) {
      toast.error("❌ Failed to reset password", { theme: "dark" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Enter new password"
            className={`w-full px-4 py-2 pr-10 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirm new password"
            className={`w-full px-4 py-2 pr-10 rounded-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
      >
        Reset Password
      </button>
    </form>
  );
}

