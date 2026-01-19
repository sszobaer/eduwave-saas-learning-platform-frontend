// components/LectureForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { ArrowRight } from "lucide-react";
import { api } from "@/app/lib/axios";
import axios from "axios";
import { LectureFormData, lectureSchema } from "@/app/schemas/lecture.schema";
import VideoUploadPreview from "./VideoUploadPreview";

interface LectureFormProps {
  courseId: number;
}

export default function LectureForm({ courseId }: LectureFormProps) {
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LectureFormData>({
    resolver: zodResolver(lectureSchema),
  });

  const handleFilePreview = (files: FileList | null) => {
    if (files?.[0]) {
      setVideoFile(files[0]);
    }
  };

  const onSubmit = async (data: LectureFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("lecture_video", data.lecture_video[0]); // Required file

      setLoading(true);

      await api.post(`/lectures/${courseId}/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Lecture created successfully!", { theme: "dark" });

      // Optional: reset form after success
       reset();
    } catch (error) {
      console.error("Error creating lecture", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          `Error: ${error.response?.data?.message || error.message}`,
          { theme: "dark" }
        );
      } else {
        toast.error("Failed to create lecture", { theme: "dark" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-[#1e293b] p-8 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-40 border border-white/10"
    >
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col">
          <label className="text-white text-sm mb-1">Lecture Title</label>
          <input
            {...register("title")}
            className="p-3 rounded-lg bg-[#334155] text-white border border-white/10 
                       focus:outline-none focus:border-purple-500 transition"
            placeholder="e.g., Introduction to React Hooks"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <VideoUploadPreview
          register={register}
          handlePreview={handleFilePreview}
        />
        {errors.title?.message && (
        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
         )}   
      </div>

      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Lecture Description</label>
        <textarea
          {...register("description")}
          rows={6}
          className="w-full p-3 rounded-lg bg-[#334155] text-white 
                     border border-white/10 focus:outline-none 
                     focus:border-purple-500 transition resize-none"
          placeholder="Describe what students will learn in this lecture..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 mt-6 bg-gradient-to-r from-blue-400 to-purple-500 
                   rounded-lg text-white font-semibold 
                   hover:from-blue-500 hover:to-purple-600 
                   transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? "Uploading & Creating..." : "Create Lecture"}
        <ArrowRight size={18} />
      </button>
    </form>
  );
}