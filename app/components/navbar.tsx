"use client";

import React, { useState, useContext } from "react";
import { Menu, X, GraduationCap, LogOut } from "lucide-react";
import Link from "next/link";
import { AuthContext } from "@/app/context/AuthContext";
import { logout } from "@/app/services/logout.service";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { user, setUser } = useContext(AuthContext);

  const profileImg = user?.profile_img
    ? `http://localhost:3000${user.profile_img}`
    : "/default-avatar.png";

  const getDashboardPath = () => {
    if (!user || !user.role?.role_name) return "/login";
    switch (user.role?.role_name) {
      case "ADMIN":
        return "/dashboard/admin";
      case "TEACHER":
        return "/dashboard/teacher";
      case "STUDENT":
        return "/dashboard/student";
      default:
        return "/login";
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setProfileDropdownOpen(false);
      setIsMenuOpen(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-[#020617] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <GraduationCap className="text-white" size={26} />
            </div>
            <Link
              href="/"
              className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              EduWave
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/courses"
              className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition"
            >
              About
            </Link>

            {!user ? (
              <Link
                href="/login"
                className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-lg shadow-purple-900/30"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 border border-white/10 rounded-lg p-1 hover:bg-white/5 transition"
                >
                  <img
                    src={profileImg}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-200 font-medium">{user.full_name}</span>
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-white/10 rounded-lg shadow-lg z-50">
                    <Link
                      href={getDashboardPath()}
                      className="block px-4 py-2 text-gray-200 hover:bg-white/5 transition"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-200 hover:bg-white/5 transition flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 border-t border-white/10 pt-4 space-y-2">
            <Link
              href="/courses"
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {!user ? (
              <Link
                href="/login"
                className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  href={getDashboardPath()}
                  className="block px-4 py-3 text-gray-200 hover:bg-white/5 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-gray-200 hover:bg-white/5 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
