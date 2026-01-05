'use client'
import { useState } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../lib/axios";
import {
    loginSchema,
    type LoginFormData,
} from "../schemas/login.schema";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
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
    const response = await api.post(
      "auth/login",
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );

    toast.success("✅ Login Successful", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });

    // 👉 Redirect to dashboard
    router.push("/dashboard");

  } catch (err: any) {
    const message =
      err.response?.status === 401
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
    <ToastContainer/>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-white text-center mb-6">
            EDUWAVE Login
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500
                  ${errors.email ? "border border-red-500" : ""}`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${errors.password ? "border border-red-500" : ""}`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-4">
            Not registered?{" "}
            <Link href="/register" className="text-indigo-500 hover:text-indigo-400">
              Register
            </Link>
          </p>

          <p className="text-sm text-gray-400 text-center mt-6">
            © {new Date().getFullYear()} EduWave LMS Platform
          </p>
        </div>
      </div>
    </>
  );
}
