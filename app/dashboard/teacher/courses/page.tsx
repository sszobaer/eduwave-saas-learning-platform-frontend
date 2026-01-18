"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import Topbar from "@/app/components/teacher/Topbar";
import StatsCard from "@/app/components/teacher/StatsCard";
import CourseTable from "@/app/components/admin/CourseTable";
import { useEffect, useState } from "react";
import { getAllCourses } from "@/app/services/course.service";
import { getStates } from "@/app/services/states.service";
import { Course } from "@/app/types/course.type";
import ActionBar from "@/app/components/teacher/courses/Actionbar";
import CourseCreationForm from "@/app/components/teacher/courses/CourseCreationForm";
import { getTeacherStates } from "@/app/services/states.service";


import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { ToastContainer } from "react-toastify";

export default function TeacherDashboardPage({ initialUser }: { initialUser?: any }) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);



    const { user, loading } = useContext(AuthContext);
    const router = useRouter();
  /*  useEffect(() => {
      if (loading) return; 
      if (!user || user.role !== "TEACHER") {
        router.push("/login");
      }
    }, [user, loading]);
  
    if (loading || !user) 
      return <p>Loading...</p>;*/

    /*useEffect(() => {
      
        const fetchDashboard = async () => {
            try {
                const coursesData = await getAllCourses();
                setCourses(coursesData);

                const statsData = await getStates();
                setStats(statsData);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            }
        };

        fetchDashboard();
    }, []);*/
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
        <> 
        <ToastContainer/>
        <AuthProvider initialUser={initialUser}>
            <div className="p-8 space-y-10">
                <Topbar />
                <div><ActionBar/></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard title="Total Courses" value={stats?.totalCourses ?? 0} />
                    <StatsCard title="Total Students" value={stats?.totalUsers ?? 0} />
                    <StatsCard title="Active Quizes" value={stats?.activeUsers ?? 0} />
                    <StatsCard title="Earning" value={stats?.activeUsers ?? 0} />
                </div>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Manage Courses</h2>
                    <CourseTable
                        courses={courses}
                        onDelete={(id: number) => setCourses(prev => prev.filter(c => c.course_id !== id))}
                    />
                </section>
            </div>
        </AuthProvider>
        </>
    );
}

