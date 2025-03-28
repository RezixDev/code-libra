//---------- SideMenu.tsx ----------//
// src/components/layout/SideMenu.tsx
import React from "react";
import Link from "next/link";
import { X, Home, Book, Code, Award, User } from "lucide-react";

interface SideMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
	return (
		<div
			className={`fixed top-0 left-0 z-20 h-full w-64 bg-indigo-900 transform transition-transform ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			}`}
		>
			<div className="p-4 text-white flex justify-between">
				<span className="font-bold text-xl">CodeLearn</span>
				<button onClick={onClose} className="text-white">
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
							<Link
								href="/"
								className="flex items-center text-white opacity-80 hover:opacity-100"
							>
								<Home size={20} className="mr-3" />
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/courses"
								className="flex items-center text-white opacity-80 hover:opacity-100"
							>
								<Book size={20} className="mr-3" />
								My Courses
							</Link>
						</li>
						<li>
							<Link
								href="/practice"
								className="flex items-center text-white opacity-80 hover:opacity-100"
							>
								<Code size={20} className="mr-3" />
								Practice
							</Link>
						</li>
						<li>
							<Link
								href="/profile"
								className="flex items-center text-white opacity-80 hover:opacity-100"
							>
								<Award size={20} className="mr-3" />
								Achievements
							</Link>
						</li>
						<li>
							<Link
								href="/profile"
								className="flex items-center text-white opacity-80 hover:opacity-100"
							>
								<User size={20} className="mr-3" />
								Profile
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default SideMenu;
