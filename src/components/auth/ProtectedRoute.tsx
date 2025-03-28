// src/components/auth/ProtectedRoute.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		// Wait for auth state to load
		if (!isLoading) {
			if (!isAuthenticated) {
				// Redirect to login if not authenticated
				router.push("/auth/login");
			} else {
				setIsChecking(false);
			}
		}
	}, [isAuthenticated, isLoading, router]);

	// Show loading state while checking authentication
	if (isLoading || isChecking) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	// Render children if authenticated
	return <>{children}</>;
};

export default ProtectedRoute;
