import CourseCard from "@/components/courses/CourseCard";
import SearchBar from "@/components/ui/SearchBar";
import SectionHeader from "@/components/ui/SectionHeader";

// Mock Data (replace with actual data fetching later)
interface Course {
	id: string;
	title: string;
	description: string;
	level: "Beginner" | "Intermediate" | "Advanced";
	totalLessons: number;
	completedLessons: number;
	tags: string[];
}

const allCourses: Course[] = [
	{
		id: "ts-basics",
		title: "TypeScript Fundamentals",
		description: "Master the basics of TypeScript.",
		level: "Beginner",
		totalLessons: 10,
		completedLessons: 0,
		tags: ["TypeScript", "Beginner"],
	},
	{
		id: "react-hooks",
		title: "React Hooks Deep Dive",
		description: "Understand useState, useEffect, and other React hooks.",
		level: "Intermediate",
		totalLessons: 8,
		completedLessons: 0,
		tags: ["React", "Intermediate"],
	},
	{
		id: "nextjs-app",
		title: "Next.js App Router",
		description: "Build modern web apps with Next.js and the App Router.",
		level: "Advanced",
		totalLessons: 12,
		completedLessons: 0,
		tags: ["Next.js", "Framework"],
	},
	{
		id: "tailwind-css",
		title: "Tailwind CSS Essentials",
		description: "Learn the utility-first CSS framework for rapid UI development.",
		level: "Beginner",
		totalLessons: 6,
		completedLessons: 0,
		tags: ["CSS", "Styling"],
	},
	// ... more courses
];

export default function ExplorePage() {
	// In a real app, you'd have state for search query and filtering
	// const [searchQuery, setSearchQuery] = useState('');
	// const [filteredCourses, setFilteredCourses] = useState(allCourses);

	const handleSearch = (query: string) => {
		console.log("Searching for:", query);
		// Implement filtering logic here
	};

	return (
		<div className="container mx-auto px-4 py-6 space-y-6">
			<SectionHeader title="Explore Courses" />

			{/* Search Bar Component */}
			<SearchBar
				onSearch={handleSearch}
				placeholder="Search courses, topics..."
			/>

			{/* Category Filters (Example) */}
			<div className="flex space-x-2 overflow-x-auto pb-2">
				<button className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200">
					All
				</button>
				<button className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm dark:bg-gray-700 dark:text-gray-200">
					React
				</button>
				<button className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm dark:bg-gray-700 dark:text-gray-200">
					Python
				</button>
				<button className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm dark:bg-gray-700 dark:text-gray-200">
					Beginner
				</button>
				{/* Add more filters */}
			</div>

			{/* Course List */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{allCourses.map((course) => (
					<CourseCard key={course.id} course={course} />
				))}
			</div>
		</div>
	);
}
