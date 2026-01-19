import { ArrowRight, BookOpen, Star } from "lucide-react";
import { Course } from "@/app/types/course.type";
import { CourseReview } from "@/app/types/courseReview.type";
import Link from "next/link";

interface Props {
  course: Course;
  reviews: CourseReview[];
}

export default function CourseCard({ course, reviews }: Props) {
  const imageUrl = `http://localhost:3000${course.thumbnail_url}`;

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const reviewCount = reviews.length;

  return (
    <div className="group bg-gradient-to-b from-[#0f172a] to-[#020617] border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-900/30 transition-all duration-300 h-[420px] flex flex-col">

      {/* Thumbnail */}
      <div className="relative h-44 shrink-0">
        <img
          src={imageUrl}
          alt={course.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {course.tags?.[0] && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {course.tags[0]}
          </span>
        )}

        <div className="absolute top-3 right-3 bg-black/40 p-2 rounded-full">
          <BookOpen className="text-purple-400" size={18} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
          {course.title}
        </h3>

        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-purple-600/20 text-purple-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          {/* Rating Display - ADD THIS */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-white font-semibold ml-1">{averageRating}</span>
          </div>
          <span className="text-sm text-gray-400">({reviewCount} reviews)</span>
        </div>

          <div className="text-right">
            <span className="text-lg font-bold text-green-400 block">
              ৳ {Number(course.price).toLocaleString()}
            </span>


            <Link href={`/dashboard/teacher/courses/${course.course_id}`}>
              <button className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition">
                Details
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}









