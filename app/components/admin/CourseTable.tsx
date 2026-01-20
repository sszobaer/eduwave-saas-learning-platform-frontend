import { api } from "@/app/lib/axios";
import { Course } from "@/app/types/course.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  courses: Course[];
  onDelete?: (id: number) => void;
}

export default function CourseTable({ courses, onDelete }: Props) {
  const router = useRouter();
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (courseId: number) => {
    router.push(`/dashboard/admin/courses/edit/${courseId}`);
  };

  const handleDelete = async (courseId: number) => {
    try {
      setLoading(true);
      await api.delete(`admin/courses/${courseId}`);
      onDelete?.(courseId);
    } catch (err: any) {
      console.error(
        "Failed to delete course:",
        err.response?.data?.message || err.message
      );
      alert(err.response?.data?.message || "Failed to delete course");
    } finally {
      setLoading(false);
      setConfirmId(null); 
    }
  };

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden relative">
      <table className="w-full text-sm">
        <thead className="bg-[#020617]">
          <tr className="text-left text-gray-400">
            <th className="p-4">Title</th>
            <th className="p-4">Price</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr
              key={course.course_id}
              className="border-t border-white/5 hover:bg-white/5 transition"
            >
              <td className="p-4">{course.title}</td>
              <td className="p-4">৳ {course.price}</td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => handleEdit(course.course_id)}
                  className="px-3 py-1 rounded bg-blue-500/20 text-blue-400"
                >
                  View
                </button>
                <button
                  onClick={() => setConfirmId(course.course_id)}
                  className="px-3 py-1 rounded bg-red-500/20 text-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {confirmId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#0e111b] p-6 rounded-xl w-80 text-center space-y-4">
            <h3 className="text-lg font-semibold">Are you sure?</h3>
            <p className="text-gray-400">
              Do you really want to delete this course? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                disabled={loading}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
