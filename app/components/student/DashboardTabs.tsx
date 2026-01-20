// app/components/student/DashboardTabs.tsx
import { Home, GraduationCap, BarChart3 } from "lucide-react";

const tabs = [
  { 
    id: "overview", 
    label: "Overview", 
    icon: Home,
    gradient: "from-blue-600 to-cyan-600",
    hoverGradient: "from-blue-700 to-cyan-700",
    iconColor: "text-blue-400"
  },
  { 
    id: "courses", 
    label: "My Courses", 
    icon: GraduationCap,
    gradient: "from-purple-600 to-pink-600",
    hoverGradient: "from-purple-700 to-pink-700",
    iconColor: "text-purple-400"
  },
  { 
    id: "progress", 
    label: "Progress", 
    icon: BarChart3,
    gradient: "from-green-600 to-emerald-600",
    hoverGradient: "from-green-700 to-emerald-700",
    iconColor: "text-green-400"
  }
];

const DashboardTabs = ({
  activeTab,
  setActiveTab
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => (
  <div className="relative">
    {/* Decorative Background */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-green-600/5 rounded-2xl blur-xl"></div>
    
    {/* Tabs Container */}
    <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-2 shadow-2xl">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group relative flex items-center gap-3 px-6 py-3.5 rounded-xl
                transition-all duration-300 ease-out
                whitespace-nowrap font-medium
                ${isActive 
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg scale-105` 
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white hover:scale-105'
                }
              `}
            >
              {/* Icon with animation */}
              <div className={`
                transition-all duration-300
                ${isActive ? 'scale-110 rotate-6' : 'group-hover:scale-110 group-hover:rotate-6'}
              `}>
                <tab.icon className={`
                  w-5 h-5 
                  ${isActive ? 'text-white' : tab.iconColor}
                  transition-colors duration-300
                `} />
              </div>
              
              {/* Label */}
              <span className="text-sm font-semibold tracking-wide">
                {tab.label}
              </span>

              {/* Active indicator glow */}
              {isActive && (
                <div className={`
                  absolute inset-0 bg-gradient-to-r ${tab.gradient} 
                  rounded-xl blur-lg opacity-50 -z-10
                  animate-pulse
                `}></div>
              )}

              {/* Hover effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>

    {/* Mobile scroll hint */}
    <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
  </div>
);

export default DashboardTabs;