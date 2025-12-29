import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <span className="text-2xl font-bold text-indigo-500 cursor-pointer">
              EDUWAVE
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="flex space-x-6 items-center">
            <Link href="/" className="hover:text-indigo-400">
              Home
            </Link>
            <Link href="/courses" className="hover:text-indigo-400">
              Courses
            </Link>
            <Link href="/about" className="hover:text-indigo-400">
              About
            </Link>
            <Link
              href="/login"
              className="bg-indigo-600 px-4 py-1 rounded hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
