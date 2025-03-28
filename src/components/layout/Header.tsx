//---------- Header.tsx ----------//
// src/components/layout/Header.tsx
import React from "react";
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
				<h1 className="text-lg font-bold">CodeLearn</h1>
			</div>
			<div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
				<User size={18} className="text-white" />
			</div>
		</header>
	);
};

export default Header;
