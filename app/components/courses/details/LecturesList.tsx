// components/LecturesList.tsx
import { VideoOff } from "lucide-react";

interface Lecture {
  id: number | string;
  title: string;
  duration?: string; 
}

interface LecturesListProps {
  lectures: Lecture[];
}

export default function LecturesList({ lectures }: LecturesListProps) {
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
          className="flex items-center justify-between p-4 bg-[#111827] rounded-lg hover:bg-[#1f2937] transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-purple-500 font-medium">🎬</span>
            <h4 className="text-white font-medium">{lecture.title}</h4>
          </div>
          {lecture.duration && (
            <span className="text-gray-400 text-sm">{lecture.duration}</span>
          )}
        </div>
      ))}
    </div>
  );
}
