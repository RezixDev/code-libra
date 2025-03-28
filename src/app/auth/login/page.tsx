//---------- src/app/auth/login/page.tsx ----------//
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Github, Twitter } from "lucide-react";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		// Simulate authentication delay
		try {
			// In a real app, this would be an API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Simple validation
			if (!email || !password) {
				throw new Error("Please fill in all fields");
			}

			// Fake successful login for demo purposes
			if (email === "demo@example.com" && password === "password") {
				// Navigate to home page after successful login
				router.push("/");
			} else {
				throw new Error("Invalid credentials");
			}
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "An unknown error occurred"
			);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="min-h-screen flex flex-col bg-white">
			{/* Header */}
			<div className="p-4 flex justify-between items-center">
				<Link href="/" className="text-gray-700">
					Cancel
				</Link>
				<h1 className="text-lg font-semibold">Log In</h1>
				<div className="w-12"></div> {/* Spacer for alignment */}
			</div>

			{/* Main Content */}
			<div className="flex-1 p-6 flex flex-col">
				<div className="mb-8 text-center">
					<h2 className="text-2xl font-bold mb-2">Welcome back</h2>
					<p className="text-gray-600">
						Log in to continue your coding journey
					</p>
				</div>

				<form onSubmit={handleLogin} className="space-y-4 mb-6">
					{error && (
						<div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
							{error}
						</div>
					)}

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="your@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<button
								type="button"
								className="absolute right-3 top-3 text-gray-500"
								onClick={toggleShowPassword}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
					</div>

					<div className="flex justify-end">
						<Link
							href="/auth/forgot-password"
							className="text-sm text-indigo-600 hover:text-indigo-800"
						>
							Forgot password?
						</Link>
					</div>

					<button
						type="submit"
						className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center ${
							isLoading
								? "opacity-70 cursor-not-allowed"
								: "hover:bg-indigo-700"
						}`}
						disabled={isLoading}
					>
						{isLoading ? "Logging in..." : "Log In"}
					</button>
				</form>

				<div className="relative flex items-center justify-center my-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300"></div>
					</div>
					<div className="relative bg-white px-4">
						<span className="text-sm text-gray-500">or continue with</span>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3 mb-8">
					<button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
						<Github size={20} className="mr-2" />
						<span>GitHub</span>
					</button>
					<button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
						<Twitter size={20} className="mr-2" />
						<span>Twitter</span>
					</button>
				</div>

				<div className="text-center">
					<p className="text-gray-600">
						Don't have an account?{" "}
						<Link
							href="/auth/signup"
							className="text-indigo-600 font-medium hover:text-indigo-800"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

//---------- src/app/auth/signup/page.tsx ----------//
("use client");

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Github, Twitter, Check } from "lucide-react";

export default function SignupPage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!acceptTerms) {
			setError("You must accept the terms and conditions to continue");
			return;
		}

		setIsLoading(true);

		// Simulate signup delay
		try {
			// In a real app, this would be an API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Simple validation
			if (!name || !email || !password) {
				throw new Error("Please fill in all fields");
			}

			if (password.length < 8) {
				throw new Error("Password must be at least 8 characters long");
			}

			// Fake successful signup for demo purposes
			// Navigate to onboarding page after successful signup
			router.push("/onboarding");
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "An unknown error occurred"
			);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	// Password strength indicator
	const getPasswordStrength = () => {
		if (!password) return { strength: 0, label: "" };

		if (password.length < 6) {
			return { strength: 1, label: "Weak" };
		} else if (password.length < 10) {
			return { strength: 2, label: "Medium" };
		} else {
			return { strength: 3, label: "Strong" };
		}
	};

	const passwordStrength = getPasswordStrength();

	const getPasswordStrengthColor = () => {
		switch (passwordStrength.strength) {
			case 1:
				return "bg-red-500";
			case 2:
				return "bg-yellow-500";
			case 3:
				return "bg-green-500";
			default:
				return "bg-gray-200";
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-white">
			{/* Header */}
			<div className="p-4 flex justify-between items-center">
				<Link href="/" className="text-gray-700">
					Cancel
				</Link>
				<h1 className="text-lg font-semibold">Sign Up</h1>
				<div className="w-12"></div> {/* Spacer for alignment */}
			</div>

			{/* Main Content */}
			<div className="flex-1 p-6 flex flex-col">
				<div className="mb-8 text-center">
					<h2 className="text-2xl font-bold mb-2">Create your account</h2>
					<p className="text-gray-600">Start your programming journey today</p>
				</div>

				<form onSubmit={handleSignup} className="space-y-4 mb-6">
					{error && (
						<div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
							{error}
						</div>
					)}

					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Full Name
						</label>
						<input
							id="name"
							type="text"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="John Doe"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="your@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
								placeholder="Create a password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								minLength={8}
							/>
							<button
								type="button"
								className="absolute right-3 top-3 text-gray-500"
								onClick={toggleShowPassword}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>

						{/* Password strength indicator */}
						{password && (
							<div className="mt-2">
								<div className="flex justify-between items-center mb-1">
									<div className="flex space-x-1">
										<div
											className={`h-1.5 w-8 rounded-full ${
												passwordStrength.strength >= 1
													? getPasswordStrengthColor()
													: "bg-gray-200"
											}`}
										></div>
										<div
											className={`h-1.5 w-8 rounded-full ${
												passwordStrength.strength >= 2
													? getPasswordStrengthColor()
													: "bg-gray-200"
											}`}
										></div>
										<div
											className={`h-1.5 w-8 rounded-full ${
												passwordStrength.strength >= 3
													? getPasswordStrengthColor()
													: "bg-gray-200"
											}`}
										></div>
									</div>
									<span className="text-xs text-gray-500">
										{passwordStrength.label}
									</span>
								</div>
								<p className="text-xs text-gray-500">
									Use at least 8 characters with a mix of letters, numbers and
									symbols.
								</p>
							</div>
						)}
					</div>

					<div className="flex items-start">
						<div className="flex items-center h-5">
							<input
								id="terms"
								type="checkbox"
								className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
								checked={acceptTerms}
								onChange={() => setAcceptTerms(!acceptTerms)}
							/>
						</div>
						<div className="ml-3 text-sm">
							<label htmlFor="terms" className="text-gray-700">
								I agree to the{" "}
								<Link
									href="/terms"
									className="text-indigo-600 hover:text-indigo-800"
								>
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link
									href="/privacy"
									className="text-indigo-600 hover:text-indigo-800"
								>
									Privacy Policy
								</Link>
							</label>
						</div>
					</div>

					<button
						type="submit"
						className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center ${
							isLoading
								? "opacity-70 cursor-not-allowed"
								: "hover:bg-indigo-700"
						}`}
						disabled={isLoading}
					>
						{isLoading ? "Creating account..." : "Sign Up"}
					</button>
				</form>

				<div className="relative flex items-center justify-center my-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300"></div>
					</div>
					<div className="relative bg-white px-4">
						<span className="text-sm text-gray-500">or continue with</span>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3 mb-8">
					<button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
						<Github size={20} className="mr-2" />
						<span>GitHub</span>
					</button>
					<button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
						<Twitter size={20} className="mr-2" />
						<span>Twitter</span>
					</button>
				</div>

				<div className="text-center">
					<p className="text-gray-600">
						Already have an account?{" "}
						<Link
							href="/auth/login"
							className="text-indigo-600 font-medium hover:text-indigo-800"
						>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

//---------- src/app/auth/forgot-password/page.tsx ----------//
("use client");

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		// Simulate request delay
		try {
			// In a real app, this would be an API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Simple validation
			if (!email) {
				throw new Error("Please enter your email address");
			}

			// Mark as submitted for success state
			setIsSubmitted(true);
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "An unknown error occurred"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-white">
			{/* Header */}
			<div className="p-4 flex justify-between items-center">
				<Link href="/auth/login" className="text-gray-700 flex items-center">
					<ArrowLeft size={20} className="mr-1" />
					Back
				</Link>
				<h1 className="text-lg font-semibold">Reset Password</h1>
				<div className="w-20"></div> {/* Spacer for alignment */}
			</div>

			{/* Main Content */}
			<div className="flex-1 p-6 flex flex-col">
				{!isSubmitted ? (
					<>
						<div className="mb-8 text-center">
							<h2 className="text-2xl font-bold mb-2">Forgot your password?</h2>
							<p className="text-gray-600">
								Enter your email and we'll send you a link to reset your
								password
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4 mb-6">
							{error && (
								<div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
									{error}
								</div>
							)}

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Email
								</label>
								<input
									id="email"
									type="email"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									placeholder="your@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							<button
								type="submit"
								className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center ${
									isLoading
										? "opacity-70 cursor-not-allowed"
										: "hover:bg-indigo-700"
								}`}
								disabled={isLoading}
							>
								{isLoading ? "Sending..." : "Send Reset Link"}
							</button>
						</form>
					</>
				) : (
					<div className="flex-1 flex flex-col items-center justify-center text-center px-4">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
							<Check size={32} className="text-green-600" />
						</div>

						<h2 className="text-2xl font-bold mb-2">Check your email</h2>
						<p className="text-gray-600 mb-8">
							We've sent a password reset link to <strong>{email}</strong>.
							Please check your email and follow the instructions.
						</p>

						<Link
							href="/auth/login"
							className="text-indigo-600 font-medium hover:text-indigo-800"
						>
							Return to login
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
