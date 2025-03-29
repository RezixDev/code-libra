// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Book, Code, Award, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
		totalLessons: 12,
		completedLessons: 5,
		currentLessonId: "js-arrays",
		currentLessonTitle: "Lesson 6: Arrays",
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
		currentLessonId: "useeffect-hook",
		currentLessonTitle: "Lesson 3: useEffect Hook",
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
];

const featuredTopics = [
	"JavaScript",
	"React",
	"TypeScript",
	"Next.js",
	"Tailwind CSS",
	"Node.js",
];

// Map topics to their SVG paths
const topicSvgMap: { [key: string]: string | undefined } = {
	JavaScript: "/assets/svg/js.svg",
	React: "/assets/svg/react.svg",
	TypeScript: "/assets/svg/ts.svg",
	"Next.js": "/assets/svg/nextjs.svg",
	"Tailwind CSS": "/assets/svg/tailwind.svg",
	"Node.js": "/assets/svg/nodejs.svg",
};

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
					<div id="my-courses" className="mb-6">
						<div className="flex justify-between items-center mb-2">
							<h2 className="text-lg font-bold">My Courses</h2>
							<Link href="/courses" className="text-indigo-600 text-sm">
								View All
							</Link>
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
							{featuredTopics.map((topic, index) => {
								const svgPath = topicSvgMap[topic];
								// Determine button color based on topic
								let bgColor = "bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700";
								if (topic === "JavaScript") {
									bgColor = "bg-yellow-50 hover:bg-yellow-100 hover:text-yellow-700";
								} else if (topic === "React") {
									bgColor = "bg-blue-50 hover:bg-blue-100 hover:text-blue-700";
								} else if (topic === "TypeScript") {
									bgColor = "bg-blue-50 hover:bg-blue-100 hover:text-blue-800";
								} else if (topic === "Next.js") {
									bgColor = "bg-gray-100 hover:bg-gray-200 hover:text-gray-900";
								} else if (topic === "Tailwind CSS") {
									bgColor = "bg-cyan-50 hover:bg-cyan-100 hover:text-cyan-800";
								} else if (topic === "Node.js") {
									bgColor = "bg-green-50 hover:bg-green-100 hover:text-green-800";
								}
								
								return (
									<Link
										href={`/courses?category=${encodeURIComponent(topic)}`}
										key={index}
									>
										<button
											className={`flex items-center ${bgColor} text-gray-800 text-sm rounded-full px-4 py-2 transition-colors`}
										>
											{svgPath && (
												<div className="w-4 h-4 mr-1.5 relative flex items-center justify-center">
													<Image
														src={svgPath}
														alt={`${topic} icon`}
														width={16}
														height={16}
														className="object-contain"
													/>
												</div>
											)}
											{topic}
										</button>
									</Link>
								);
							})}
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
