"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    registerSchema,
    type RegisterFormData,
    roles,
} from "../schemas/auth.schema"
import { toast, ToastContainer } from "react-toastify";
import { api } from "../lib/axios";


export default function RegisterPage() {
    const [preview, setPreview] = useState<string | null>(null);

    const [roles, setRoles] = useState<{ role_id: number; role_name: string }[]>([]);

    useEffect(() => {
        const getRoles = async () => {
            try {
                const res = await api.get("/role/getall");
                // console.log(res.data);

                const filteredRoles = res.data.filter(
                    (role: { role_id: number; role_name: string }) =>
                        role.role_name.toLowerCase() !== "admin" && Boolean(role.role_id)
                );

                console.log("Filtered roles:", filteredRoles);
                setRoles(filteredRoles);
            } catch (err) {
                console.error("Failed to fetch roles:", err);
            }
        };

        getRoles();
    }, []);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            if (!data.profile_img || !data.profile_img[0]) {
                toast.error("Profile image is required!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
            const formData = new FormData();
            formData.append("full_name", data.full_name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("role_name", data.role_name);
            formData.append("profile_img", data.profile_img[0]);

            //Posting to backend
            const response = await api.post("auth/register", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            //console.log("Response: ", response.data);

            toast.success('✅Registration Successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        } catch (err: any) {
            console.error("Registration Error: ", err.response?.data || err.message);
            toast.error('Registration failed. Check console for details.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        };
    }

    const handleImagePreview = (fileList: FileList | null) => {
        if (!fileList || !fileList[0]) return;
        setPreview(URL.createObjectURL(fileList[0]));
    };

    return (
        <>
            <ToastContainer />
            <Navbar />

            <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
                <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-lg p-10">
                    <h1 className="text-3xl font-bold text-white text-center mb-8">
                        Register
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                {...register("full_name")}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.full_name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.full_name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter a strong password"
                                {...register("password")}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

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

                        {/* Role */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Role
                            </label>
                            <select
                                {...register("role_name")}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="" disabled>Select a role</option>
                                {roles.map(role => (
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
