// app/components/student/OverviewTab.tsx
import { BookOpen, DollarSign, TrendingUp, Award, Calendar, PlayCircle, Sparkles, Target } from "lucide-react";
import { Enrollment } from "@/app/types/student.type";
import { useRouter } from "next/navigation";

const OverviewTab = ({ enrollments }: { enrollments: Enrollment[] }) => {
  const router = useRouter();
  const safeEnrollments = Array.isArray(enrollments) ? enrollments : [];
  const totalCourses = safeEnrollments.length;

  const totalSpent = safeEnrollments.reduce((sum, e) => {
    const paid = e.payment?.amount
      ? Number(e.payment.amount)
      : Number(e.course.price);
    return sum + (isNaN(paid) ? 0 : paid);
  }, 0);

  const averagePrice = totalCourses > 0 ? totalSpent / totalCourses : 0;

  return (
    <div className="space-y-6 mt-6">
      {/* Animated Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl">
        {/* Animated background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-75"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-yellow-300 font-semibold text-sm uppercase tracking-wider">
              Learning Dashboard
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            {totalCourses === 0
              ? "Ready to Start Your Journey? 🚀"
              : `Amazing! ${totalCourses} ${totalCourses === 1 ? "Course" : "Courses"} in Progress! 🎓`}
          </h2>
          <p className="text-white/90 text-lg max-w-2xl">
            {totalCourses === 0
              ? "Explore thousands of courses and begin your transformation today!"
              : "Keep the momentum going! You're building incredible skills every day."}
          </p>
          {totalCourses === 0 && (
            <button
              onClick={() => router.push("/courses")}
              className="mt-6 group bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300"
            >
              <span className="flex items-center gap-2">
                Explore Courses
                <Target className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          icon={BookOpen}
          title="Total Courses"
          value={totalCourses}
          subtitle={totalCourses === 0 ? "Start your first course" : "Keep going strong!"}
          gradient="from-blue-500 via-blue-600 to-cyan-600"
          iconBg="from-blue-500/20 to-cyan-500/20"
          glowColor="blue"
          trend={totalCourses > 0 ? "+100%" : "0%"}
        />
        <StatCard
          icon={DollarSign}
          title="Total Invested"
          value={`$${totalSpent.toFixed(2)}`}
          subtitle={totalCourses > 0 ? `Avg: $${averagePrice.toFixed(2)}/course` : "No investment yet"}
          gradient="from-green-500 via-green-600 to-emerald-600"
          iconBg="from-green-500/20 to-emerald-500/20"
          glowColor="green"
          trend={totalSpent > 0 ? `${totalCourses} courses` : "0%"}
        />
        <StatCard
          icon={TrendingUp}
          title="Learning Status"
          value={totalCourses > 0 ? "Active" : "Ready"}
          subtitle={totalCourses > 0 ? "Currently enrolled" : "Ready to learn"}
          gradient="from-purple-500 via-purple-600 to-pink-600"
          iconBg="from-purple-500/20 to-pink-500/20"
          glowColor="purple"
          trend={totalCourses > 0 ? "Growing" : "Start"}
        />
      </div>

      {/* Recent Activity & Achievements Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity Card */}
        <div className="group relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 hover:border-blue-700 transition-all duration-300 overflow-hidden">
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-blue-400" />
                Recent Activity
              </h3>
              {safeEnrollments.length > 0 && (
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-semibold">
                  {safeEnrollments.length} courses
                </span>
              )}
            </div>

            {safeEnrollments.length > 0 ? (
              <div className="space-y-3">
                {safeEnrollments.slice(0, 5).map((enrollment, index) => (
                  <div
                    key={enrollment.enrollment_id}
                    className="group/item flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all duration-300 cursor-pointer hover:scale-[1.02] transform"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate group-hover/item:text-blue-400 transition-colors">
                        {enrollment.course?.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {new Date(enrollment.enrolled_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-green-400 font-bold text-sm bg-green-500/10 px-3 py-1 rounded-lg">
                      ${enrollment.course?.price}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-gray-600" />
                </div>
                <p className="text-gray-500 mb-4">No enrollments yet</p>
                <button
                  onClick={() => router.push("/courses")}
                  className="text-blue-400 hover:text-blue-300 text-sm font-semibold hover:underline transition-all"
                >
                  Explore Courses →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Achievements Card */}
        <div className="group relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 hover:border-yellow-700 transition-all duration-300 overflow-hidden">
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-600/5 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              {totalCourses > 0 ? "Your Achievements" : "Get Started"}
            </h3>

            {totalCourses > 0 ? (
              <div className="space-y-3">
                <AchievementBadge
                  title="First Step! 🎉"
                  description="Enrolled in your first course"
                  gradient="from-yellow-500 via-orange-500 to-red-500"
                  achieved={true}
                />
                <AchievementBadge
                  title="Committed Learner 📚"
                  description={`Enrolled in ${totalCourses} courses`}
                  gradient="from-blue-500 via-indigo-500 to-purple-500"
                  achieved={totalCourses >= 3}
                />
                <AchievementBadge
                  title="Learning Champion 🚀"
                  description={`${totalCourses} courses in progress`}
                  gradient="from-purple-500 via-pink-500 to-rose-500"
                  achieved={totalCourses >= 5}
                />
              </div>
            ) : (
              <div className="space-y-3">
                <StepCard step={1} title="Browse Courses" description="Explore our catalog" />
                <StepCard step={2} title="Enroll" description="Choose your path" />
                <StepCard step={3} title="Learn & Grow" description="Achieve your goals" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Stat Card Component
const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  gradient,
  iconBg,
  glowColor,
  trend
}: {
  icon: any;
  title: string;
  value: string | number;
  subtitle: string;
  gradient: string;
  iconBg: string;
  glowColor: string;
  trend: string;
}) => (
  <div className="group relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
    {/* Animated background glow */}
    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}></div>
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 rounded-xl bg-gradient-to-br ${iconBg} backdrop-blur-sm group-hover:scale-110 transition-transform`}>
          <Icon className={`w-7 h-7 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`} 
                style={{ WebkitTextFillColor: 'transparent' }} />
        </div>
        <span className="px-3 py-1 bg-gray-800 text-gray-400 text-xs font-semibold rounded-full group-hover:bg-gray-700 transition-colors">
          {trend}
        </span>
      </div>
      
      <p className="text-gray-400 text-sm mb-2 font-medium">{title}</p>
      <p className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
        {value}
      </p>
      <p className="text-gray-500 text-xs">{subtitle}</p>
    </div>

    {/* Shimmer effect on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
    </div>
  </div>
);

// Achievement Badge Component
const AchievementBadge = ({
  title,
  description,
  gradient,
  achieved
}: {
  title: string;
  description: string;
  gradient: string;
  achieved: boolean;
}) => (
  <div className={`
    relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300
    ${achieved 
      ? `bg-gradient-to-r ${gradient} border-transparent shadow-lg` 
      : 'bg-gray-800/50 border-gray-700 opacity-50'
    }
  `}>
    <div className={`
      w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
      ${achieved ? 'bg-white/20 backdrop-blur-sm' : 'bg-gray-700'}
      ${achieved && 'animate-pulse'}
    `}>
      <Award className={`w-6 h-6 ${achieved ? 'text-white' : 'text-gray-500'}`} />
    </div>
    <div className="flex-1">
      <p className={`font-bold ${achieved ? 'text-white' : 'text-gray-400'}`}>{title}</p>
      <p className={`text-sm ${achieved ? 'text-white/80' : 'text-gray-500'}`}>{description}</p>
    </div>
    {achieved && (
      <div className="text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
        ✓ Unlocked
      </div>
    )}
  </div>
);

// Step Card Component
const StepCard = ({ step, title, description }: { step: number; title: string; description: string }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all group cursor-pointer">
    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold group-hover:scale-110 transition-transform shadow-lg">
      {step}
    </div>
    <div className="flex-1">
      <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">{title}</p>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </div>
);

export default OverviewTab;