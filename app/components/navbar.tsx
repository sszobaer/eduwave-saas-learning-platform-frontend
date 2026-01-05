"use client";

import React, { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <GraduationCap className="text-white" size={28} />
            </div>
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              EduWave
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/courses"
              className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium hover:bg-gray-900"
            >
              Courses
            </Link>

            <Link
              href="/about"
              className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium hover:bg-gray-900"
            >
              About
            </Link>

            <Link
              href="../login"
              className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-blue-900/50"
            >
              login
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800 mt-2 pt-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-200 font-medium py-3 px-4 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <Link
                href="/courses"
                className="text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-200 font-medium py-3 px-4 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>

              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-center shadow-lg shadow-blue-900/50 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}