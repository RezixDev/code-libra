// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Book, Code, Award, User } from "lucide-react";

// Import components
import CourseCard, { Course } from "@/components/courses/CourseCard";
import BottomNavigation from "@/components/layout/BottomNavigation";
import Header from "@/components/layout/Header";
import SideMenu from "@/components/layout/SideMenu";

// Sample data - would normally come from an API
const SAMPLE_COURSES: Course[] = [
	{
		id: "js-fundamentals",
		title: "JavaScript Fundamentals",
		description:
			"Learn the core concepts of JavaScript programming from the ground up. Perfect for beginners who want to start their coding journey.",
		level: "Beginner",
		imageUrl: "/assets/images/courses/javascript-fundamentals.jpg",
		totalLessons: 12,
		completedLessons: 5,
		currentLessonId: "js-arrays",
		currentLessonTitle: "Lesson 6: Arrays",
		tags: ["JavaScript", "Web Development", "Programming Basics"],
	},
	{
		id: "react-hooks",
		title: "React Hooks & Context",
		description:
			"Master React's powerful Hooks API and learn how to manage state effectively across your application with Context.",
		level: "Intermediate",
		imageUrl: "/assets/images/courses/react-hooks.jpg",
		totalLessons: 8,
		completedLessons: 2,
		currentLessonId: "useeffect-hook",
		currentLessonTitle: "Lesson 3: useEffect Hook",
		tags: ["React", "Hooks", "Web Development", "JavaScript"],
	},
	{
		id: "typescript-advanced",
		title: "TypeScript Advanced Types",
		description:
			"Take your TypeScript skills to the next level with advanced type features, generics, conditional types, and more.",
		level: "Advanced",
		imageUrl: "/assets/images/courses/typescript-advanced.jpg",
		totalLessons: 10,
		completedLessons: 0,
		tags: ["TypeScript", "Advanced", "JavaScript", "Web Development"],
	},
];

const featuredTopics = [
	"JavaScript",
	"React",
	"TypeScript",
	"Next.js",
	"Tailwind CSS",
	"Node.js",
];

export default function HomePage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

	// Set a current course for the continue learning section
	useEffect(() => {
		// In a real app, you'd fetch the user's current course
		// For now, use the first course with progress > 0
		const inProgressCourse = SAMPLE_COURSES.find(
			(course) => course.completedLessons > 0
		);
		if (inProgressCourse) {
			setCurrentCourse(inProgressCourse);
		}
	}, []);

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
					{/* Continue Learning Section */}
					{currentCourse && (
						<div className="mb-6">
							<h2 className="text-lg font-bold mb-2">Continue Learning</h2>
							<CourseCard course={currentCourse} variant="featured" />
						</div>
					)}

					{/* My Courses Section */}
					<div className="mb-6">
						<div className="flex justify-between items-center mb-2">
							<h2 className="text-lg font-bold">My Courses</h2>
							<a href="/courses" className="text-indigo-600 text-sm">
								View All
							</a>
						</div>
						<div className="space-y-3">
							{SAMPLE_COURSES.map((course) => (
								<CourseCard key={course.id} course={course} variant="compact" />
							))}
						</div>
					</div>

					{/* Featured Topics Section */}
					<div className="mb-6">
						<h2 className="text-lg font-bold mb-2">Featured Topics</h2>
						<div className="flex flex-wrap gap-2">
							{featuredTopics.map((topic, index) => (
								<button
									key={index}
									className="bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 text-gray-800 text-sm rounded-full px-4 py-2 transition-colors"
								>
									{topic}
								</button>
							))}
						</div>
					</div>

					{/* Recommended Courses Section */}
					<div>
						<h2 className="text-lg font-bold mb-2">Recommended For You</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{SAMPLE_COURSES.slice(0, 2).map((course) => (
								<CourseCard key={course.id} course={course} />
							))}
						</div>
					</div>
				</main>

				{/* Bottom Navigation */}
				<BottomNavigation activeTab="home" />
			</div>
		</div>
	);
}
