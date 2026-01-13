"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import Topbar from "@/app/components/admin/Topbar";
import StatsCard from "@/app/components/admin/StatsCard";
import CourseTable from "@/app/components/admin/CourseTable";
import { useEffect, useState } from "react";
import { getAllCourses } from "@/app/services/course.service";
import { getStates } from "@/app/services/states.service";
import { Course } from "@/app/types/course.type";

export default function AdminDashboardPage({ initialUser }: { initialUser?: any }) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
    }, []);

    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <AuthProvider initialUser={initialUser}>
            <div className="p-8 space-y-10">
                <Topbar />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard title="Total Courses" value={stats?.totalCourses ?? 0} />
                    <StatsCard title="Total Users" value={stats?.totalUsers ?? 0} />
                    <StatsCard title="Active Users" value={stats?.activeUsers ?? 0} />
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
    );
}
