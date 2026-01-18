import { Course } from "@/app/types/course.type";
import { User } from "lucide-react";

interface Props {
  course: Course;
}

export default function CourseMeta({ course }: Props) {
  return (
    <div className="bg-gradient-to-b from-[#0f172a] to-[#020617] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400">
          <User />
        </div>

        <div>
          <p className="text-xs text-gray-400">Instructor</p>
          <p className="font-semibold text-white">
            {course.created_by_user.full_name}
          </p>
        </div>
      </div>
    </div>
  );
}
