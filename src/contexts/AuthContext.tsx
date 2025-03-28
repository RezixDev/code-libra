// src/contexts/AuthContext.tsx
"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

// Define user type
export interface User {
	id: string;
	name: string;
	email: string;
	level: string;
	avatar?: string;
	experiencePoints: number;
}

// Define the auth context shape
interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	signup: (name: string, email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	updateUser: (userData: Partial<User>) => Promise<void>;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
	user: null,
	isLoading: true,
	isAuthenticated: false,
	login: async () => {},
	signup: async () => {},
	logout: async () => {},
	updateUser: async () => {},
});

// Sample user data - in a real app, this would come from your backend
const SAMPLE_USER: User = {
	id: "user-001",
	name: "Alex Johnson",
	email: "demo@example.com",
	level: "Beginner",
	experiencePoints: 1250,
};

// Auth context provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	// Check for existing session on mount
	useEffect(() => {
		const checkAuth = async () => {
			try {
				// In a real app, check for valid session/token
				const storedUser = localStorage.getItem("user");

				if (storedUser) {
					setUser(JSON.parse(storedUser));
				}
			} catch (error) {
				console.error("Authentication error:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	// Handle user login
	const login = async (email: string, password: string) => {
		setIsLoading(true);

		try {
			// In a real app, make an API call to authenticate
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Simple validation for demo
			if (email === "demo@example.com" && password === "password") {
				setUser(SAMPLE_USER);
				localStorage.setItem("user", JSON.stringify(SAMPLE_USER));
			} else {
				throw new Error("Invalid credentials");
			}
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	// Handle user signup
	const signup = async (name: string, email: string, password: string) => {
		setIsLoading(true);

		try {
			// In a real app, make an API call to register
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Simple validation
			if (!name || !email || !password) {
				throw new Error("Please fill in all fields");
			}

			if (password.length < 8) {
				throw new Error("Password must be at least 8 characters long");
			}

			// Create a new user based on input
			const newUser: User = {
				id: `user-${Date.now()}`,
				name,
				email,
				level: "Beginner",
				experiencePoints: 0,
			};

			setUser(newUser);
			localStorage.setItem("user", JSON.stringify(newUser));
		} catch (error) {
			console.error("Signup error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	// Handle user logout
	const logout = async () => {
		setIsLoading(true);

		try {
			// In a real app, invalidate session/token
			await new Promise((resolve) => setTimeout(resolve, 500));

			setUser(null);
			localStorage.removeItem("user");

			// Redirect to login page
			router.push("/auth/login");
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Update user data
	const updateUser = async (userData: Partial<User>) => {
		setIsLoading(true);

		try {
			// In a real app, make an API call to update user data
			await new Promise((resolve) => setTimeout(resolve, 1000));

			if (user) {
				const updatedUser = { ...user, ...userData };
				setUser(updatedUser);
				localStorage.setItem("user", JSON.stringify(updatedUser));
			}
		} catch (error) {
			console.error("Update user error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	// Compute authentication state
	const isAuthenticated = !!user;

	// Provide auth context to children
	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				isAuthenticated,
				login,
				signup,
				logout,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Export auth provider as default
export default AuthProvider;
