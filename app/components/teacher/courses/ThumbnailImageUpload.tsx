"use client";

import { useState } from "react";

export default function ThumbnailImageUpload({ register, handlePreview }: any) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handlePreview(e.target.files);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1"></label>
      <input
        type="file"
        accept="image/*"
        {...register("thumbnail_img")}
        onChange={handleFileChange}
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
  );
}
