// "use client"
// import { AuthContext } from '@/app/context/AuthContext';
// import { useRouter } from 'next/navigation';
// import React, { useContext, useEffect } from 'react'

// const page = () => {
//   const { user, loading } = useContext(AuthContext);
//     const router = useRouter();
  
//     useEffect(() => {
//       if (loading) return; 
//       if (!user || user.role !== "TEACHER") {
//         router.push("/login");
//       }
//     }, [user, loading]);
  
//     if (loading || !user) 
//       return <p>Loading...</p>;
    
//   return (
//     <div>
//       Teacher
//     </div>
//   )
// }

// export default page

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
import CourseTable from "@/app/components/admin/CourseTable";
import { useEffect, useState } from "react";
import { getAllCourses } from "@/app/services/course.service";
import { getStates } from "@/app/services/states.service";
import { Course } from "@/app/types/course.type";
import StatsCard from "@/app/components/admin/StatsCard";

export default function TeacherDashboardPage({ initialUser }: { initialUser?: any }) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

   

    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <AuthProvider initialUser={initialUser}>
            <div className="p-8 space-y-10">

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
    );
}


