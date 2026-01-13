"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { ArrowRight, Mail } from "lucide-react";

import PasswordInput from "./PasswordInput";
import RoleSelect from "./RoleSelect";
import { RegisterFormData, registerSchema } from "@/app/schemas/auth.schema";
import { api } from "@/app/lib/axios";
import ProfileImageUpload from "./ProfileImageUpload";

export default function RegisterForm() {
  const [roles, setRoles] = useState<{ role_id: number; role_name: string }[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    api.get("/role/getall").then((res) => {
      setRoles(
        res.data.filter(
          (r: any) => r.role_name !== "ADMIN"
        )
      );
    });
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      if (!data.profile_img?.[0]) {
        toast.error("Profile image is required!", { theme: "dark" });
        return;
      }

      const formData = new FormData();
      formData.append("full_name", data.full_name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role_name", data.role_name);
      formData.append("profile_img", data.profile_img[0]);

      await api.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Registration Successful", { theme: "dark" });
    } catch {
      toast.error("Registration failed", { theme: "dark" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 text-gray-500" size={20} />
          <input
            {...register("full_name")}
            className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-700 text-white"
            placeholder="John Doe"
          />
        </div>
        {errors.full_name && (
          <p className="text-red-500 text-sm">{errors.full_name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 text-gray-500" size={20} />
          <input
            {...register("email")}
            className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-700 text-white"
            placeholder="name@example.com"
          />
        </div>
      </div>

      <PasswordInput register={register} error={errors.password} />
      <RoleSelect register={register} roles={roles} error={errors.role_name} />
      <ProfileImageUpload register={register} />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold flex items-center justify-center gap-2"
      >
        Sign Up <ArrowRight size={20} />
      </button>
    </form>
  );
}
