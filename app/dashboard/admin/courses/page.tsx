"use client"
import CourseTable from '@/app/components/admin/CourseTable'
import Topbar from '@/app/components/admin/Topbar';
import { getAllCourses } from '@/app/services/course.service';
import { Course } from '@/app/types/course.type';
import React, { useEffect, useState } from 'react'

const AdminCoursePage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesData = await getAllCourses();
                setCourses(coursesData);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            }
        };

        fetchCourses();
    }, []);
    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] via-[#0F172A] to-[#020617] text-gray-100 p-8 space-y-10">
        <Topbar />
            <section>
                <h2 className="text-xl font-semibold mb-4">Manage Courses</h2>
                <CourseTable
                    courses={courses}
                    onDelete={(id: number) =>
                        setCourses((prev) => prev.filter((c) => c.course_id !== id))
                    }
                />
            </section>
        </div>
        
        </>
    )
}

export default AdminCoursePage
