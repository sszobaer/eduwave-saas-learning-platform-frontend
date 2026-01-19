import { Enrollment } from "@/app/types/student.type";

const ProgressTab = ({ enrollments }: { enrollments: Enrollment[] }) => {
  const safeEnrollments = Array.isArray(enrollments) ? enrollments : [];

  if (!safeEnrollments.length) {
    return (
      <p className="text-gray-400">
        No learning progress available yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {safeEnrollments.map(e => (
        <div
          key={e.enrollment_id}
          className="bg-gray-900 border border-gray-800 rounded-lg p-4"
        >
          <h4 className="font-semibold">{e.course?.title}</h4>
          <p className="text-gray-400 text-sm">
            Enrolled on {new Date(e.enrolled_at).toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProgressTab;
