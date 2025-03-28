// src/app/playground/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
	Play,
	Download,
	Copy,
	Save,
	Trash,
	ChevronDown,
	Share,
	Code,
	Settings,
} from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import SideMenu from "@/components/layout/SideMenu";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Define language options
interface Language {
	id: string;
	name: string;
	extension: string;
	defaultCode: string;
}

const languages: Language[] = [
	{
		id: "javascript",
		name: "JavaScript",
		extension: "js",
		defaultCode:
			'// JavaScript Code\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));',
	},
	{
		id: "python",
		name: "Python",
		extension: "py",
		defaultCode:
			'# Python Code\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))',
	},
	{
		id: "html",
		name: "HTML",
		extension: "html",
		defaultCode:
			"<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>Welcome to my page.</p>\n</body>\n</html>",
	},
	{
		id: "css",
		name: "CSS",
		extension: "css",
		defaultCode:
			"/* CSS Styles */\n\nbody {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background-color: #f5f5f5;\n}\n\nh1 {\n  color: #333;\n}",
	},
	{
		id: "typescript",
		name: "TypeScript",
		extension: "ts",
		defaultCode:
			'// TypeScript Code\n\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));',
	},
];

// Define saved project interface
interface SavedProject {
	id: string;
	name: string;
	language: string;
	code: string;
	createdAt: string;
	updatedAt: string;
}

export default function PlaygroundPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState<Language>(
		languages[0]
	);
	const [code, setCode] = useState(languages[0].defaultCode);
	const [output, setOutput] = useState("");
	const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
	const [isRunning, setIsRunning] = useState(false);
	const [projectName, setProjectName] = useState("Untitled Project");
	const [isSaving, setIsSaving] = useState(false);
	const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
	const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);

	// Load saved projects on mount
	useEffect(() => {
		const loadSavedProjects = () => {
			try {
				const savedData = localStorage.getItem("playground-projects");
				if (savedData) {
					setSavedProjects(JSON.parse(savedData));
				}
			} catch (error) {
				console.error("Error loading saved projects:", error);
			}
		};

		loadSavedProjects();
	}, []);

	// Toggle side menu
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	// Handle language change
	const handleLanguageChange = (language: Language) => {
		// Ask for confirmation if code has been modified
		if (code !== selectedLanguage.defaultCode) {
			if (
				!window.confirm("Changing language will reset your code. Continue?")
			) {
				return;
			}
		}

		setSelectedLanguage(language);
		setCode(language.defaultCode);
		setIsLanguageDropdownOpen(false);
	};

	// Run code
	const runCode = () => {
		setIsRunning(true);
		setOutput("Running...");

		// Simulate code execution (in a real app, this would send code to a backend)
		setTimeout(() => {
			let result = "";

			switch (selectedLanguage.id) {
				case "javascript":
				case "typescript":
					result = "Hello, World!\nProgram executed successfully.";
					break;
				case "python":
					result = "Hello, World!\nProgram executed successfully.";
					break;
				case "html":
					result =
						"HTML rendering is not supported in the console output.\nPlease use the preview tab to view your HTML.";
					break;
				case "css":
					result =
						"CSS styling is not displayed in the console output.\nPlease use the preview tab to view your styles.";
					break;
				default:
					result = "Language not supported for execution.";
			}

			setOutput(result);
			setIsRunning(false);
		}, 1500);
	};

	// Save project
	const saveProject = () => {
		setIsSaving(true);

		// In a real app, this would make an API call
		setTimeout(() => {
			const project: SavedProject = {
				id: Date.now().toString(),
				name: projectName,
				language: selectedLanguage.id,
				code,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			// Find if project already exists
			const projectIndex = savedProjects.findIndex(
				(p) => p.name === projectName
			);

			let updatedProjects: SavedProject[] = [];

			if (projectIndex >= 0) {
				// Update existing project
				updatedProjects = [...savedProjects];
				updatedProjects[projectIndex] = {
					...updatedProjects[projectIndex],
					code,
					language: selectedLanguage.id,
					updatedAt: new Date().toISOString(),
				};
			} else {
				// Add new project
				updatedProjects = [...savedProjects, project];
			}

			// Save to state and localStorage
			setSavedProjects(updatedProjects);
			localStorage.setItem(
				"playground-projects",
				JSON.stringify(updatedProjects)
			);

			setIsSaving(false);
		}, 1000);
	};

	// Load a saved project
	const loadProject = (project: SavedProject) => {
		// Ask for confirmation if current code has been modified
		if (code !== selectedLanguage.defaultCode) {
			if (
				!window.confirm(
					"Loading a project will replace your current code. Continue?"
				)
			) {
				return;
			}
		}

		// Find the language
		const language =
			languages.find((lang) => lang.id === project.language) || languages[0];

		// Set state
		setSelectedLanguage(language);
		setCode(project.code);
		setProjectName(project.name);
		setIsProjectsDropdownOpen(false);
		setOutput("");
	};

	// Delete a saved project
	const deleteProject = (projectId: string, event: React.MouseEvent) => {
		event.stopPropagation();

		if (window.confirm("Are you sure you want to delete this project?")) {
			const updatedProjects = savedProjects.filter((p) => p.id !== projectId);
			setSavedProjects(updatedProjects);
			localStorage.setItem(
				"playground-projects",
				JSON.stringify(updatedProjects)
			);
		}
	};

	return (
		<ProtectedRoute>
			<div className="relative min-h-screen bg-gray-100">
				{/* Side Menu */}
				<SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

				{/* Main Content */}
				<div className="flex flex-col min-h-screen pb-16">
					{/* Header */}
					<Header onMenuToggle={toggleMenu} />

					{/* Toolbar */}
					<div className="bg-gray-800 text-white p-3 flex items-center justify-between">
						{/* Project Name Input */}
						<input
							type="text"
							value={projectName}
							onChange={(e) => setProjectName(e.target.value)}
							className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm w-1/3"
						/>

						{/* Language Selector */}
						<div className="relative">
							<button
								className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 flex items-center text-sm"
								onClick={() =>
									setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
								}
							>
								{selectedLanguage.name}
								<ChevronDown size={16} className="ml-1" />
							</button>

							{isLanguageDropdownOpen && (
								<div className="absolute top-full right-0 mt-1 w-40 bg-gray-700 rounded-lg shadow-lg z-10">
									{languages.map((language) => (
										<button
											key={language.id}
											className="w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
											onClick={() => handleLanguageChange(language)}
										>
											{language.name}
										</button>
									))}
								</div>
							)}
						</div>

						{/* Actions */}
						<div className="flex space-x-2">
							{/* Saved Projects Dropdown */}
							<div className="relative">
								<button
									className="bg-gray-700 text-white p-2 rounded hover:bg-gray-600"
									onClick={() =>
										setIsProjectsDropdownOpen(!isProjectsDropdownOpen)
									}
									title="Saved Projects"
								>
									<Save size={18} />
								</button>

								{isProjectsDropdownOpen && (
									<div className="absolute top-full right-0 mt-1 w-64 bg-gray-700 rounded-lg shadow-lg z-10">
										<div className="p-2 border-b border-gray-600">
											<h3 className="text-sm font-medium">Saved Projects</h3>
										</div>

										{savedProjects.length > 0 ? (
											<div className="max-h-60 overflow-y-auto">
												{savedProjects.map((project) => (
													<div
														key={project.id}
														className="px-3 py-2 flex items-center justify-between hover:bg-gray-600 cursor-pointer"
														onClick={() => loadProject(project)}
													>
														<div>
															<p className="text-sm font-medium">
																{project.name}
															</p>
															<p className="text-xs text-gray-400">
																{project.language}
															</p>
														</div>
														<button
															className="text-red-400 hover:text-red-300"
															onClick={(e) => deleteProject(project.id, e)}
															title="Delete Project"
														>
															<Trash size={14} />
														</button>
													</div>
												))}
											</div>
										) : (
											<div className="p-3 text-center text-sm text-gray-400">
												No saved projects
											</div>
										)}
									</div>
								)}
							</div>

							{/* Save button */}
							<button
								className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 flex items-center"
								onClick={saveProject}
								disabled={isSaving}
								title="Save Project"
							>
								{isSaving ? "Saving..." : <Save size={18} />}
							</button>

							{/* Run button */}
							<button
								className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 flex items-center"
								onClick={runCode}
								disabled={isRunning}
							>
								<Play size={18} className="mr-1" />
								{isRunning ? "Running..." : "Run"}
							</button>
						</div>
					</div>

					{/* Editor and Output */}
					<div className="flex-1 flex flex-col">
						{/* Code Editor */}
						<div className="flex-1 bg-gray-900">
							<textarea
								className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								spellCheck={false}
							></textarea>
						</div>

						{/* Output Console */}
						<div className="h-40 bg-gray-800 text-green-300 p-4 font-mono text-sm overflow-auto">
							<div className="flex justify-between items-center mb-2 text-gray-400 text-xs">
								<span>Console Output</span>
								<button
									className="hover:text-white"
									onClick={() => setOutput("")}
								>
									Clear
								</button>
							</div>
							<pre className="whitespace-pre-wrap">
								{output || "// Run your code to see output here"}
							</pre>
						</div>
					</div>

					{/* Bottom Navigation */}
					<BottomNavigation activeTab="practice" />
				</div>
			</div>
		</ProtectedRoute>
	);
}
