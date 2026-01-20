"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { logout } from "@/app/services/logout.service";
import { Play } from "lucide-react";

export default function Topbar() {
  const { user, setUser, loading } = useContext(AuthContext);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const profileImg = user?.profile_img
    ? `http://localhost:3000${user.profile_img}`
    : "/default-avatar.png";

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Failed to logout");
    }
  };

  // Safe initials
  const userInitials =
    user?.full_name?.split(" ").map(n => n[0]).join("")?.toUpperCase() || "ST";

  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-white/10 relative">
      <h1 className="text-xl font-semibold">STUDENT Dashboard</h1>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* User Profile */}
        <div className="relative flex items-center gap-2 cursor-pointer">
          <span className="text-sm text-gray-400">
            {loading ? "Loading..." : user?.full_name || "STUDENT"}
          </span>

          {loading ? (
            <div className="h-9 w-9 rounded-full bg-gray-300 animate-pulse" />
          ) : (
            <img
              src={profileImg}
              alt={user?.full_name || "STUDENT"}
              className="h-9 w-9 rounded-full object-cover border-2 border-gray-200"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            />
          )}

          {/* Dropdown */}
          {profileDropdownOpen && !loading && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => (window.location.href = "/profile")}
              >
                View Profile
              </button>
             <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 transition-colors"
                onClick={handleLogout}
              >
                Logout 
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
