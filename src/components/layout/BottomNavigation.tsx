//---------- BottomNavigation.tsx ----------//
// src/components/layout/BottomNavigation.tsx
import React from "react";
import Link from "next/link";
import { Home, Book, Code, User } from "lucide-react";

interface BottomNavigationProps {
	activeTab: "home" | "courses" | "practice" | "profile";
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab }) => {
	const tabs = [
		{ id: "home", label: "Home", icon: <Home size={20} />, path: "/" },
		{
			id: "courses",
			label: "Courses",
			icon: <Book size={20} />,
			path: "/courses",
		},
		{
			id: "practice",
			label: "Practice",
			icon: <Code size={20} />,
			path: "/practice",
		},
		{
			id: "profile",
			label: "Profile",
			icon: <User size={20} />,
			path: "/profile",
		},
	];

	return (
		<nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 px-4 py-3">
			<div className="flex justify-around">
				{tabs.map((tab) => {
					const isActive = tab.id === activeTab;
					return (
						<Link
							href={tab.path}
							key={tab.id}
							className={`flex flex-col items-center ${
								isActive ? "text-indigo-600" : "text-gray-500"
							}`}
						>
							{tab.icon}
							<span className="text-xs mt-1">{tab.label}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default BottomNavigation;
