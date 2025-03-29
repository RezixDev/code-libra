"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Import components
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import SideMenu from "@/components/layout/SideMenu";
import CourseCard, { Course } from "@/components/courses/CourseCard";

// Sample courses data - in a real app, this would come from an API
const ALL_COURSES: Course[] = [
  {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals",
    description:
      "Learn the core concepts of JavaScript programming from the ground up. Perfect for beginners who want to start their coding journey.",
    level: "Beginner",
    totalLessons: 12,
    completedLessons: 5,
    tags: ["JavaScript", "Web Development", "Programming Basics"],
    imageUrl: "/assets/svg/js.svg",
  },
  {
    id: "react-hooks",
    title: "React Hooks & Context",
    description:
      "Master React's powerful Hooks API and learn how to manage state effectively across your application with Context.",
    level: "Intermediate",
    totalLessons: 8,
    completedLessons: 2,
    tags: ["React", "Hooks", "Web Development", "JavaScript"],
    imageUrl: "/assets/svg/react.svg",
  },
  {
    id: "typescript-advanced",
    title: "TypeScript Advanced Types",
    description:
      "Take your TypeScript skills to the next level with advanced type features, generics, conditional types, and more.",
    level: "Advanced",
    totalLessons: 10,
    completedLessons: 0,
    tags: ["TypeScript", "Advanced", "JavaScript", "Web Development"],
    imageUrl: "/assets/svg/ts.svg",
  },
  {
    id: "nextjs-basics",
    title: "Next.js Fundamentals",
    description:
      "Learn how to build powerful server-rendered React applications with Next.js framework.",
    level: "Intermediate",
    totalLessons: 9,
    completedLessons: 0,
    tags: ["Next.js", "React", "Web Development"],
    imageUrl: "/assets/svg/nextjs.svg",
  },
  {
    id: "tailwind-mastery",
    title: "Tailwind CSS Mastery",
    description:
      "Master utility-first CSS with Tailwind and build beautiful responsive interfaces without writing custom CSS.",
    level: "Beginner",
    totalLessons: 6,
    completedLessons: 0,
    tags: ["Tailwind CSS", "CSS", "Web Development"],
    imageUrl: "/assets/svg/tailwind.svg",
  },
  {
    id: "nodejs-api",
    title: "Node.js API Development",
    description:
      "Build robust and scalable APIs with Node.js, Express, and MongoDB.",
    level: "Intermediate",
    totalLessons: 10,
    completedLessons: 0,
    tags: ["Node.js", "API", "Backend", "JavaScript"],
    imageUrl: "/assets/svg/nodejs.svg",
  },
];

// List of available categories
const CATEGORIES = [
  "All",
  "JavaScript",
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
];

// Difficulty levels
const DIFFICULTY_LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : "All"
  );
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  
  // Listen for changes in URL parameters
  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Filter courses based on search, category, and difficulty level
  const filteredCourses = ALL_COURSES.filter((course) => {
    // Filter by search query
    const matchesSearch = 
      searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by category
    const matchesCategory = 
      selectedCategory === "All" || 
      course.tags.includes(selectedCategory);
    
    // Filter by difficulty level
    const matchesLevel = 
      selectedLevel === "All Levels" || 
      course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

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

          {/* Page Title */}
          <h1 className="text-2xl font-bold mb-4">Explore Courses</h1>

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full p-3 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={20} className="absolute right-3 top-3 text-gray-400" />
          </div>

          {/* Categories */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-medium">Difficulty Level:</h2>
            <div className="flex space-x-2">
              {DIFFICULTY_LEVELS.map((level) => (
                <button
                  key={level}
                  className={`px-3 py-1 rounded-lg text-xs ${
                    selectedLevel === level
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No courses match your criteria.</p>
              <button 
                className="mt-4 text-indigo-600"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedLevel("All Levels");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="courses" />
      </div>
    </div>
  );
} 