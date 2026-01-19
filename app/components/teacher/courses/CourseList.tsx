
import { Course } from "@/app/types/course.type";
import { CourseReview } from "@/app/types/courseReview.type";
import CourseCard from "./CourseCard";

interface Props {
  courses: Course[];
  courseReviews: CourseReview[];
  searchTerm: string;
}

export default function CourseList({ courses, courseReviews, searchTerm }: Props) {
    const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredCourses.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">
        No courses found
      </p>
    );
  }
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCourses.map((course) => {
        // Find reviews related to this course
        const reviewsForCourse = courseReviews.filter(
          (review) => review.course.course_id === course.course_id
        );

        return (
          <CourseCard key={course.course_id} course={course} reviews={reviewsForCourse} />
        );
      })}
    </div>
  );
}
