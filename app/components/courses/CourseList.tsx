
import { Course } from "@/app/types/course.type";
import CourseCard from "./CourseCard";

interface Props {
  courses: Course[];
}

export default function CourseList({ courses }: Props) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map(course => (
        <CourseCard key={course.course_id} course={course} />
      ))}
    </div>
  );
}
