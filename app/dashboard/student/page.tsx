"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";

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

  /* 🔐 AUTH GUARD */
  useEffect(() => {
    if (!loading && (!user || user.role !== "STUDENT")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const fetchEnrollments = async () => {
  if (!user) return;

  try {
    setLoadingData(true);
    setError(null);

    const res = await axios.get(`http://localhost:3000/enrollment/student/${user.id}`);

    let enrollmentsArray = [];

    // ✅ CASE 1: backend returns array
    if (Array.isArray(res.data)) {
      enrollmentsArray = res.data;
    }
    // ✅ CASE 2: backend returns single object (YOUR CASE)
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
    <div className="min-h-screen bg-black text-white">
      <DashboardHeader user={user} />

      <div className="max-w-7xl mx-auto p-6">
        <DashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

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
    </div>
  );
}
