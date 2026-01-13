import { Course } from "@/app/types/course.type";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const imageUrl = `http://localhost:3000${course.thumbnail_url}`;

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">

      {/* Image */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={course.title}
          className="h-full w-full object-cover"
        />

        {/* Category badge */}
        <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-semibold px-3 py-1 rounded-full">
          Course
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
          {course.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-purple-400 font-bold">
            ৳ {course.price}
          </span>

          <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
