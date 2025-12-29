"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const roles = ["STUDENT", "TEACHER", "ADMIN"] as const;

// Zod schema
const registerSchema = z.object({
    full_name: z
        .string()
        .max(20, "Full name must be at most 20 characters")
        .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[A-Z]).*$/, "Password must contain at least one uppercase letter"),
    profile_img: z
        .any()
        .optional(),
    role_name: z.enum(roles, { errorMap: () => ({ message: "Select a valid role" }) }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [preview, setPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
        console.log("Validated Form Data:", data);
        if (data.profile_img && data.profile_img[0]) {
            console.log("Uploaded file:", data.profile_img[0]);
        }
    };

    const handleImagePreview = (fileList: FileList | null) => {
        if (fileList && fileList[0]) {
            const file = fileList[0];
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
                <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-lg p-10">
                    <h1 className="text-3xl font-bold text-white text-center mb-8">Register</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                {...register("full_name")}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
                        </div>


                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>


                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Enter a strong password"
                                {...register("password")}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>


                        <div>
                            <label className="block border-gray text-sm text-gray-300 mb-1">Profile Image (Optional)</label>
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


                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Role</label>
                            <select
                                {...register("role_name")}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="" disabled>Select a role</option>
                                {roles.map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                            {errors.role_name && <p className="text-red-500 text-sm mt-1">{errors.role_name.message}</p>}
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-sm text-gray-400 text-center mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-500 hover:text-indigo-400">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
