/*"use client"
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const page = () => {
  const { user, loading } = useContext(AuthContext);
    const router = useRouter();
  
    useEffect(() => {
      if (loading) return; 
      if (!user || user.role !== "TEACHER") {
        router.push("/login");
      }
    }, [user, loading]);
  
    if (loading || !user) 
      return <p>Loading...</p>;
    
  return (
    <div>
      Teacher
    </div>
  )
}

export default page
*/


"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import Topbar from "@/app/components/teacher/Topbar";
import StatsCard from "@/app/components/teacher/StatsCard";
import CourseTable from "@/app/components/admin/CourseTable";
//import { useEffect, useState } from "react";
import { getAllCoursesByIndivisualUser } from "@/app/services/course.service";
import { getTeacherStates } from "@/app/services/states.service";
import { Course } from "@/app/types/course.type";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function TeacherDashboardPage({ initialUser }: { initialUser?: any }) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

 useEffect(() => {
         const fetchDashboard = async () => {
             try {
                // const coursesData = await getAllCourses();
                 //setCourses(coursesData);
 
                 const statsData = await getTeacherStates();
                 setStats(statsData);
             } catch (err: any) {
                 setError(err.response?.data?.message || err.message);
             }
         };
 
         fetchDashboard();
     }, []);

    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <AuthProvider initialUser={initialUser}>
            <div className="p-8 space-y-10">
                <Topbar />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard title="Total Courses" value={stats?.totalCourses ?? 0} />
                    <StatsCard title="Total Students" value={stats?.totalStudentsEnrolled ?? 0} />
                    <StatsCard title="Active Quizes" value={stats?.activeQuizzes ?? 0} />
                    <StatsCard title="Earning" value={stats?.totalEarnings ?? 0} />
                </div>

                <section>
                    
                    
                </section>
            </div>
        </AuthProvider>
    );
  }

