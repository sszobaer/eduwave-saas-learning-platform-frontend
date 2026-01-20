"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import Topbar from "@/app/components/admin/Topbar";
import StatsCard from "@/app/components/admin/StatsCard";
import { useEffect, useState } from "react";
import { getStates } from "@/app/services/states.service";
import { BarChartCard, LineChartCard, PieChartCard } from "@/app/components/admin/charts/ChartCard";

export default function AdminDashboardPage({ initialUser }: { initialUser?: any }) {
    const [stats, setStats] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
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

            <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] via-[#0F172A] to-[#020617] text-gray-100 p-8 space-y-10">
                <Topbar />


                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard title="Total Courses" value={stats?.summary?.totalCourses ?? 0} />
                    <StatsCard title="Total Users" value={stats?.summary?.totalUsers ?? 0} />
                    <StatsCard title="Active Users" value={stats?.summary?.activeUsers ?? 0} />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User Growth */}
                    <LineChartCard
                        data={stats?.users?.growth ?? []}
                        dataKeyX="month"
                        dataKeyY="count"
                        title="User Growth Over Time"
                    />

                    {/* Active vs Blocked */}
                    <PieChartCard
                        data={stats?.users?.status ?? []}
                        dataKey="value"
                        nameKey="name"
                        title="Active vs Blocked Users"
                    />

                    {/* Courses by Tag */}
                    <BarChartCard
                        data={stats?.courses?.byTag ?? []}
                        dataKey="count"
                        nameKey="tag"
                        title="Courses by Tag"
                    />

                    {/* Top Enrolled Courses */}
                    <BarChartCard
                        data={stats?.courses?.topEnrolled ?? []}
                        dataKey="enrollments"
                        nameKey="title"
                        title="Top Enrolled Courses"
                    />
                </div>
            </div>
        </AuthProvider>
    );
}
