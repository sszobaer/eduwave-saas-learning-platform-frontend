"use client";
import CourseHero from "@/app/components/courses/details/CourseHero";
import CourseMeta from "@/app/components/courses/details/CourseMeta";
import CourseCurriculum from "@/app/components/courses/details/Curriculum";
import LecturesList from "@/app/components/teacher/courses/details/LecturesList";
import EnrollCard from "@/app/components/courses/details/Enrollment/EnrollCard";
import Footer from "@/app/components/footer";
import Topbar from "@/app/components/teacher/Topbar";
import ActionBar from "@/app/components/teacher/courses/details/Actionbar";
import { getCourseById } from "@/app/services/course.service";
import { Course } from "@/app/types/course.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// At the top of page.tsx, update your lucide import like this:
import { Play, VideoOff } from "lucide-react";  // Add Play here

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<any>(null);

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
    //console.log(fetchCourse);
  }, [id]);

  if (loading) return <p className="text-gray-400 p-4">Loading course...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!course) return <p className="text-gray-400 p-4">Course not found</p>;

  const handleLectureClick = (lecture: any) => {
    setSelectedLecture(lecture);
  };

  //const imageUrl = `http://localhost:3000${lecture.video_link}`;

  return (
    <>
      <div className="p-8 space-y-10">
        <Topbar />
        <div><ActionBar courseId={Number(id)} /></div>
        <div className="min-h-screen bg-[#020617] text-white">
          <CourseHero course={course!} />

          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 py-10">
            <div className="lg:col-span-2 space-y-8">
              <CourseMeta course={course!} />

              {/* Video Player Section */}
              {selectedLecture && selectedLecture.video_url ? (
                <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
                  <video
                    key={selectedLecture.id}
                    controls
                    autoPlay
                    className="w-full aspect-video"
                    src={selectedLecture.video_url}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-4 bg-[#111827]">
                    <h3 className="text-xl font-semibold">{selectedLecture.title}</h3>
                  </div>
                </div>
              ) : (
                <div className="bg-[#111827] rounded-lg p-10 text-center">
                  <Play size={64} className="mx-auto text-purple-500 mb-4 opacity-50" />
                  <p className="text-gray-400">Click on a lecture to start watching</p>
                </div>
              )}

              {/* Lectures List */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Course Lectures</h2>
                <LecturesList
                  lectures={course!.lectures.map((lec) => ({
                    id: lec.lecture_id,
                    title: lec.title,
                    duration: lec.duration, // if you have it
                    video_url: lec.video_link, // make sure this field exists
                  }))}
                  onLectureClick={handleLectureClick}
                  selectedLectureId={selectedLecture?.id}
                />
              </div>

              {/* Other sections... */}
            </div>

    
            
          </div>
        </div>
      </div>
     
    </>
  );
}