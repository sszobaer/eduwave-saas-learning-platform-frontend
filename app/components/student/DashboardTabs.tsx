import { Home, GraduationCap, BarChart3 } from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "courses", label: "My Courses", icon: GraduationCap },
  { id: "progress", label: "Progress", icon: BarChart3 }
];

const DashboardTabs = ({
  activeTab,
  setActiveTab
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => (
  <div className="flex gap-2 mt-4 overflow-x-auto">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-2 px-4 py-2 m-3 rounded-lg ${
          activeTab === tab.id
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
        }`}
      >
        <tab.icon className="w-4 h-4" />
        {tab.label}
      </button>
    ))}
  </div>
);

export default DashboardTabs;
