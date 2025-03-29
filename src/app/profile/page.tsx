"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, Calendar, CheckCircle, Clock, Edit, User } from "lucide-react";

// Import components
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import SideMenu from "@/components/layout/SideMenu";
import CourseCard, { Course } from "@/components/courses/CourseCard";

// Sample user data
const userData = {
  name: "Alex Johnson",
  username: "alexj",
  email: "alex.johnson@example.com",
  joinedDate: "January 2023",
  bio: "Full-stack developer passionate about web technologies and continuous learning.",
  imageUrl: "/assets/images/profile.jpg",
  stats: {
    coursesCompleted: 7,
    lessonsCompleted: 42,
    streakDays: 15,
    totalHours: 87,
  }
};

// Sample enrolled courses data - would normally come from an API
const ENROLLED_COURSES: Course[] = [
  {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Learn the core concepts of JavaScript programming from the ground up.",
    level: "Beginner",
    totalLessons: 12,
    completedLessons: 12,
    tags: ["JavaScript", "Web Development", "Programming Basics"],
    imageUrl: "/assets/svg/js.svg",
  },
  {
    id: "react-hooks",
    title: "React Hooks & Context",
    description: "Master React's powerful Hooks API and state management.",
    level: "Intermediate",
    totalLessons: 8,
    completedLessons: 8,
    tags: ["React", "Hooks", "Web Development", "JavaScript"],
    imageUrl: "/assets/svg/react.svg",
  },
  {
    id: "typescript-advanced",
    title: "TypeScript Advanced Types",
    description: "Take your TypeScript skills to the next level.",
    level: "Advanced",
    totalLessons: 10,
    completedLessons: 5,
    currentLessonId: "conditional-types",
    currentLessonTitle: "Lesson 6: Conditional Types",
    tags: ["TypeScript", "Advanced", "JavaScript", "Web Development"],
    imageUrl: "/assets/svg/ts.svg",
  },
];

export default function ProfilePage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative h-screen bg-gray-100">
      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <Header onMenuToggle={toggleMenu} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-gray-600 mb-4">
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Home</span>
          </Link>

          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 mr-4">
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-100">
                  <User size={40} className="text-indigo-500" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold">{userData.name}</h1>
                  <button className="text-indigo-600 inline-flex items-center text-sm">
                    <Edit size={14} className="mr-1" />
                    Edit Profile
                  </button>
                </div>
                <p className="text-gray-500 text-sm mb-1">@{userData.username}</p>
                <p className="text-gray-600 text-sm">{userData.bio}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  <span>Joined {userData.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Courses Completed</span>
                <CheckCircle size={16} className="text-green-500" />
              </div>
              <p className="text-2xl font-bold mt-1">{userData.stats.coursesCompleted}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Lessons Completed</span>
                <Award size={16} className="text-indigo-500" />
              </div>
              <p className="text-2xl font-bold mt-1">{userData.stats.lessonsCompleted}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Current Streak</span>
                <span className="text-yellow-500 text-xs font-medium px-2 py-1 bg-yellow-50 rounded-full">
                  🔥 {userData.stats.streakDays} days
                </span>
              </div>
              <p className="text-2xl font-bold mt-1">{userData.stats.streakDays}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Total Hours</span>
                <Clock size={16} className="text-blue-500" />
              </div>
              <p className="text-2xl font-bold mt-1">{userData.stats.totalHours}</p>
            </div>
          </div>

          {/* Learning Progress Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3">My Courses</h2>
            <div className="space-y-3">
              {ENROLLED_COURSES.map((course) => (
                <CourseCard key={course.id} course={course} variant="compact" />
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <h2 className="text-lg font-bold mb-3">Achievements</h2>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {/* Achievement Items */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-1">
                    <Award size={24} className="text-green-600" />
                  </div>
                  <span className="text-xs text-center">First Course</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                    <CheckCircle size={24} className="text-blue-600" />
                  </div>
                  <span className="text-xs text-center">10 Lessons</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-1">
                    <Award size={24} className="text-indigo-600" />
                  </div>
                  <span className="text-xs text-center">JavaScript Pro</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                    <Award size={24} className="text-purple-600" />
                  </div>
                  <span className="text-xs text-center">React Ninja</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-1">
                    <Award size={24} className="text-yellow-600" />
                  </div>
                  <span className="text-xs text-center">5 Day Streak</span>
                </div>
                <div className="flex flex-col items-center opacity-40">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                    <Award size={24} className="text-gray-400" />
                  </div>
                  <span className="text-xs text-center">Locked</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="profile" />
      </div>
    </div>
  );
} 