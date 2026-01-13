import CourseList from "../components/courses/CourseList";
import CourseHeader from "../components/courses/CourseHeader";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { getAllCourses } from "../services/course.service";


export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (<>
    <Navbar/>
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <CourseHeader/>

      {/* Courses */}
      <div className="max-w-7xl mx-auto">
        <CourseList courses={courses} />
      </div>
    </section>
    <Footer/>
    </>
  );
}
