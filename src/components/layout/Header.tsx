//---------- Header.tsx ----------//
// src/components/layout/Header.tsx
import React from "react";
import Link from "next/link";
import { Menu, User } from "lucide-react";

interface HeaderProps {
	onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
	return (
		<header className="bg-indigo-700 text-white p-4 flex items-center justify-between">
			<div className="flex items-center">
				<button onClick={onMenuToggle} className="mr-3">
					<Menu size={24} />
				</button>
				<Link href="/" className="text-lg font-bold">
					CodeLearn
				</Link>
			</div>
			<Link href="/profile">
				<div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center cursor-pointer hover:bg-indigo-400 transition-colors">
					<User size={18} className="text-white" />
				</div>
			</Link>
		</header>
	);
};

export default Header;
