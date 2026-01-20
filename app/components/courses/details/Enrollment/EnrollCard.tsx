"use client";
import { AuthContext } from "@/app/context/AuthContext";
import { api } from "@/app/lib/axios";
import { Course } from "@/app/types/course.type";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

interface Props {
  course: Course;
}

export default function EnrollCard({ course }: Props) {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  const link = `/courses/enrollment/${course.course_id}`;

  const onSubmit = async () => {
    if (user === null) {
      router.push("/login");
      return;
    }

    const studentId = Number(user.user_id);
    const courseId = Number(course.course_id);

    console.log(studentId, courseId);

    if (!studentId || studentId <= 0 || !courseId || courseId <= 0) {
      console.error("Invalid student ID or course ID");
      setError("Already Enroll this Course");
      return;
    }

    try {
      const response = await api.post(
        "/enrollment/create",
        {
          student_user_id: studentId,
          course_id: courseId,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Enrollment payload:", {
        student_user_id: studentId,
        course_id: courseId,
      });
      
      router.push(`/courses/enrollment/${course.course_id}`);

    } catch (err) {
      console.error(err);
      setError("Already Enroll this Course...");
    }
  };


  return (
    <div className="sticky top-24 bg-gradient-to-b from-[#0f172a] to-[#020617] border border-white/10 rounded-2xl p-6 shadow-xl">
      <span className="text-3xl font-bold text-green-400 block">
        ৳ {course.price.toLocaleString()}
      </span>

      {/* On click, router will push after enrollment */}
      <button
        onClick={onSubmit}
        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition"
      >
        Enroll Now
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <ul className="mt-6 space-y-3 text-sm text-gray-300">
        <li>✔ Full lifetime access</li>
        <li>✔ Certificate of completion</li>
        <li>✔ Beginner friendly</li>
        <li>✔ Real-world projects</li>
      </ul>
    </div>
  );
}
