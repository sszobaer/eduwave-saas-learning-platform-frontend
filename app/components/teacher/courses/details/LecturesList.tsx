// components/courses/details/LecturesList.tsx
import { VideoOff, Play } from "lucide-react";
import { useState } from "react";

interface Lecture {
  id: number | string;
  title: string;
  duration?: string;
  video_url?: string;
}

interface LecturesListProps {
  lectures: Lecture[];
  onLectureClick: (lecture: Lecture) => void;  // Callback to parent
  selectedLectureId?: number | string;         // Currently playing
}

export default function LecturesList({ 
  lectures, 
  onLectureClick, 
  selectedLectureId 
}: LecturesListProps) {
  if (!lectures || lectures.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-14">
        <VideoOff size={46} className="text-purple-500 mb-4" />
        <h3 className="text-lg font-semibold text-white">
          No lectures uploaded yet
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          This course is newly created. Lessons will be added soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lectures.map((lecture) => (
        <div
          key={lecture.id}
          onClick={() => lecture.video_url && onLectureClick(lecture)}
          className={`flex items-center justify-between p-4 rounded-lg transition cursor-pointer
            ${selectedLectureId === lecture.id 
              ? 'bg-purple-900 border border-purple-500' 
              : 'bg-[#111827] hover:bg-[#1f2937]'
            }
            ${!lecture.video_url ? 'opacity-60 cursor-not-allowed' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            <span className="text-purple-500 font-medium">
              {selectedLectureId === lecture.id ? '▶️' : '🎬'}
            </span>
            <h4 className="text-white font-medium">{lecture.title}</h4>
          </div>
          <div className="flex items-center gap-4">
            {lecture.duration && (
              <span className="text-gray-400 text-sm">{lecture.duration}</span>
            )}
            {lecture.video_url && (
              <Play size={18} className="text-purple-400" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}