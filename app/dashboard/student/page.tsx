"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, AuthProvider } from "@/app/context/AuthContext";

import LoadingScreen from "@/app/components/student/LoadingScreen";
import ErrorAlert from "@/app/components/student/ErrorAlert";
import DashboardHeader from "@/app/components/student/DashboardHeader";
import DashboardTabs from "@/app/components/student/DashboardTabs";
import OverviewTab from "@/app/components/student/OverviewTab";
import CoursesTab from "@/app/components/student/CoursesTab";
import ProgressTab from "@/app/components/student/ProgressTab";

import { Enrollment } from "@/app/types/student.type";
import axios from "axios";

export default function StudentDashboard() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  const fetchEnrollments = async () => {
    if (!user) return;
    console.log(user);

    try {
      setLoadingData(true);
      setError(null);

      const res = await axios.get(`http://localhost:3000/enrollment/student/${user.user_id}`);

      let enrollmentsArray = [];

      if (Array.isArray(res.data)) {
        enrollmentsArray = res.data;
      }

      else if (res.data && typeof res.data === "object") {
        enrollmentsArray = [res.data];
      }

      setEnrollments(enrollmentsArray);
    } catch (err) {
      console.error(err);
      setEnrollments([]);
      setError("Failed to load enrolled courses");
    } finally {
      setLoadingData(false);
    }
  };


  useEffect(() => {
    if (user) fetchEnrollments();
  }, [user]);

  if (loading || !user) {
    return <LoadingScreen text="Loading dashboard..." />;
  }

  return (
    <div className="m-6 min-h-screen bg-black text-white">
      <AuthProvider>
        <DashboardHeader user={user} />

        <div className="max-w-7xl mx-auto p-6">
          <DashboardTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            Logout
          </div>

          {loadingData ? (
            <LoadingScreen text="Loading courses..." />
          ) : (
            <>
              {activeTab === "overview" && (
                <OverviewTab enrollments={enrollments} />
              )}
              {activeTab === "courses" && (
                <CoursesTab enrollments={enrollments} />
              )}
              {activeTab === "progress" && (
                <ProgressTab enrollments={enrollments} />
              )}

            </>
          )}
        </div>
      </AuthProvider>
    </div>
  );
}
