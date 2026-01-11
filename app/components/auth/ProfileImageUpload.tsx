import { useState } from "react";

export default function ProfileImageUpload({ register }: any) {
  const [preview, setPreview] = useState<string | null>(null);

  const handlePreview = (files: FileList | null) => {
    if (!files?.[0]) return;
    setPreview(URL.createObjectURL(files[0]));
  };

  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">
        Profile Image
      </label>
      <input
        type="file"
        accept="image/*"
        {...register("profile_img")}
        onChange={(e) => handlePreview(e.target.files)}
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
