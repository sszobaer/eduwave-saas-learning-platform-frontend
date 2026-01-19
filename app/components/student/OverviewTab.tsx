import { BookOpen, DollarSign, TrendingUp } from "lucide-react";
import { Enrollment } from "@/app/types/student.type";

const OverviewTab = ({ enrollments }: { enrollments: Enrollment[] }) => {
  // 🛡️ DEFENSIVE SAFETY
  const safeEnrollments = Array.isArray(enrollments) ? enrollments : [];

  const totalCourses = safeEnrollments.length;

  const totalSpent = safeEnrollments.reduce((sum, e) => {
  const paid = e.payment?.amount
    ? Number(e.payment.amount)
    : Number(e.course.price);

  return sum + (isNaN(paid) ? 0 : paid);
}, 0);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <StatCard
        icon={<BookOpen className="text-blue-400" />}
        title="Total Courses"
        value={totalCourses}
      />
      <StatCard
        icon={<DollarSign className="text-green-400" />}
        title="Total Invested"
        value={`$${totalSpent.toFixed(2)}`}
      />
      <StatCard
        icon={<TrendingUp className="text-purple-400" />}
        title="Status"
        value={totalCourses > 0 ? "Active" : "Ready"}
      />
    </div>
  );
};

const StatCard = ({
  icon,
  title,
  value
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <p className="text-gray-400 text-sm">{title}</p>
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

export default OverviewTab;
