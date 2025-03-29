//---------- Header.tsx ----------//
// src/components/layout/Header.tsx
import React from "react";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface HeaderProps {
	onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
	return (
		<header className="bg-indigo-700 text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-50">
			<div className="flex items-center">
				<button onClick={onMenuToggle} className="mr-3 p-1 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
					<Menu size={24} />
				</button>
				<Link href="/" className="text-lg font-bold hover:opacity-90 transition-opacity">
					CodeLearn
				</Link>
			</div>
			<div className="flex items-center space-x-3">
				<SignedOut>
					<Link href="/auth/sign-in">
						<button className="text-sm font-medium px-3 py-1.5 rounded-md hover:bg-indigo-600 transition-colors">
							Sign In
						</button>
					</Link>
					<Link href="/auth/sign-up">
						<button className="text-sm font-medium bg-white text-indigo-700 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
							Sign Up
						</button>
					</Link>
				</SignedOut>
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
				</SignedIn>
			</div>
		</header>
	);
};

export default Header;
