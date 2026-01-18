// components/CourseCurriculum.tsx

import { Lecture } from "@/app/types/lecture.type";
import LecturesList from "./LecturesList";


interface CourseCurriculumProps {
  lectures: Lecture[];
}

export default function CourseCurriculum({ lectures }: CourseCurriculumProps) {
  return (
    <div className="bg-gradient-to-b from-[#0f172a] to-[#020617] border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
      <LecturesList lectures={lectures} />
    </div>
  );
}
