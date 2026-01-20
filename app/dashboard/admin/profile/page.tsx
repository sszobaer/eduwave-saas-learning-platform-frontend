"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { ProfileItem } from "@/app/components/admin/Profile/ProfileItem";

export default function ProfilePage() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-300">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        User not found
      </div>
    );
  }

  const profileImg = user.profile_img
    ? `http://localhost:3000${user.profile_img}`
    : "/default-avatar.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] via-[#0F172A] to-[#020617] p-10 text-gray-100">
      
      {/* Profile Card */}
      <div className="
        max-w-4xl mx-auto
        rounded-3xl
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        shadow-2xl shadow-purple-900/40
        overflow-hidden
      ">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600/30 to-purple-400/10 p-10">
          <div className="flex items-center gap-8">
            
            {/* Avatar */}
            <div className="relative">
              <img
                src={profileImg}
                alt={user.full_name}
                className="
                  h-32 w-32 rounded-full object-cover
                  border-4 border-purple-400/40
                  shadow-lg shadow-purple-500/50
                "
              />
              <span className="absolute bottom-2 right-2 h-4 w-4 bg-green-500 rounded-full border-2 border-[#020617]" />
            </div>

            {/* Name & Role */}
            <div>
              <h1 className="text-3xl font-bold text-white">
                {user.full_name}
              </h1>

              <p className="text-purple-300 mt-1">
                {user.credential.email}
              </p>

              <span className="
                inline-block mt-3
                px-4 py-1 text-sm font-semibold
                rounded-full
                bg-purple-500/20
                text-purple-300
                border border-purple-400/30
              ">
                {user.role?.role_name}
              </span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <ProfileItem label="Full Name" value={user.full_name} />
          <ProfileItem label="Role" value={user.role?.role_name} />
          <ProfileItem
            label="Account Status"
            value={user.is_active ? true : false}
            badge
          />
          <ProfileItem
            label="Joined At"
            value={new Date(user.created_at).toLocaleDateString()}
          />
        </div>
      </div>
    </div>
  );
}
