// src/app/practice/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
	Search,
	Filter,
	Clock,
	Code,
	ChevronRight,
	ArrowUp,
	ArrowDown,
} from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import SideMenu from "@/components/layout/SideMenu";

// Types
interface Challenge {
	id: string;
	title: string;
	difficulty: "Easy" | "Medium" | "Hard";
	category: string;
	tags: string[];
	estimatedTime: string;
	completedCount: number;
	isCompleted: boolean;
}

// Sample data
const CHALLENGES: Challenge[] = [
	{
		id: "sum-array",
		title: "Sum Array Elements",
		difficulty: "Easy",
		category: "Arrays",
		tags: ["JavaScript", "Arrays", "Loops"],
		estimatedTime: "10 mins",
		completedCount: 3278,
		isCompleted: true,
	},
	{
		id: "palindrome-check",
		title: "Check for Palindrome",
		difficulty: "Easy",
		category: "Strings",
		tags: ["JavaScript", "Strings", "Algorithms"],
		estimatedTime: "15 mins",
		completedCount: 2954,
		isCompleted: true,
	},
	{
		id: "find-duplicates",
		title: "Find Duplicates in Array",
		difficulty: "Medium",
		category: "Arrays",
		tags: ["JavaScript", "Arrays", "Data Structures"],
		estimatedTime: "20 mins",
		completedCount: 1876,
		isCompleted: false,
	},
	{
		id: "reverse-linked-list",
		title: "Reverse a Linked List",
		difficulty: "Medium",
		category: "Linked Lists",
		tags: ["JavaScript", "Linked Lists", "Algorithms"],
		estimatedTime: "25 mins",
		completedCount: 1543,
		isCompleted: false,
	},
	{
		id: "binary-search-tree",
		title: "Implement Binary Search Tree",
		difficulty: "Hard",
		category: "Trees",
		tags: ["JavaScript", "Trees", "Data Structures"],
		estimatedTime: "30 mins",
		completedCount: 876,
		isCompleted: false,
	},
	{
		id: "merge-sort",
		title: "Implement Merge Sort",
		difficulty: "Hard",
		category: "Sorting",
		tags: ["JavaScript", "Sorting", "Algorithms"],
		estimatedTime: "35 mins",
		completedCount: 765,
		isCompleted: false,
	},
];

// Filter options
type FilterOption =
	| "all"
	| "easy"
	| "medium"
	| "hard"
	| "completed"
	| "not-completed";
type SortOption = "popular" | "newest" | "difficulty-asc" | "difficulty-desc";

export default function PracticePage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
	const [sortBy, setSortBy] = useState<SortOption>("popular");

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	// Filter challenges based on current filters
	const filteredChallenges = CHALLENGES.filter((challenge) => {
		// Apply search filter
		if (
			searchQuery &&
			!challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false;
		}

		// Apply difficulty/completion filters
		switch (activeFilter) {
			case "easy":
				return challenge.difficulty === "Easy";
			case "medium":
				return challenge.difficulty === "Medium";
			case "hard":
				return challenge.difficulty === "Hard";
			case "completed":
				return challenge.isCompleted;
			case "not-completed":
				return !challenge.isCompleted;
			case "all":
			default:
				return true;
		}
	});

	// Sort challenges
	const sortedChallenges = [...filteredChallenges].sort((a, b) => {
		switch (sortBy) {
			case "popular":
				return b.completedCount - a.completedCount;
			case "newest":
				// In a real app, you'd sort by date
				return 0;
			case "difficulty-asc":
				const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
				return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
			case "difficulty-desc":
				const difficultyOrderDesc = { Easy: 1, Medium: 2, Hard: 3 };
				return (
					difficultyOrderDesc[b.difficulty] - difficultyOrderDesc[a.difficulty]
				);
			default:
				return 0;
		}
	});

	// Get the difficulty badge color
	const getDifficultyColor = (difficulty: Challenge["difficulty"]) => {
		switch (difficulty) {
			case "Easy":
				return "bg-green-100 text-green-800";
			case "Medium":
				return "bg-yellow-100 text-yellow-800";
			case "Hard":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="relative min-h-screen bg-gray-100">
			{/* Side Menu */}
			<SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

			{/* Main Content */}
			<div className="flex flex-col min-h-screen pb-16">
				{/* Header */}
				<Header onMenuToggle={toggleMenu} />

				{/* Page Header */}
				<div className="bg-indigo-700 text-white p-4">
					<h1 className="text-xl font-bold mb-1">Practice Coding</h1>
					<p className="text-sm text-indigo-100">
						Solve challenges to improve your programming skills
					</p>
				</div>

				{/* Search Bar */}
				<div className="p-4 bg-white border-b">
					<div className="relative">
						<input
							type="text"
							placeholder="Search challenges..."
							className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<Search
							size={18}
							className="absolute left-3 top-2.5 text-gray-400"
						/>
					</div>
				</div>

				{/* Filter Tabs */}
				<div className="px-4 pt-3 bg-white overflow-x-auto">
					<div className="flex space-x-2 pb-3">
						{[
							{ id: "all", label: "All" },
							{ id: "easy", label: "Easy" },
							{ id: "medium", label: "Medium" },
							{ id: "hard", label: "Hard" },
							{ id: "completed", label: "Completed" },
							{ id: "not-completed", label: "Not Started" },
						].map((filter) => (
							<button
								key={filter.id}
								className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium ${
									activeFilter === filter.id
										? "bg-indigo-100 text-indigo-700"
										: "bg-gray-100 text-gray-700"
								}`}
								onClick={() => setActiveFilter(filter.id as FilterOption)}
							>
								{filter.label}
							</button>
						))}
					</div>
				</div>

				{/* Sort Options */}
				<div className="p-4 bg-white border-b flex justify-between items-center">
					<div className="flex items-center text-gray-600">
						<Filter size={16} className="mr-2" />
						<span className="text-sm">Sort By:</span>
					</div>
					<select
						className="bg-white border border-gray-200 rounded-lg text-sm px-2 py-1"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value as SortOption)}
					>
						<option value="popular">Most Popular</option>
						<option value="newest">Newest</option>
						<option value="difficulty-asc">Difficulty (Easy to Hard)</option>
						<option value="difficulty-desc">Difficulty (Hard to Easy)</option>
					</select>
				</div>

				{/* Challenge List */}
				<div className="flex-1 p-4 bg-gray-100">
					{sortedChallenges.length > 0 ? (
						<div className="space-y-3">
							{sortedChallenges.map((challenge) => (
								<Link href={`/practice/${challenge.id}`} key={challenge.id}>
									<div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
										<div className="flex justify-between items-start">
											<h3 className="font-medium">{challenge.title}</h3>
											<span
												className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
													challenge.difficulty
												)}`}
											>
												{challenge.difficulty}
											</span>
										</div>

										<div className="flex flex-wrap gap-1 mt-2">
											{challenge.tags.map((tag, idx) => (
												<span
													key={idx}
													className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
												>
													{tag}
												</span>
											))}
										</div>

										<div className="flex justify-between items-center mt-3">
											<div className="flex items-center text-gray-500 text-xs">
												<Clock size={14} className="mr-1" />
												<span>{challenge.estimatedTime}</span>
												<Code size={14} className="ml-3 mr-1" />
												<span>{challenge.completedCount} solved</span>
											</div>

											<div className="flex items-center">
												{challenge.isCompleted && (
													<span className="text-green-600 text-xs mr-2">
														Completed
													</span>
												)}
												<ChevronRight size={16} className="text-gray-400" />
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-8">
							<div className="bg-gray-200 rounded-full p-4 mb-3">
								<Code size={24} className="text-gray-500" />
							</div>
							<p className="text-gray-500 mb-1">No challenges found</p>
							<p className="text-sm text-gray-400">
								Try adjusting your filters
							</p>
						</div>
					)}
				</div>

				{/* Bottom Navigation */}
				<BottomNavigation activeTab="practice" />
			</div>
		</div>
	);
}
