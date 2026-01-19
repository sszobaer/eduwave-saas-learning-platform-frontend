"use client";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import LectureForm from "./LectureCreationForm"; // Import the CourseForm component

interface Props {
  courseId: number;
}

export default function ActionBar({courseId}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false); // State to show/hide the course creation form

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateClick = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  return (
    <div className="flex flex-col gap-4 px-8 py-4 border-b border-white/10">
      <div className="flex justify-between items-center">
        {/* Search Bar */}
        <div className="flex items-center gap-2 w-1/3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search lectures..."
            className="w-full p-2 rounded-lg bg-[#1e293b] text-white border border-white/10 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg text-white font-semibold hover:bg-purple-600 transition"
        >
          <FaPlus className="text-xl" /> Create New Lecture
        </button>
      </div>

      {/* Conditional rendering for Course Form */}
      {showForm && <LectureForm courseId={courseId} />}
    </div>
  );
}
