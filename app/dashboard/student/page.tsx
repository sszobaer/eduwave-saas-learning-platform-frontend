"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { studentAPI } from "@/app/services/api";

import LoadingScreen from "@/app/components/student/LoadingScreen";
import ErrorAlert from "@/app/components/student/ErrorAlert";
import DashboardHeader from "@/app/components/student/DashboardHeader";
import DashboardTabs from "@/app/components/student/DashboardTabs";
import OverviewTab from "@/app/components/student/OverviewTab";
import CoursesTab from "@/app/components/student/CoursesTab";
import ProgressTab from "@/app/components/student/ProgressTab";

import { Enrollment } from "@/app/types/student.type";

export default function StudentDashboard() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auth Guard - Redirect if not student
  // useEffect(() => {
  //   if (!mounted) return;
  //   if (!loading && (!user || user.role !== "STUDENT")) {
  //     router.push("/login");
  //   }
  // }, [user, loading, router, mounted]);

  // Fetch enrollments using Axios
  const fetchEnrollments = async () => {
    if (!user) return;

    try {
      setLoadingData(true);
      setError(null);

      console.log("🔍 User object:", user);
      
      // Try to get the user ID from various possible fields
      const userId = user.user_id || user.id;

      if (!userId) {
        throw new Error("User ID not found. Please check your user object.");
      }

      console.log("📡 Fetching enrollments for user ID:", userId);

      const data = await studentAPI.getEnrollments(userId);

      console.log("✅ Enrollments fetched:", data);
      setEnrollments(data);
    } catch (err: any) {
      console.error("❌ Error fetching enrollments:", err);
      console.error("❌ Error response:", err.response?.data);
      
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        "Failed to load enrolled courses. Please try again.";
      
      setError(errorMessage);
      setEnrollments([]);
    } finally {
      setLoadingData(false);
    }
  };

  // Fetch data when user is available
  useEffect(() => {
    if (mounted && user) {
      fetchEnrollments();
    }
  }, [user, mounted]);

  // Loading state
  if (!mounted || loading || !user) {
    return <LoadingScreen text="Loading dashboard..." />;
  }

  return (
    <>
      {/* Global Styles */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #000000;
        }

        ::-webkit-scrollbar-thumb {
          background: #1f2937;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #374151;
        }

        /* Hide scrollbar for Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #1f2937 #000000;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Remove any default margins */
        body {
          margin: 0;
          padding: 0;
        }

        /* Animation keyframes */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white">
        {/* Background decoration */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="animate-fadeIn">
            <DashboardHeader user={user} />
          </div>

          {/* Dashboard Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tabs */}
            <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mt-6 animate-fadeIn">
                <ErrorAlert 
                  message={error} 
                  onRetry={fetchEnrollments} 
                  onDismiss={() => setError(null)} 
                />
              </div>
            )}

            {/* Tab Content */}
            <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              {loadingData ? (
                <div className="mt-6">
                  <LoadingScreen text="Loading courses..." />
                </div>
              ) : (
                <div className="transition-all duration-500 ease-in-out">
                  {activeTab === "overview" && (
                    <div className="animate-fadeIn">
                      <OverviewTab enrollments={enrollments} />
                    </div>
                  )}
                  {activeTab === "courses" && (
                    <div className="animate-fadeIn">
                      <CoursesTab enrollments={enrollments} />
                    </div>
                  )}
                  {activeTab === "progress" && (
                    <div className="animate-fadeIn">
                      <ProgressTab enrollments={enrollments} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="relative z-10 mt-20 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    EduWave
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Your journey to excellence starts here. Learn, grow, and achieve your goals.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="hover:text-blue-400 cursor-pointer transition-colors">My Courses</li>
                    <li className="hover:text-blue-400 cursor-pointer transition-colors">Browse Catalog</li>
                    <li className="hover:text-blue-400 cursor-pointer transition-colors">My Progress</li>
                    <li className="hover:text-blue-400 cursor-pointer transition-colors">Settings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="hover:text-blue-400 cursor-pointer transition-colors">Help Center</li>
                    <li className="hover:text-blue-400 cursor-pointer transition-colors">Contact Support</li>
                    <li className="hover:text-blue-400 cursor-pointer transition-colors">Terms of Service</li>
                    <li className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                <p className="text-gray-500 text-sm">
                  © 2024 EduWave. All rights reserved. Built with ❤️ for learners worldwide.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}