"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    registerSchema,
    type RegisterFormData,
} from "../schemas/auth.schema"
import { toast, ToastContainer } from "react-toastify";
import { api } from "../lib/axios";
import { ArrowRight, Eye, EyeOff, GraduationCap, Lock, Mail, Image } from "lucide-react";
import Footer from "../components/footer";

export default function RegisterPage() {
    const [preview, setPreview] = useState<string | null>(null);
    const [roles, setRoles] = useState<{ role_id: number; role_name: string }[]>([]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const getRoles = async () => {
            try {
                const res = await api.get("/role/getall");
                const filteredRoles = res.data.filter(
                    (role: { role_id: number; role_name: string }) =>
                        role.role_name.toLowerCase() !== "admin" && Boolean(role.role_id)
                );
                setRoles(filteredRoles);
            } catch (err) {
                console.error("Failed to fetch roles:", err);
            }
        };
        getRoles();
    }, []);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            if (!data.profile_img || !data.profile_img[0]) {
                toast.error("Profile image is required!", { theme: "dark" });
                return;
            }
            const formData = new FormData();
            formData.append("full_name", data.full_name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("role_name", data.role_name);
            formData.append("profile_img", data.profile_img[0]);

            await api.post("auth/register", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("✅ Registration Successful", { theme: "dark" });

        } catch (err: any) {
            console.error("Registration Error: ", err.response?.data || err.message);
            toast.error("Registration failed. Check console for details.", { theme: "dark" });
        };
    }

    const handleImagePreview = (fileList: FileList | null) => {
        if (!fileList || !fileList[0]) return;
        setPreview(URL.createObjectURL(fileList[0]));
    };

    return(
        <>
        <Navbar/>
        <ToastContainer />
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
                Register Now
              </h1>
              <p className="text-gray-400">
                Join thousands of learners and start your journey today
              </p>
            </div>

            {/* Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="text-gray-500" size={20} />
                    </div>
                    <input
                      type="text"
                      {...register("full_name")}
                      className={`w-full px-4 py-2 pl-10 rounded-lg bg-gray-700 text-white
                        ${errors.full_name ? "border border-red-500" : ""}`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.full_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

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
                        ${errors.email ? "border border-red-500" : ""}`}
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
                        ${errors.password ? "border-red-500" : ""}`}
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

                {/* Role Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Role
                  </label>
                  <select
                    {...register("role_name")}
                    className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white
                      ${errors.role_name ? "border border-red-500" : ""}`}
                  >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role.role_id} value={role.role_name}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>
                  {errors.role_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.role_name.message}
                    </p>
                  )}
                </div>

                {/* Profile Image Upload */}
                {/* Profile Image */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Profile Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("profile_img")}
                                onChange={(e) => handleImagePreview(e.target.files)}
                                className="w-full text-gray-200"
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mt-2 w-24 h-24 rounded-full object-cover border border-gray-600"
                                />
                            )}
                        </div>


                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg
                    hover:from-blue-700 hover:to-purple-700 transition-all
                    font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Sign Up</span>
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
            {/* Sign up */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Already Have an Account?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
          </div>
        </div>
        <Footer/>
        </>
    )
}
