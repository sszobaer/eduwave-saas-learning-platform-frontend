// app/components/student/ProgressTab.tsx
import { Enrollment } from "@/app/types/student.type";
import { 
  BarChart3, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  User, 
  Clock,
  Target,
  Zap,
  Award,
  CheckCircle2
} from "lucide-react";
import { useRouter } from "next/navigation";

const ProgressTab = ({ enrollments }: { enrollments: Enrollment[] }) => {
  const router = useRouter();
  const safeEnrollments = Array.isArray(enrollments) ? enrollments : [];
  const totalCourses = safeEnrollments.length;
  
  const totalSpent = safeEnrollments.reduce((sum, e) => {
    const paid = e.payment?.amount ? Number(e.payment.amount) : Number(e.course.price);
    return sum + (isNaN(paid) ? 0 : paid);
  }, 0);

  if (!safeEnrollments.length) {
    return (
      <div className="mt-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-dashed border-gray-700 rounded-2xl p-16 text-center">
          {/* Animated background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative z-10 max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce shadow-2xl">
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              No Progress to Track Yet
            </h3>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Enroll in courses to start tracking your learning progress and unlock achievements!
            </p>
            <button
              onClick={() => router.push("/courses")}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Start Learning
                <Target className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const averagePrice = totalCourses > 0 ? totalSpent / totalCourses : 0;

  return (
    <div className="space-y-6 mt-6">
      {/* Stats Overview Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 shadow-xl">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Overall Learning Statistics
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <MiniStatCard
              icon={BookOpen}
              label="Total Enrollments"
              value={totalCourses}
              description={`${totalCourses} ${totalCourses === 1 ? 'course' : 'courses'} enrolled`}
              gradient="from-blue-500 to-cyan-500"
              iconColor="text-blue-400"
            />
            <MiniStatCard
              icon={DollarSign}
              label="Total Investment"
              value={`$${totalSpent.toFixed(2)}`}
              description={`Avg: $${averagePrice.toFixed(2)}/course`}
              gradient="from-green-500 to-emerald-500"
              iconColor="text-green-400"
            />
            <MiniStatCard
              icon={Zap}
              label="Learning Status"
              value="Active"
              description="Currently learning"
              gradient="from-purple-500 to-pink-500"
              iconColor="text-purple-400"
            />
          </div>
        </div>
      </div>

      {/* Enrollment Timeline */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-pink-600/5 opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Enrollment Timeline
              </h3>
            </div>
            <span className="px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-full text-sm font-semibold border border-indigo-700">
              {totalCourses} Total
            </span>
          </div>

          <div className="space-y-4">
            {safeEnrollments.map((enrollment, index) => (
              <TimelineItem 
                key={enrollment.enrollment_id} 
                enrollment={enrollment} 
                index={index} 
                total={totalCourses} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Course Details Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {safeEnrollments.map((enrollment, index) => (
          <CourseProgressCard 
            key={enrollment.enrollment_id} 
            enrollment={enrollment} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

// Mini Stat Card Component
const MiniStatCard = ({
  icon: Icon,
  label,
  value,
  description,
  gradient,
  iconColor
}: {
  icon: any;
  label: string;
  value: string | number;
  description: string;
  gradient: string;
  iconColor: string;
}) => (
  <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 hover:bg-gray-800 transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-gray-600">
    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
    
    <div className="relative z-10">
      <Icon className={`w-8 h-8 ${iconColor} mb-3 group-hover:scale-110 transition-transform`} />
      <p className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wider">{label}</p>
      <p className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-1`}>
        {value}
      </p>
      <p className="text-gray-500 text-xs">{description}</p>
    </div>
  </div>
);

// Timeline Item Component
const TimelineItem = ({ 
  enrollment, 
  index, 
  total 
}: { 
  enrollment: Enrollment; 
  index: number; 
  total: number;
}) => {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div className="flex items-start gap-4 group">
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center pt-2">
        <div className="relative">
          <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-gray-900 z-10 group-hover:scale-125 transition-transform shadow-lg"></div>
          {isFirst && (
            <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></div>
          )}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gradient-to-b from-gray-600 to-gray-800 mt-2"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 hover:bg-gray-800 transition-all duration-300 border border-gray-700 group-hover:border-blue-600 group-hover:scale-[1.02] transform">
          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 pr-4">
                <h4 className="font-bold text-lg text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {enrollment.course?.title}
                </h4>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {enrollment.course?.description}
                </p>
              </div>
              {isFirst && (
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full font-bold shadow-lg animate-pulse">
                  Latest
                </span>
              )}
            </div>

            <div className="flex items-center gap-6 mt-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>
                  {new Date(enrollment.enrolled_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-bold">
                  ${Number(enrollment.course?.price).toFixed(2)}
                </span>
              </div>
              {enrollment.payment && (
                <span className="px-3 py-1 bg-green-600/20 text-green-400 text-xs rounded-full font-semibold border border-green-700">
                  ✓ Paid
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Course Progress Card Component
const CourseProgressCard = ({ 
  enrollment, 
  index 
}: { 
  enrollment: Enrollment; 
  index: number;
}) => {
  // Generate a random-ish progress for demo (you can replace with actual progress)
  const mockProgress = 30 + (index * 15) % 70;
  
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 hover:border-purple-700 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] transform">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg text-white mb-1 group-hover:text-purple-400 transition-colors line-clamp-2">
              {enrollment.course?.title}
            </h4>
            <p className="text-gray-400 text-xs line-clamp-2">
              {enrollment.course?.description}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400 font-medium">Progress</span>
            <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {mockProgress}%
            </span>
          </div>
          <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{ width: `${mockProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg">
            <User className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="text-sm text-gray-300 truncate">
              {enrollment.course?.created_by_user?.full_name || "Instructor"}
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg">
            <Calendar className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="text-sm text-gray-300">
              {new Date(enrollment.enrolled_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-1">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="font-bold text-green-400">
              ${Number(enrollment.course?.price).toFixed(2)}
            </span>
          </div>
          {enrollment.payment && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-600/20 border border-green-700 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs font-bold">
                Paid: ${enrollment.payment.amount}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Achievement badge (appears on certain progress milestones) */}
      {mockProgress >= 50 && (
        <div className="absolute top-4 right-4">
          <div className="relative">
            <Award className="w-8 h-8 text-yellow-400 animate-bounce" />
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add shimmer animation to your global CSS or Tailwind config
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;

export default ProgressTab;