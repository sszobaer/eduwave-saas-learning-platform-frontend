import { Course } from "@/app/types/course.type";

interface Props {
  course: Course;
}

export default function CourseHero({ course }: Props) {
  const imageUrl = `http://localhost:3000${course.thumbnail_url}`;

  return (
    <div className="relative h-[380px] overflow-hidden">
      <img
        src={imageUrl}
        alt={course.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-end pb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {course.title}
          </h1>
          <p className="text-gray-300 max-w-2xl">
            {course.description}
          </p>

          {/* tags */}
          <div className="flex gap-2 mt-4">
            {course.tags?.map(tag => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-purple-600/20 text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
