"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { logout } from "@/app/services/logout.service";
import { useAdminNotifications } from "@/app/hooks/useAdminNotifications";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const { user, setUser, loading } = useContext(AuthContext);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { notifications, clearNotifications } = useAdminNotifications();

  const profileImg = user?.profile_img
    ? `http://localhost:3000${user.profile_img}`
    : "/default-avatar.png";

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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

  return (
    <header className="relative z-50 flex justify-between items-center px-8 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg" >

      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {user?.role?.role_name === "ADMIN" && (
          <div className="relative">
            <button
              className="relative p-2 rounded-full hover:bg-gray-700 transition-colors"
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            >
              <Bell className="h-6 w-6 text-gray-200" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-ping" />
              )}
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
              )}
            </button>

            <AnimatePresence>
              {notifDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50"
                >
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map((n) => (
                        <div
                          key={n.userId}
                          className="p-3 border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <p className="text-sm font-semibold">{n.fullName}</p>
                          <p className="text-xs text-gray-500">{n.email}</p>
                          <p className="text-xs text-gray-400">
                            Registered at{" "}
                            {new Date(n.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                      <button
                        className="w-full text-center py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => clearNotifications()}
                      >
                        Clear All
                      </button>
                    </>
                  ) : (
                    <div className="p-3 text-center text-sm text-gray-500">
                      No notifications
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* User Profile */}
        <div className="relative">
          <span className="text-sm text-gray-400">
            {loading ? "Loading..." : user?.full_name || "Admin"}
          </span>

          {loading ? (
            <div className="h-9 w-9 rounded-full bg-gray-300 animate-pulse" />
          ) : (
            <img
              src={profileImg}
              alt={user?.full_name || "Admin"}
              className="h-9 w-9 rounded-full object-cover cursor-pointer border-2 border-gray-200"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            />
          )}

          {profileDropdownOpen && !loading && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  router.push("/dashboard/admin/profile");
                }}
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
