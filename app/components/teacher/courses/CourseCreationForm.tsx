import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { ArrowRight } from "lucide-react";
import { api } from "@/app/lib/axios";
import axios from "axios"; // Import axios for making API calls
import { CourseFormData, courseSchema } from "@/app/schemas/course.schema"; // Define your validation schema for course
import ThumbnailImageUpload from "./ThumbnailImageUpload";

export default function CourseForm() {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
  });

  const handlePreview = (files: FileList | null) => {
    if (!files?.[0]) return;
    setThumbnail(files[0]);
  };

  const handleSubmitForm = async (data: CourseFormData) => {
  try {
    if (!data.thumbnail_img?.[0]) {
      toast.error("Thumbnail image is required!", { theme: "dark" });
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("thumbnail_url", data.thumbnail_img[0]); // Ensure the key matches the backend
    tags.forEach((tag) => {
      if (tag.trim()) {
        formData.append("tag_names", tag.trim());
      }
    });

    setLoading(true);

    const response = await api.post("/courses/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    
    toast.success("✅ Course created successfully", { theme: "dark" });

  } catch (error) {
    console.error("Error creating course", error);

    if (axios.isAxiosError(error)) {
      
      toast.error(`Error creating course: ${error.response?.data || error.message}`, { theme: "dark" });
    } else {

      toast.error("Error creating course", { theme: "dark" });
    }
  } finally {
    setLoading(false);
  }
};


  return (
  <form
    onSubmit={handleSubmit(handleSubmitForm)}
    className="space-y-6 bg-[#1e293b] p-8 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-40 border border-white/10"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Course Title</label>
        <input
          {...register("title")}
          className="p-3 rounded-lg bg-[#334155] text-white border border-white/10 
                     focus:outline-none focus:border-purple-500 transition"
          placeholder="Course Title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Price</label>
        <input
          {...register("price")}
          type="number"
          className="p-3 rounded-lg bg-[#334155] text-white border border-white/10 
                     focus:outline-none focus:border-purple-500 transition"
          placeholder="Course Price"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Tags</label>
        <input
        value={tags.join(", ")}  
        onChange={(e) =>
        setTags(e.target.value.split(",").map(tag => tag.trim()))
  }
  placeholder="Enter tags separated by commas"
  className="p-3 rounded-lg bg-[#334155] text-white border border-white/10 focus:outline-none focus:border-purple-500 transition"
/>

      </div>

      <div className="flex flex-col">
        <label className="text-white text-sm mb-1">Thumbnail Image</label>
        <ThumbnailImageUpload
          register={register}
          handlePreview={handlePreview}
        />
      </div>

    </div>

    <div className="flex flex-col">
      <label className="text-white text-sm mb-1">Description</label>
      <textarea
        {...register("description")}
        className="w-full p-3 rounded-lg bg-[#334155] text-white 
                   border border-white/10 focus:outline-none 
                   focus:border-purple-500 transition"
        placeholder="Course Description"
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
                 transition disabled:opacity-60"
    >
      {loading ? "Creating..." : "Create Course"}
      <ArrowRight className="inline ml-2" size={18} />
    </button>
  </form>
);

}
