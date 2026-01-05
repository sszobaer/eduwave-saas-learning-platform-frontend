"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../lib/axios";
import {
  loginSchema,
  type LoginFormData,
} from "../schemas/login.schema";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Footer from "../components/footer";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await api.post(
        "auth/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      toast.success("✅ Login Successful", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });

      router.push("/dashboard");
    } catch (err: any) {
      const message =
        err.response?.status === 400
          ? "❌ Email or password is wrong"
          : "❌ Login failed";

      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

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

        <div className="relative w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
                <GraduationCap className="text-white" size={32} />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                EduWave
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-500" size={20} />
                  </div>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full px-4 py-2 pl-10 rounded-lg bg-gray-700 text-white
                      ${errors.email ? "border border-red-500" : ""}
                    `}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-500" size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`w-full bg-black border border-gray-700 text-white rounded-lg
                      pl-10 pr-12 py-3 focus:outline-none
                      ${errors.password ? "border-red-500" : ""}
                    `}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
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

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 bg-black border-gray-700 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-400">
                    Remember me
                  </span>
                </div>
                <Link
                  href="#"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg
                  hover:from-blue-700 hover:to-purple-700 transition-all
                  font-semibold flex items-center justify-center space-x-2"
              >
                <span>Sign In</span>
                <ArrowRight size={20} />
              </button>
            </form>
          </div>

          {/* Sign up */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
