"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { LoginFormData, loginSchema } from "@/app/schemas/login.schema";
import PasswordInput from "../auth/PasswordInput";
import { api } from "@/app/lib/axios";
import { AuthContext } from "@/app/context/AuthContext";

export default function LoginForm() {
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const { setUser } = useContext(AuthContext);
    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await api.post("/auth/login",
                { email: data.email, password: data.password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            setUser(res.data.user);
            localStorage.setItem("access_token", res.data.access_token);
            toast.success("✅ Login Successful", { theme: "dark" });
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        } catch (err: any) {
            toast.error(
                err.response?.status === 400
                    ? "❌ Email or password is wrong"
                    : err.response?.status === 401
                        ? "❌You have no permission to login wait for approval"
                        : "Login Failed",
                { theme: "dark" }
            );
        }
    };


    return (
        <>
            <ToastContainer />
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
                            className={`w-full px-4 py-2 pl-10 rounded-lg bg-gray-700 text-white ${errors.email ? "border border-red-500" : ""
                                }`}
                            placeholder="you@example.com"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <PasswordInput register={register} error={errors.password} />

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
                    <Link href="/forgotpassword" className="text-sm text-purple-400 hover:text-purple-300">
                        Forgot password?
                    </Link>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold flex items-center justify-center gap-2"
                >
                    Sign In <ArrowRight size={20} />
                </button>
            </form>
        </>
    );
}
