import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-[#020617] to-[#0f172a] border-r border-white/10 p-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-10">
        EduWave Teacher
      </h2>

      <nav className="space-y-4 text-sm">
        <Link href="/dashboard/teacher" className="block hover:text-purple-400">
          Dashboard
        </Link>
        <Link href="/dashboard//teacher/courses" className="block hover:text-purple-400">
          Courses
        </Link>
        <Link href="/dashboard/teacher/students" className="block hover:text-purple-400">
          Students
        </Link>
        <Link href="/dashboard//teacher/quizes" className="block hover:text-purple-400">
          Quizes
        </Link>
        <Link href="/dashboard/teacher/earning" className="block hover:text-purple-400">
          Earnings
        </Link>
        <Link href="/dashboard/teacher/settings" className="block hover:text-purple-400">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
