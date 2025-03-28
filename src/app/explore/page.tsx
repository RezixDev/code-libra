import CourseCard from "../../components/ui/CourseCard";
import SearchBar from "../../components/ui/SearchBar";
import SectionHeader from "../../components/ui/SectionHeader";

// Mock Data (replace with actual data fetching later)
interface Course {
	id: string;
	title: string;
	description: string;
	imageUrl?: string;
	tags?: string[];
}

const allCourses: Course[] = [
	{
		id: "ts-basics",
		title: "TypeScript Fundamentals",
		description: "Master the basics of TypeScript.",
		imageUrl: "/images/typescript-logo.png",
		tags: ["TypeScript", "Beginner"],
	},
	{
		id: "react-hooks",
		title: "React Hooks Deep Dive",
		description: "Understand useState, useEffect, etc.",
		imageUrl: "/images/react-logo.png",
		tags: ["React", "Intermediate"],
	},
	{
		id: "nextjs-app",
		title: "Next.js App Router",
		description: "Build modern web apps.",
		imageUrl: "/images/nextjs-logo.svg",
		tags: ["Next.js", "Framework"],
	},
	{
		id: "tailwind-css",
		title: "Tailwind CSS Essentials",
		description: "Utility-first CSS framework.",
		imageUrl: "/images/tailwind-logo.svg",
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
			<div className="space-y-4">
				{allCourses.map((course) => (
					<CourseCard key={course.id} course={course} />
				))}
			</div>
		</div>
	);
}
