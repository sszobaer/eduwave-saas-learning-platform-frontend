import { User } from "lucide-react";

const DashboardHeader = ({ user }: { user: any }) => (
  <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-blue-400">Student Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome back, {user.full_name}</p>
      </div>

      <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg">
        <User className="w-5 h-5 text-blue-400" />
        <span>{user.full_name}</span>
      </div>
    </div>
  </div>
);

export default DashboardHeader;
