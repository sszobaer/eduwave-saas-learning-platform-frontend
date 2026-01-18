"use client";
import CourseHero from "@/app/components/courses/details/CourseHero";
import CourseMeta from "@/app/components/courses/details/CourseMeta";
import CourseCurriculum from "@/app/components/courses/details/Curriculum";
import LecturesList from "@/app/components/courses/details/LecturesList";
import EnrollCard from "@/app/components/courses/details/Enrollment/EnrollCard";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import { getCourseById } from "@/app/services/course.service";
import { Course } from "@/app/types/course.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getCourseById(Number(id));
      setCourse(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  if (loading) return <p className="text-gray-400 p-4">Loading course...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!course) return <p className="text-gray-400 p-4">Course not found</p>;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#020617] text-white">

      <CourseHero course={course} />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 py-10">
      
        <div className="lg:col-span-2 space-y-8">
          <CourseMeta course={course} />

         
          <div>
            <h2 className="text-2xl font-semibold mb-4">Course Lectures</h2>
            <LecturesList
              lectures={course.lectures.map((lec) => ({
                id: lec.lecture_id,
                title: lec.title,
                duration: undefined, 
              }))}
            />
          </div>

          <div className="bg-[#111827] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>
            <p className="text-gray-300 mb-4">{course.description}</p>
            <p className="font-medium text-white mb-2">Price: ${course.price}</p>
            <p className="text-gray-400 text-sm">
              Created by: {course.created_by_user.full_name}
            </p>
            
          </div>
        </div>

        {/* RIGHT: Enroll Card */}
        <EnrollCard course={course} />
      </div>
    </div>
    <Footer/>
    </>
  );
}
