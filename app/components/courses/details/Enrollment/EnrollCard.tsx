import { Course } from "@/app/types/course.type";

interface Props {
  course: Course;
}

export default function EnrollCard({ course }: Props) {
  return (
    <div className="sticky top-24 bg-gradient-to-b from-[#0f172a] to-[#020617] border border-white/10 rounded-2xl p-6 shadow-xl">
      <span className="text-3xl font-bold text-green-400 block">
        ৳ {course.price.toLocaleString()}
      </span>

      <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition">
        Enroll Now
      </button>

      <ul className="mt-6 space-y-3 text-sm text-gray-300">
        <li>✔ Full lifetime access</li>
        <li>✔ Certificate of completion</li>
        <li>✔ Beginner friendly</li>
        <li>✔ Real-world projects</li>
      </ul>
    </div>
  );
}
