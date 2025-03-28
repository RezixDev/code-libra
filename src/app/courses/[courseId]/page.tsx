// src/app/courses/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	ArrowLeft,
	Clock,
	File,
	Award,
	Star,
	Download,
	PlayCircle,
	Check,
	ChevronRight,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

// Types
import { Course } from "@/components/courses/CourseCard";

// Sample data - in a real app, this would come from an API
const COURSES_DATA: Record<
	string,
	Course & {
		instructor: string;
		rating: number;
		reviewCount: number;
		totalTime: string;
		description: string;
		lessons: {
			id: string;
			title: string;
			duration: string;
			isCompleted: boolean;
			isCurrent?: boolean;
		}[];
	}
> = {
	"js-fundamentals": {
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
		instructor: "Sarah Chen",
		rating: 4.8,
		reviewCount: 128,
		totalTime: "6 hours 30 minutes",
		lessons: [
			{
				id: "js-intro",
				title: "Introduction to JavaScript",
				duration: "12 min",
				isCompleted: true,
			},
			{
				id: "js-variables",
				title: "Variables and Data Types",
				duration: "18 min",
				isCompleted: true,
			},
			{
				id: "js-operators",
				title: "Operators and Expressions",
				duration: "15 min",
				isCompleted: true,
			},
			{
				id: "js-conditionals",
				title: "Control Flow: Conditionals",
				duration: "20 min",
				isCompleted: true,
			},
			{
				id: "js-loops",
				title: "Control Flow: Loops",
				duration: "22 min",
				isCompleted: true,
			},
			{
				id: "js-arrays",
				title: "Arrays and Array Methods",
				duration: "25 min",
				isCompleted: false,
				isCurrent: true,
			},
			{
				id: "js-functions",
				title: "Functions and Scope",
				duration: "30 min",
				isCompleted: false,
			},
			{
				id: "js-objects",
				title: "Objects and Properties",
				duration: "28 min",
				isCompleted: false,
			},
			{
				id: "js-dom",
				title: "DOM Manipulation",
				duration: "35 min",
				isCompleted: false,
			},
			{
				id: "js-events",
				title: "Events and Event Handling",
				duration: "25 min",
				isCompleted: false,
			},
			{
				id: "js-async",
				title: "Asynchronous JavaScript",
				duration: "40 min",
				isCompleted: false,
			},
			{
				id: "js-project",
				title: "Final Project",
				duration: "45 min",
				isCompleted: false,
			},
		],
	},
	"react-hooks": {
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
		instructor: "Michael Rodriguez",
		rating: 4.9,
		reviewCount: 87,
		totalTime: "4 hours 15 minutes",
		lessons: [
			{
				id: "react-intro",
				title: "Introduction to React Hooks",
				duration: "15 min",
				isCompleted: true,
			},
			{
				id: "usestate-hook",
				title: "The useState Hook",
				duration: "25 min",
				isCompleted: true,
			},
			{
				id: "useeffect-hook",
				title: "The useEffect Hook",
				duration: "30 min",
				isCompleted: false,
				isCurrent: true,
			},
			{
				id: "useref-hook",
				title: "The useRef Hook",
				duration: "20 min",
				isCompleted: false,
			},
			{
				id: "usememo-hook",
				title: "The useMemo Hook",
				duration: "25 min",
				isCompleted: false,
			},
			{
				id: "usecallback-hook",
				title: "The useCallback Hook",
				duration: "25 min",
				isCompleted: false,
			},
			{
				id: "context-api",
				title: "React Context API",
				duration: "35 min",
				isCompleted: false,
			},
			{
				id: "custom-hooks",
				title: "Building Custom Hooks",
				duration: "30 min",
				isCompleted: false,
			},
		],
	},
};

// Tabs for the course detail page
type TabType = "lessons" | "about" | "reviews";

export default function CourseDetailPage() {
	const router = useRouter();
	const params = useParams();
	const courseId = params.courseId as string;

	const [activeTab, setActiveTab] = useState<TabType>("lessons");
	const [courseData, setCourseData] = useState<
		(typeof COURSES_DATA)[keyof typeof COURSES_DATA] | null
	>(null);

	useEffect(() => {
		// In a real app, you'd make an API call here
		if (courseId && COURSES_DATA[courseId]) {
			setCourseData(COURSES_DATA[courseId]);
		} else {
			// Handle course not found
			router.push("/courses");
		}
	}, [courseId, router]);

	if (!courseData) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-100">
				<p>Loading course...</p>
			</div>
		);
	}

	const progressPercentage = Math.round(
		(courseData.completedLessons / courseData.totalLessons) * 100
	);

	return (
		<div className="flex flex-col min-h-screen bg-white">
			{/* Course Header */}
			<div className="relative">
				<div className="h-48 bg-gray-300">
					{courseData.imageUrl && (
						<Image
							src={courseData.imageUrl}
							alt={courseData.title}
							fill
							className="object-cover"
						/>
					)}
					<div className="absolute top-0 left-0 w-full p-4">
						<button
							onClick={() => router.back()}
							className="bg-black bg-opacity-30 text-white p-2 rounded-full"
						>
							<ArrowLeft size={20} />
						</button>
					</div>
					<div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
						<div className="flex items-center mb-1">
							<span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full mr-2">
								{courseData.level}
							</span>
							<div className="flex items-center text-yellow-400">
								<Star size={14} className="fill-current" />
								<span className="text-white text-xs ml-1">
									{courseData.rating} ({courseData.reviewCount} reviews)
								</span>
							</div>
						</div>
						<h1 className="text-white text-xl font-bold">{courseData.title}</h1>
						<p className="text-white text-xs opacity-80">
							by {courseData.instructor}
						</p>
					</div>
				</div>
			</div>

			{/* Course Progress */}
			<div className="p-4 bg-indigo-700 text-white">
				<div className="flex justify-between items-center mb-2">
					<span className="text-sm font-medium">Your Progress</span>
					<span className="text-xs">
						{courseData.completedLessons}/{courseData.totalLessons} lessons
					</span>
				</div>
				<div className="h-2 bg-white bg-opacity-20 rounded-full">
					<div
						className="h-2 bg-white rounded-full"
						style={{ width: `${progressPercentage}%` }}
					></div>
				</div>
			</div>

			{/* Course Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Course Info Tabs */}
				<div className="border-b border-gray-200">
					<div className="flex">
						<button
							onClick={() => setActiveTab("lessons")}
							className={`flex-1 py-3 font-medium text-sm ${
								activeTab === "lessons"
									? "border-b-2 border-indigo-600 text-indigo-600"
									: "text-gray-500"
							}`}
						>
							Lessons
						</button>
						<button
							onClick={() => setActiveTab("about")}
							className={`flex-1 py-3 font-medium text-sm ${
								activeTab === "about"
									? "border-b-2 border-indigo-600 text-indigo-600"
									: "text-gray-500"
							}`}
						>
							About
						</button>
						<button
							onClick={() => setActiveTab("reviews")}
							className={`flex-1 py-3 font-medium text-sm ${
								activeTab === "reviews"
									? "border-b-2 border-indigo-600 text-indigo-600"
									: "text-gray-500"
							}`}
						>
							Reviews
						</button>
					</div>
				</div>

				{/* Tab Content */}
				<div className="flex-1 overflow-y-auto">
					{activeTab === "lessons" && (
						<div className="divide-y divide-gray-100">
							{courseData.lessons.map((lesson) => (
								<div
									key={lesson.id}
									className={`p-4 flex items-center ${
										lesson.isCurrent ? "bg-indigo-50" : ""
									}`}
								>
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
											lesson.isCompleted
												? "bg-green-100 text-green-600"
												: lesson.isCurrent
												? "bg-indigo-100 text-indigo-600"
												: "bg-gray-100 text-gray-400"
										}`}
									>
										{lesson.isCompleted ? (
											<Check size={16} />
										) : lesson.isCurrent ? (
											<PlayCircle size={16} />
										) : (
											<span className="text-sm">
												{courseData.lessons.findIndex(
													(l) => l.id === lesson.id
												) + 1}
											</span>
										)}
									</div>
									<div className="flex-1">
										<h3
											className={`text-sm font-medium ${
												lesson.isCurrent ? "text-indigo-700" : "text-gray-800"
											}`}
										>
											{lesson.title}
										</h3>
										<span className="text-xs text-gray-500">
											{lesson.duration}
										</span>
									</div>
									{lesson.isCompleted ? (
										<span className="text-green-600 text-xs">Completed</span>
									) : lesson.isCurrent ? (
										<Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
											<button className="bg-indigo-600 text-white text-xs rounded-full px-3 py-1">
												Continue
											</button>
										</Link>
									) : (
										<Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
											<button className="text-gray-400">
												<ChevronRight size={20} />
											</button>
										</Link>
									)}
								</div>
							))}
						</div>
					)}

					{activeTab === "about" && (
						<div className="p-4">
							<p className="text-sm text-gray-600 mb-4">
								{courseData.description}
							</p>

							<h3 className="font-medium mb-2">What you'll learn</h3>
							<ul className="list-disc list-inside mb-4 text-sm text-gray-600">
								<li>Core programming concepts in {courseData.title}</li>
								<li>How to write clean, efficient code</li>
								<li>Practical real-world examples and exercises</li>
								<li>Best practices and common patterns</li>
							</ul>

							<h3 className="font-medium mb-2">Course details</h3>
							<div className="flex flex-col space-y-2 mb-4">
								<div className="flex text-sm text-gray-600">
									<Clock size={16} className="mr-2" />
									<span>{courseData.totalTime}</span>
								</div>
								<div className="flex text-sm text-gray-600">
									<File size={16} className="mr-2" />
									<span>{courseData.totalLessons} lessons</span>
								</div>
								<div className="flex text-sm text-gray-600">
									<Award size={16} className="mr-2" />
									<span>Certificate upon completion</span>
								</div>
							</div>
						</div>
					)}

					{activeTab === "reviews" && (
						<div className="p-4">
							<div className="flex items-center mb-4">
								<div className="text-3xl font-bold mr-2">
									{courseData.rating}
								</div>
								<div>
									<div className="flex text-yellow-400">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												size={16}
												className={
													i < Math.floor(courseData.rating)
														? "fill-current"
														: ""
												}
											/>
										))}
									</div>
									<div className="text-xs text-gray-500">
										{courseData.reviewCount} reviews
									</div>
								</div>
							</div>

							<p className="text-sm text-gray-500 italic">
								Reviews are coming soon...
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Bottom Action */}
			<div className="p-4 border-t border-gray-200 bg-white">
				<button className="bg-indigo-600 text-white w-full py-3 rounded-xl font-medium flex items-center justify-center">
					<Download size={18} className="mr-2" />
					Download for Offline
				</button>
			</div>
		</div>
	);
}
