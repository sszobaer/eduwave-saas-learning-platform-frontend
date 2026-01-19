"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/app/context/AuthContext";
import Topbar from "@/app/components/teacher/Topbar";
import StatsCard from "@/app/components/teacher/StatsCard";
import CourseList from "@/app/components/teacher/courses/CourseList";
import CourseHeader from "@/app/components/teacher/courses/CourseHeader";
import ActionBar from "@/app/components/teacher/courses/Actionbar";

import { getAllCoursesByIndivisualUser } from "@/app/services/course.service";
import { getTeacherStates } from "@/app/services/states.service";
import { Course } from "@/app/types/course.type";
import { getCourseReview } from "@/app/services/courseReview.service";
import { useParams } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { CourseReview } from "@/app/types/courseReview.type";

export default function TeacherDashboardPage({ initialUser }: { initialUser?: any }) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [courseReview, setCourseReview] = useState<CourseReview[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();
    const { courseId } = useParams();
    
    useEffect(() => {
             const fetchDashboard = async () => {
                 try {
                     const coursesData = await getAllCoursesByIndivisualUser();
                     setCourses(coursesData);

                     const reviewsData = await getCourseReview();
                     setCourseReview(reviewsData);
     
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
                <div><ActionBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}/></div>

                <section className="min-h-screen bg-black text-white px-6 py-20">
                <CourseHeader/>

                 {/* Courses */}
                 <div className="max-w-7xl mx-auto">
                 <CourseList courses={courses} courseReviews={courseReview} searchTerm={searchTerm}/>

                 </div>
                </section>
            </div>
        </AuthProvider>
        </>
    );
}

