// components/VideoUploadPreview.tsx
"use client";

import { useState } from "react";

export default function VideoUploadPreview({ register, handlePreview }: any) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handlePreview(e.target.files);
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">
        Upload Lecture Video <span className="text-red-400">*</span>
      </label>
      <input
        type="file"
        accept="video/*"
        required
        {...register("lecture_video")}
        onChange={handleFileChange}
        className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 
                   file:rounded-full file:border-0 file:text-sm file:font-semibold 
                   file:bg-purple-600 file:text-white hover:file:bg-purple-700"
      />
      {fileName && (
        <p className="mt-2 text-sm text-gray-400">Selected: {fileName}</p>
      )}
      {preview && (
        <video
          src={preview}
          controls
          className="mt-4 w-full max-w-2xl rounded-lg border border-gray-600 shadow-lg"
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}