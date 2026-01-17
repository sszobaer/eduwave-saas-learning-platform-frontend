'use client';
import {BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import Footer from '../components/footer';

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  students: number;
  instructor: string;
  category: string;
}

function CourseCard({ title, description, duration, students, instructor, category }: CourseCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full">
          {category}
        </span>
        <BookOpen className="text-purple-400" size={24} />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
      
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={16} />
          <span>{students} students</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <span className="text-gray-400 text-sm">By {instructor}</span>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm">
          Details
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

interface Course {
  title: string;
  description: string;
  duration: string;
  students: number;
  instructor: string;
  category: string;
}

export default function Homepage() {
  const courses: Course[] = [
    {
      title: "Web Development Bootcamp",
      description: "Master modern web development with HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and launch your career.",
      duration: "12 weeks",
      students: 1250,
      instructor: "Sarah Johnson",
      category: "Development"
    },
    {
      title: "Data Science & Machine Learning",
      description: "Learn Python, data analysis, machine learning algorithms, and AI fundamentals. Work with real datasets and build predictive models.",
      duration: "16 weeks",
      students: 890,
      instructor: "Dr. Michael Chen",
      category: "Data Science"
    },
    {
      title: "UI/UX Design Masterclass",
      description: "Create stunning user interfaces and experiences. Learn Figma, design principles, prototyping, and user research methodologies.",
      duration: "8 weeks",
      students: 750,
      instructor: "Emily Rodriguez",
      category: "Design"
    },
    {
      title: "Digital Marketing Strategy",
      description: "Master SEO, social media marketing, content strategy, and analytics. Build campaigns that drive real business results.",
      duration: "10 weeks",
      students: 620,
      instructor: "James Wilson",
      category: "Marketing"
    },
    {
      title: "Mobile App Development",
      description: "Build native iOS and Android apps with React Native. Learn mobile UI patterns, APIs, and app deployment to stores.",
      duration: "14 weeks",
      students: 540,
      instructor: "Alex Kumar",
      category: "Development"
    },
    {
      title: "Cybersecurity Fundamentals",
      description: "Understand network security, ethical hacking, cryptography, and threat detection. Prepare for security certifications.",
      duration: "12 weeks",
      students: 430,
      instructor: "Rachel Adams",
      category: "Security"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      
      {/* Hero/Welcome Section */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Welcome to EduWave
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your future with world-class online courses. Learn from industry experts and master the skills that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-xl shadow-purple-900/50">
              Explore Courses
            </button>
            <button className="border border-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-all duration-200 font-semibold text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Courses</h2>
            <p className="text-gray-400 text-lg">Choose from our selection of high-quality courses designed for success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: Course, index: number) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}