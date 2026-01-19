import { Enrollment } from "@/app/types/student.type";

const CoursesTab = ({ enrollments }: { enrollments: Enrollment[] }) => {
  const safeEnrollments = Array.isArray(enrollments) ? enrollments : [];

  if (!safeEnrollments.length) {
    return (
      <p className="text-gray-400">
        You have not enrolled in any courses yet.
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {safeEnrollments.map(e => (
        <div
          key={e.enrollment_id}
          className="bg-gray-900 border border-gray-800 rounded-xl p-4"
        >
          <h3 className="font-bold text-lg">{e.course?.title}</h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-3">
            {e.course?.description}
          </p>
          <p className="mt-3 text-green-400 font-semibold">
            ${e.course?.price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CoursesTab;
