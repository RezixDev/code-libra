// src/components/courses/CourseCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

// TypeScript interfaces
export interface Course {
	id: string;
	title: string;
	description: string;
	level: "Beginner" | "Intermediate" | "Advanced";
	imageUrl: string;
	totalLessons: number;
	completedLessons: number;
	currentLessonId?: string;
	currentLessonTitle?: string;
	tags: string[];
}

interface CourseCardProps {
	course: Course;
	variant?: "default" | "compact" | "featured";
	className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
	course,
	variant = "default",
	className = "",
}) => {
	const {
		id,
		title,
		description,
		level,
		imageUrl,
		totalLessons,
		completedLessons,
		currentLessonId,
		currentLessonTitle,
		tags,
	} = course;

	// Calculate progress percentage
	const progressPercentage = Math.round(
		(completedLessons / totalLessons) * 100
	);

	// Determine if course is in progress or not started
	const isInProgress = completedLessons > 0;

	// Get appropriate path for continuing or starting the course
	const continuePath = currentLessonId
		? `/courses/${id}/lessons/${currentLessonId}`
		: `/courses/${id}`;

	if (variant === "compact") {
		return (
			<Link href={`/courses/${id}`} className={`block ${className}`}>
				<div className="flex bg-gray-50 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
					<div className="relative w-24 h-24">
						<Image
							src={imageUrl}
							alt={title}
							fill
							className="object-cover"
							sizes="96px"
						/>
					</div>
					<div className="p-3 flex-1">
						<div className="flex justify-between items-start">
							<h3 className="font-medium text-sm">{title}</h3>
							<span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
								{level}
							</span>
						</div>
						<div className="mt-2">
							<div className="flex justify-between text-xs text-gray-500 mb-1">
								<span>Progress</span>
								<span>
									{completedLessons}/{totalLessons} lessons
								</span>
							</div>
							<div className="h-1.5 bg-gray-200 rounded-full">
								<div
									className="h-1.5 bg-indigo-600 rounded-full"
									style={{ width: `${progressPercentage}%` }}
								></div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		);
	}

	if (variant === "featured") {
		return (
			<div
				className={`bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 text-white ${className}`}
			>
				<div className="flex items-center justify-between mb-2">
					<span className="font-medium">{title}</span>
					<span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
						{completedLessons}/{totalLessons}
					</span>
				</div>
				<div className="h-2 bg-white bg-opacity-20 rounded-full mb-3">
					<div
						className="h-2 bg-white rounded-full"
						style={{ width: `${progressPercentage}%` }}
					></div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-sm">
						{currentLessonTitle || "Start course"}
					</span>
					<Link href={continuePath}>
						<button className="bg-white text-indigo-700 rounded-full p-2">
							<PlayCircle size={20} />
						</button>
					</Link>
				</div>
			</div>
		);
	}

	// Default variant
	return (
		<div
			className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg ${className}`}
		>
			<div className="relative h-40">
				<Image
					src={imageUrl}
					alt={title}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, 384px"
				/>
				<div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-indigo-700">
					{level}
				</div>
			</div>
			<div className="p-4">
				<h3 className="font-bold text-lg mb-1">{title}</h3>
				<p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

				<div className="flex flex-wrap gap-1 mb-3">
					{tags.slice(0, 3).map((tag, index) => (
						<span
							key={index}
							className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
						>
							{tag}
						</span>
					))}
					{tags.length > 3 && (
						<span className="text-gray-500 text-xs px-1">
							+{tags.length - 3} more
						</span>
					)}
				</div>

				<div className="mt-3">
					<div className="flex justify-between text-sm text-gray-500 mb-1">
						<span>Progress</span>
						<span>
							{completedLessons}/{totalLessons} lessons
						</span>
					</div>
					<div className="h-2 bg-gray-100 rounded-full">
						<div
							className="h-2 bg-indigo-600 rounded-full"
							style={{ width: `${progressPercentage}%` }}
						></div>
					</div>
				</div>

				<div className="mt-4">
					<Link href={continuePath}>
						<button
							className={`w-full py-2 rounded-lg font-medium text-sm ${
								isInProgress
									? "bg-indigo-600 text-white"
									: "bg-indigo-50 text-indigo-700"
							}`}
						>
							{isInProgress ? "Continue Learning" : "Start Course"}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
