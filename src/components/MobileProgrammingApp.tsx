import React, { useState } from "react";
import {
	Code,
	Book,
	Award,
	Home,
	User,
	Menu,
	X,
	ChevronRight,
	PlayCircle,
} from "lucide-react";

const MobileProgrammingApp = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [currentTab, setCurrentTab] = useState("home");

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const courses = [
		{
			id: 1,
			title: "JavaScript Fundamentals",
			level: "Beginner",
			lessonsCount: 12,
			completedLessons: 5,
			image: "/api/placeholder/250/150",
		},
		{
			id: 2,
			title: "React Hooks & Context",
			level: "Intermediate",
			lessonsCount: 8,
			completedLessons: 2,
			image: "/api/placeholder/250/150",
		},
		{
			id: 3,
			title: "TypeScript Advanced Types",
			level: "Advanced",
			lessonsCount: 10,
			completedLessons: 0,
			image: "/api/placeholder/250/150",
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

	return (
		<div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
			<div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden h-[600px]">
				{/* Side Menu */}
				<div
					className={`absolute top-0 left-0 z-20 h-full w-64 bg-indigo-900 transform transition-transform ${
						isMenuOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className="p-4 text-white flex justify-between">
						<span className="font-bold text-xl">CodeLearn</span>
						<button onClick={toggleMenu} className="text-white">
							<X size={24} />
						</button>
					</div>
					<div className="px-4 py-2 mt-4">
						<div className="bg-indigo-800 rounded-xl p-4 mb-6">
							<div className="flex items-center space-x-3">
								<div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
									<User size={20} className="text-white" />
								</div>
								<div>
									<p className="text-white font-medium">Alex Johnson</p>
									<p className="text-indigo-300 text-sm">Beginner</p>
								</div>
							</div>
						</div>

						<nav>
							<ul className="space-y-3">
								<li>
									<a
										href="#"
										className="flex items-center text-white opacity-80 hover:opacity-100"
									>
										<Home size={20} className="mr-3" />
										Home
									</a>
								</li>
								<li>
									<a
										href="#"
										className="flex items-center text-white opacity-80 hover:opacity-100"
									>
										<Book size={20} className="mr-3" />
										My Courses
									</a>
								</li>
								<li>
									<a
										href="#"
										className="flex items-center text-white opacity-80 hover:opacity-100"
									>
										<Code size={20} className="mr-3" />
										Playground
									</a>
								</li>
								<li>
									<a
										href="#"
										className="flex items-center text-white opacity-80 hover:opacity-100"
									>
										<Award size={20} className="mr-3" />
										Achievements
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				{/* Main App Content */}
				<div className="flex flex-col h-full">
					{/* App Header */}
					<header className="bg-indigo-700 text-white p-4 flex items-center justify-between">
						<div className="flex items-center">
							<button onClick={toggleMenu} className="mr-3">
								<Menu size={24} />
							</button>
							<h1 className="text-lg font-bold">CodeLearn</h1>
						</div>
						<div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
							<User size={18} className="text-white" />
						</div>
					</header>

					{/* Main Content */}
					<main className="flex-1 overflow-y-auto p-4">
						{currentTab === "home" && (
							<>
								<div className="mb-6">
									<h2 className="text-lg font-bold mb-2">Continue Learning</h2>
									<div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 text-white">
										<div className="flex items-center justify-between mb-2">
											<span className="font-medium">
												JavaScript Fundamentals
											</span>
											<span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
												5/12
											</span>
										</div>
										<div className="h-2 bg-white bg-opacity-20 rounded-full mb-3">
											<div
												className="h-2 bg-white rounded-full"
												style={{ width: "42%" }}
											></div>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm">Lesson 6: Arrays</span>
											<button className="bg-white text-indigo-700 rounded-full p-2">
												<PlayCircle size={20} />
											</button>
										</div>
									</div>
								</div>

								<div className="mb-6">
									<div className="flex justify-between items-center mb-2">
										<h2 className="text-lg font-bold">My Courses</h2>
										<a
											href="#"
											className="text-indigo-600 text-sm flex items-center"
										>
											View All <ChevronRight size={16} />
										</a>
									</div>
									<div className="space-y-3">
										{courses.map((course) => (
											<div
												key={course.id}
												className="flex bg-gray-50 rounded-xl overflow-hidden shadow-sm"
											>
												<img
													src={course.image}
													alt={course.title}
													className="w-24 h-24 object-cover"
												/>
												<div className="p-3 flex-1">
													<div className="flex justify-between items-start">
														<h3 className="font-medium text-sm">
															{course.title}
														</h3>
														<span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
															{course.level}
														</span>
													</div>
													<div className="mt-2">
														<div className="flex justify-between text-xs text-gray-500 mb-1">
															<span>Progress</span>
															<span>
																{course.completedLessons}/{course.lessonsCount}{" "}
																lessons
															</span>
														</div>
														<div className="h-1.5 bg-gray-200 rounded-full">
															<div
																className="h-1.5 bg-indigo-600 rounded-full"
																style={{
																	width: `${
																		(course.completedLessons /
																			course.lessonsCount) *
																		100
																	}%`,
																}}
															></div>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>

								<div>
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
							</>
						)}
					</main>

					{/* Bottom Navigation */}
					<nav className="bg-white border-t border-gray-200 px-4 py-3">
						<div className="flex justify-around">
							<button
								onClick={() => setCurrentTab("home")}
								className={`flex flex-col items-center ${
									currentTab === "home" ? "text-indigo-600" : "text-gray-500"
								}`}
							>
								<Home size={20} />
								<span className="text-xs mt-1">Home</span>
							</button>
							<button
								onClick={() => setCurrentTab("courses")}
								className={`flex flex-col items-center ${
									currentTab === "courses" ? "text-indigo-600" : "text-gray-500"
								}`}
							>
								<Book size={20} />
								<span className="text-xs mt-1">Courses</span>
							</button>
							<button
								onClick={() => setCurrentTab("code")}
								className={`flex flex-col items-center ${
									currentTab === "code" ? "text-indigo-600" : "text-gray-500"
								}`}
							>
								<Code size={20} />
								<span className="text-xs mt-1">Practice</span>
							</button>
							<button
								onClick={() => setCurrentTab("profile")}
								className={`flex flex-col items-center ${
									currentTab === "profile" ? "text-indigo-600" : "text-gray-500"
								}`}
							>
								<User size={20} />
								<span className="text-xs mt-1">Profile</span>
							</button>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default MobileProgrammingApp;
