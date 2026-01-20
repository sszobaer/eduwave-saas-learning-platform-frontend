// app/components/student/CoursesTab.tsx
import { Enrollment } from "@/app/types/student.type";
import { 
  BookOpen, 
  User, 
  Calendar, 
  DollarSign, 
  Search, 
  Play,
  Star,
  Clock,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Award
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CoursesTab = ({ enrollments }: { enrollments: Enrollment[] }) => {
  const router = useRouter();
  const safeEnrollments = Array.isArray(enrollments) ? enrollments : [];
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  if (!safeEnrollments.length) {
    return (
      <div className="mt-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black border-2 border-dashed border-gray-700 rounded-3xl p-20 text-center">
          {/* Animated background elements */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-pink-600/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Animated icon */}
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-12 transition-transform duration-500">
                <Search className="w-16 h-16 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>

            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              No Courses Enrolled Yet
            </h3>
            <p className="text-gray-400 mb-4 text-xl leading-relaxed">
              Your learning journey starts here!
            </p>
            <p className="text-gray-500 mb-10 text-lg max-w-xl mx-auto">
              Browse our extensive catalog and enroll in courses that match your interests and career goals. Transform your future today!
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">1000+</p>
                <p className="text-xs text-gray-400">Courses</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <User className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-xs text-gray-400">Instructors</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-gray-400">Quality</p>
              </div>
            </div>

            <button
              onClick={() => router.push("/courses")}
              className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              <span className="relative flex items-center gap-3">
                Browse Available Courses
                <TrendingUp className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            My Enrolled Courses
          </h2>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            Manage and continue your {safeEnrollments.length} enrolled {safeEnrollments.length === 1 ? "course" : "courses"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-700 rounded-xl backdrop-blur-sm">
            <span className="text-blue-400 font-bold text-lg">{safeEnrollments.length}</span>
            <span className="text-gray-400 text-sm ml-2">{safeEnrollments.length === 1 ? "course" : "courses"}</span>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeEnrollments.map((enrollment, index) => (
          <CourseCard
            key={enrollment.enrollment_id}
            enrollment={enrollment}
            index={index}
            isHovered={hoveredCard === enrollment.enrollment_id}
            onHover={() => setHoveredCard(enrollment.enrollment_id)}
            onLeave={() => setHoveredCard(null)}
          />
        ))}
      </div>
    </div>
  );
};

// Enhanced Course Card Component
const CourseCard = ({
  enrollment,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  enrollment: Enrollment;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  // Generate mock progress (replace with real data)
  const mockProgress = 20 + (index * 18) % 80;
  
  // Color schemes for variety
  const gradients = [
    "from-blue-600 to-cyan-600",
    "from-purple-600 to-pink-600",
    "from-green-600 to-emerald-600",
    "from-orange-600 to-red-600",
    "from-indigo-600 to-purple-600",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:scale-105 transform cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}></div>

      {/* Thumbnail */}
      <div className="relative h-56 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        {enrollment.course?.thumbnail_url ? (
          <img
            src={enrollment.course.thumbnail_url}
            alt={enrollment.course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}>
            <BookOpen className="w-20 h-20 text-white/80 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
        
        {/* Floating badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className={`px-3 py-1.5 bg-gradient-to-r ${gradient} text-white text-xs font-bold rounded-full shadow-xl flex items-center gap-1 animate-pulse`}>
            <CheckCircle2 className="w-3 h-3" />
            Enrolled
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-xs font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Progress
              </span>
              <span className={`text-xs font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {mockProgress}%
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
                style={{ width: `${mockProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <h3 className="text-xl font-bold mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300" 
            style={{ backgroundImage: isHovered ? `linear-gradient(to right, var(--tw-gradient-stops))` : 'none' }}
            className={isHovered ? `bg-gradient-to-r ${gradient} bg-clip-text` : ''}>
          {enrollment.course?.title || "Untitled Course"}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 min-h-[4rem] leading-relaxed">
          {enrollment.course?.description || "No description available"}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-4 p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 group-hover:border-gray-600 transition-colors">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} bg-opacity-20`}>
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium">Instructor</p>
            <p className="text-sm text-white font-semibold truncate">
              {enrollment.course?.created_by_user?.full_name || "Unknown Instructor"}
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800/30 rounded-lg p-2">
            <Calendar className="w-3 h-3 text-blue-400 flex-shrink-0" />
            <span className="truncate">
              {new Date(enrollment.enrolled_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800/30 rounded-lg p-2">
            <Clock className="w-3 h-3 text-purple-400 flex-shrink-0" />
            <span>12h 30m</span>
          </div>
        </div>

        {/* Payment Status */}
        {enrollment.payment && (
          <div className="mb-4 p-3 bg-green-600/10 border border-green-700/50 rounded-xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs font-bold">
                Payment Confirmed: ${enrollment.payment.amount}
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-1">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="font-bold text-green-400 text-lg">
              {Number(enrollment.course?.price).toFixed(2)}
            </span>
          </div>
          <button className={`group/btn relative px-6 py-3 bg-gradient-to-r ${gradient} text-white rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl overflow-hidden`}>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
            
            <span className="relative flex items-center gap-2">
              Continue
              <Play className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500`}></div>
      
      {/* Star rating (mock) */}
      <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        <span className="text-white text-xs font-bold">4.8</span>
      </div>
    </div>
  );
};

export default CoursesTab;