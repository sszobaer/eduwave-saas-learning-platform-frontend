"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";

export default function Topbar() {
  const { user, loading } = useContext(AuthContext);

  // Full URL or fallback
  const profileImg = user?.profile_img
    ? `http://localhost:3000${user.profile_img}`
    : "/default-avatar.png";

  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-white/10">
      <h1 className="text-xl font-semibold">Teacher Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">
          {loading ? "Loading..." : user?.full_name || "Teacher"}
        </span>

        {loading ? (
          <div className="h-9 w-9 rounded-full bg-gray-300 animate-pulse" />
        ) : (
          <img
            src={profileImg}
            alt={user?.full_name || "Teacher"}
            className="h-9 w-9 rounded-full object-cover"
          />
        )}
      </div>
    </header>
  );
}
