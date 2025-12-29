"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Welcome to EDUWAVE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl"
        >
          Learn anything, anywhere, anytime. Join our platform to enhance your skills and grow your career.
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg text-white font-medium transition">
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Courses Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["React", "Next.js", "Tailwind CSS"].map((course, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{course} Course</h3>
              <p className="text-gray-400 mb-4">
                Learn the fundamentals and advanced concepts of {course}.
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition">
                Enroll Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <motion.div whileHover={{ y: -5 }} className="p-6 rounded-xl bg-gray-700 shadow-lg transition">
            <div className="text-indigo-500 text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className="text-gray-300">
              Learn from industry experts who have real-world experience.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="p-6 rounded-xl bg-gray-700 shadow-lg transition">
            <div className="text-indigo-500 text-4xl mb-4">💻</div>
            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
            <p className="text-gray-300">
              Learn at your own pace anytime, anywhere, on any device.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="p-6 rounded-xl bg-gray-700 shadow-lg transition">
            <div className="text-indigo-500 text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
            <p className="text-gray-300">
              Gain skills that help you get ahead in your professional life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-bold mb-6">Ready to start learning?</h2>
        <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg text-white font-medium transition">
          Join Now
        </Link>
      </section>
    </div>
  );
}
