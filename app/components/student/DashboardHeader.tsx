"use client";

import {
  LogOut,
  Settings,
  Bell,
  X,
  GraduationCap,
} from "lucide-react";
import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { logout } from "@/app/services/logout.service";

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    title: "New Course Available",
    message: "Advanced React Development is now available!",
    time: "2 hours ago",
    read: false,
    type: "info" as const,
  },
  {
    id: 2,
    title: "Assignment Reminder",
    message: "Your JavaScript assignment is due tomorrow",
    time: "5 hours ago",
    read: false,
    type: "warning" as const,
  },
];

const DashboardHeader = ({ user }: { user: any }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  // ✅ Outside click handler (FIXES BOTH ISSUES)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Failed to logout");
    }
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-gray-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold text-white">
            Student Dashboard
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="p-2 rounded-xl hover:bg-gray-800"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-xs text-white w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-xl shadow-xl z-50">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className="p-4 hover:bg-gray-800 cursor-pointer"
                  >
                    <p className="text-white font-semibold">
                      {notif.title}
                    </p>
                    <p className="text-sm text-gray-400">
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {notif.time}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-xl"
            >
              <span className="text-white font-semibold">
                {user.full_name.charAt(0).toUpperCase()}
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-xl z-50">
                <div className="p-4 border-b border-gray-800">
                  <p className="text-white font-semibold">
                    {user.full_name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.email}
                  </p>
                </div>

                <button className="w-full px-4 py-3 text-left hover:bg-gray-800 flex gap-2 text-gray-300">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left hover:bg-red-900/20 flex gap-2 text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
