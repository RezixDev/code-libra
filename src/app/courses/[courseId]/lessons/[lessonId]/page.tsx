// src/app/courses/[courseId]/lessons/[lessonId]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
	ArrowLeft,
	ArrowRight,
	CheckCircle,
	BookOpen,
	Code,
	Play,
	Pause,
	Info,
	MessageSquare,
} from "lucide-react";

// Define lesson content type
interface LessonContent {
	id: string;
	title: string;
	courseId: string;
	content: {
		type: "text" | "code" | "image" | "video" | "quiz";
		content: string;
		language?: string;
		options?: string[];
		answer?: number;
	}[];
	prevLessonId?: string;
	nextLessonId?: string;
	timeToComplete: string;
}

// Mock lesson data - in a real app this would come from an API
const LESSON_DATA: Record<string, LessonContent> = {
	"js-arrays": {
		id: "js-arrays",
		title: "Arrays and Array Methods",
		courseId: "js-fundamentals",
		timeToComplete: "25 min",
		content: [
			{
				type: "text",
				content:
					"# Arrays in JavaScript\n\nArrays are a special type of object in JavaScript that allow you to store multiple values in a single variable. They are ordered collections that can hold any type of data.",
			},
			{
				type: "code",
				language: "javascript",
				content:
					'// Creating an array\nlet fruits = ["Apple", "Banana", "Orange"];\n\n// Accessing array elements (zero-indexed)\nconsole.log(fruits[0]); // Output: "Apple"\nconsole.log(fruits[1]); // Output: "Banana"\nconsole.log(fruits[2]); // Output: "Orange"',
			},
			{
				type: "text",
				content:
					"## Array Properties and Methods\n\nJavaScript arrays come with many built-in properties and methods that make them powerful tools for data manipulation.",
			},
			{
				type: "code",
				language: "javascript",
				content:
					"// Array length property\nlet numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.length); // Output: 5\n\n// Common Array Methods\n\n// 1. push() - adds element to the end\nnumbers.push(6);\nconsole.log(numbers); // [1, 2, 3, 4, 5, 6]\n\n// 2. pop() - removes element from the end\nlet lastNumber = numbers.pop();\nconsole.log(lastNumber); // 6\nconsole.log(numbers); // [1, 2, 3, 4, 5]\n\n// 3. unshift() - adds element to the beginning\nnumbers.unshift(0);\nconsole.log(numbers); // [0, 1, 2, 3, 4, 5]\n\n// 4. shift() - removes element from the beginning\nlet firstNumber = numbers.shift();\nconsole.log(firstNumber); // 0\nconsole.log(numbers); // [1, 2, 3, 4, 5]",
			},
			{
				type: "text",
				content:
					"## Array Iteration Methods\n\nModern JavaScript provides many powerful methods to iterate over arrays and transform data.",
			},
			{
				type: "code",
				language: "javascript",
				content:
					'// forEach() - executes a function on each element\nlet colors = ["red", "green", "blue"];\n\ncolors.forEach((color, index) => {\n  console.log(`Color at position ${index} is ${color}`);\n});\n\n// map() - creates a new array by transforming each element\nlet numbers = [1, 2, 3, 4, 5];\nlet doubled = numbers.map(num => num * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]\n\n// filter() - creates a new array with elements that pass a test\nlet evenNumbers = numbers.filter(num => num % 2 === 0);\nconsole.log(evenNumbers); // [2, 4]\n\n// reduce() - reduces array to a single value\nlet sum = numbers.reduce((total, num) => total + num, 0);\nconsole.log(sum); // 15',
			},
			{
				type: "quiz",
				content: "Which method adds an element to the end of an array?",
				options: ["unshift()", "push()", "pop()", "shift()"],
				answer: 1,
			},
		],
		prevLessonId: "js-loops",
		nextLessonId: "js-functions",
	},
};

export default function LessonViewPage() {
	const router = useRouter();
	const params = useParams();
	const courseId = params.courseId as string;
	const lessonId = params.lessonId as string;

	const [lessonData, setLessonData] = useState<LessonContent | null>(null);
	const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
	const [lessonComplete, setLessonComplete] = useState(false);

	useEffect(() => {
		// In a real app, you'd make an API call here
		if (lessonId && LESSON_DATA[lessonId]) {
			setLessonData(LESSON_DATA[lessonId]);
			// Reset quiz answers when changing lessons
			setQuizAnswers({});
			setLessonComplete(false);
		} else {
			// Handle lesson not found
			router.push(`/courses/${courseId}`);
		}
	}, [lessonId, courseId, router]);

	const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
		setQuizAnswers((prev) => ({
			...prev,
			[questionIndex]: answerIndex,
		}));
	};

	const markLessonComplete = () => {
		// In a real app, you would make an API call to update progress
		setLessonComplete(true);

		// Check if there's a next lesson to navigate to
		if (lessonData?.nextLessonId) {
			setTimeout(() => {
				router.push(`/courses/${courseId}/lessons/${lessonData.nextLessonId}`);
			}, 1500);
		}
	};

	if (!lessonData) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-100">
				<p>Loading lesson...</p>
			</div>
		);
	}

	// Count quiz questions
	const quizCount = lessonData.content.filter(
		(item) => item.type === "quiz"
	).length;

	// Check if all quizzes answered correctly
	const quizAnsweredCorrectly =
		quizCount > 0 &&
		lessonData.content
			.filter((item) => item.type === "quiz")
			.every((item, index) => {
				const quizIndex = lessonData.content.indexOf(item);
				return quizAnswers[quizIndex] === item.answer;
			});

	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			{/* Lesson Header */}
			<div className="bg-indigo-700 text-white p-4 flex items-center justify-between">
				<button
					onClick={() => router.push(`/courses/${courseId}`)}
					className="p-1"
				>
					<ArrowLeft size={20} />
				</button>
				<div className="text-center">
					<h1 className="text-lg font-medium truncate max-w-xs">
						{lessonData.title}
					</h1>
				</div>
				<div className="flex space-x-3">
					<button className="p-1">
						<Info size={20} />
					</button>
					<button className="p-1">
						<MessageSquare size={20} />
					</button>
				</div>
			</div>

			{/* Lesson Progress */}
			<div className="p-3 bg-indigo-800 text-white text-xs flex justify-between items-center">
				<div className="flex items-center">
					<BookOpen size={14} className="mr-1" />
					<span>Lesson {lessonId}</span>
				</div>
				<div className="flex items-center">
					<Play size={14} className="mr-1" />
					<span>{lessonData.timeToComplete}</span>
				</div>
			</div>

			{/* Lesson Content */}
			<div className="flex-1 overflow-y-auto p-4 pb-32">
				{lessonData.content.map((item, index) => {
					switch (item.type) {
						case "text":
							// Basic markdown-like rendering
							return (
								<div key={index} className="mb-6 prose max-w-none">
									{item.content.split("\n").map((paragraph, pIndex) => {
										if (paragraph.startsWith("# ")) {
											return (
												<h1 key={pIndex} className="text-2xl font-bold mb-3">
													{paragraph.substring(2)}
												</h1>
											);
										} else if (paragraph.startsWith("## ")) {
											return (
												<h2
													key={pIndex}
													className="text-xl font-bold mt-6 mb-3"
												>
													{paragraph.substring(3)}
												</h2>
											);
										} else if (paragraph.startsWith("### ")) {
											return (
												<h3
													key={pIndex}
													className="text-lg font-bold mt-5 mb-2"
												>
													{paragraph.substring(4)}
												</h3>
											);
										} else if (paragraph.trim() === "") {
											return <div key={pIndex} className="h-4"></div>;
										} else {
											return (
												<p key={pIndex} className="mb-4 text-gray-700">
													{paragraph}
												</p>
											);
										}
									})}
								</div>
							);

						case "code":
							return (
								<div key={index} className="mb-6">
									<div className="bg-gray-800 text-gray-200 rounded-t-lg px-4 py-2 text-sm flex items-center">
										<Code size={16} className="mr-2" />
										<span>{item.language || "Code"}</span>
									</div>
									<pre className="bg-gray-900 text-gray-200 p-4 rounded-b-lg overflow-x-auto text-sm">
										<code>{item.content}</code>
									</pre>
								</div>
							);

						case "quiz":
							const isAnswered = quizAnswers[index] !== undefined;
							const isCorrect =
								isAnswered && quizAnswers[index] === item.answer;

							return (
								<div
									key={index}
									className="mb-6 bg-white rounded-lg p-4 shadow-sm"
								>
									<h3 className="font-bold text-lg mb-3">Quiz Question</h3>
									<p className="mb-4">{item.content}</p>

									<div className="space-y-2">
										{item.options?.map((option, optionIndex) => (
											<button
												key={optionIndex}
												className={`w-full text-left p-3 rounded-lg border ${
													isAnswered
														? quizAnswers[index] === optionIndex
															? isCorrect
																? "bg-green-100 border-green-500"
																: "bg-red-100 border-red-500"
															: item.answer === optionIndex && isAnswered
															? "bg-green-100 border-green-500"
															: "bg-gray-50 border-gray-200"
														: "bg-gray-50 border-gray-200 hover:bg-gray-100"
												} transition-colors`}
												onClick={() =>
													!isAnswered && handleQuizAnswer(index, optionIndex)
												}
												disabled={isAnswered}
											>
												<div className="flex items-center">
													<div
														className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${
															isAnswered && quizAnswers[index] === optionIndex
																? isCorrect
																	? "bg-green-500 text-white"
																	: "bg-red-500 text-white"
																: "bg-gray-200 text-gray-700"
														}`}
													>
														{String.fromCharCode(65 + optionIndex)}
													</div>
													<span>{option}</span>
												</div>
											</button>
										))}
									</div>

									{isAnswered && (
										<div
											className={`mt-4 p-3 rounded-lg ${
												isCorrect
													? "bg-green-50 text-green-800"
													: "bg-red-50 text-red-800"
											}`}
										>
											{isCorrect
												? "Correct! Good job!"
												: `Incorrect. The correct answer is ${String.fromCharCode(
														65 + (item.answer || 0)
												  )}.`}
										</div>
									)}
								</div>
							);

						default:
							return null;
					}
				})}
			</div>

			{/* Bottom Navigation */}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
				<div className="flex justify-between mb-3">
					{lessonData.prevLessonId ? (
						<button
							onClick={() =>
								router.push(
									`/courses/${courseId}/lessons/${lessonData.prevLessonId}`
								)
							}
							className="flex items-center text-indigo-600"
						>
							<ArrowLeft size={16} className="mr-1" />
							<span className="text-sm">Previous</span>
						</button>
					) : (
						<div></div>
					)}

					{lessonData.nextLessonId && !lessonComplete ? (
						<button
							onClick={() =>
								router.push(
									`/courses/${courseId}/lessons/${lessonData.nextLessonId}`
								)
							}
							className="flex items-center text-indigo-600"
						>
							<span className="text-sm">Next</span>
							<ArrowRight size={16} className="ml-1" />
						</button>
					) : (
						<div></div>
					)}
				</div>

				<button
					onClick={markLessonComplete}
					disabled={(quizCount > 0 && !quizAnsweredCorrectly) || lessonComplete}
					className={`w-full py-3 rounded-xl font-medium flex items-center justify-center ${
						lessonComplete
							? "bg-green-600 text-white"
							: quizCount > 0 && !quizAnsweredCorrectly
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: "bg-indigo-600 text-white"
					}`}
				>
					{lessonComplete ? (
						<>
							<CheckCircle size={18} className="mr-2" />
							Completed
						</>
					) : (
						"Complete Lesson"
					)}
				</button>
			</div>
		</div>
	);
}
