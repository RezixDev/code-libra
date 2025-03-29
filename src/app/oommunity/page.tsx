// src/app/community/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
	MessageSquare,
	ThumbsUp,
	MessageCircle,
	Share,
	Search,
	User,
	Plus,
	Bookmark,
} from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import SideMenu from "@/components/layout/SideMenu";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import PostDetail from "@/components/community/PostDetail";
import NewPostForm from "@/components/community/NewPostForm";
import { Post, Comment } from "@/types/community";

// Sample data
const SAMPLE_POSTS: Post[] = [
	{
		id: "post-1",
		userId: "user-001",
		userName: "Sarah Chen",
		userAvatar: "/assets/images/avatars/sarah.jpg",
		title: "How to use React useEffect hook properly?",
		content:
			"I'm struggling with the cleanup function in useEffect. My component is unmounting but I'm still seeing API calls. Can someone explain how to properly clean up effects?",
		tags: ["React", "JavaScript", "Hooks"],
		createdAt: "2023-08-15T14:23:00Z",
		likesCount: 24,
		commentsCount: 8,
		isLiked: true,
		isBookmarked: false,
	},
	{
		id: "post-2",
		userId: "user-002",
		userName: "Michael Rodriguez",
		userAvatar: "/assets/images/avatars/michael.jpg",
		title: "Best resources to learn TypeScript in 2023",
		content:
			"I'm looking to learn TypeScript this year and wondering what resources others have found helpful. Books, courses, videos - any recommendations appreciated!",
		tags: ["TypeScript", "Learning", "Resources"],
		createdAt: "2023-08-14T09:15:00Z",
		likesCount: 32,
		commentsCount: 15,
		isLiked: false,
		isBookmarked: true,
	},
	{
		id: "post-3",
		userId: "user-003",
		userName: "Alex Johnson",
		userAvatar: "/assets/images/avatars/alex.jpg",
		title: "Solved: That tricky array sorting problem from LeetCode",
		content:
			"I just spent 3 hours figuring out the optimal solution to the 'Merge K Sorted Arrays' problem. Here's my approach and why I think it's O(n log k) time complexity...",
		tags: ["Algorithms", "LeetCode", "JavaScript", "Problem Solving"],
		createdAt: "2023-08-13T18:45:00Z",
		likesCount: 56,
		commentsCount: 12,
		isLiked: false,
		isBookmarked: false,
	},
	{
		id: "post-4",
		userId: "user-004",
		userName: "Priya Patel",
		userAvatar: "/assets/images/avatars/priya.jpg",
		title: "How do you handle state management in large React applications?",
		content:
			"As my application grows, I find it harder to manage state effectively. I've tried Redux and Context API but I'm curious what approaches others are using in production...",
		tags: ["React", "State Management", "Redux", "Context API"],
		createdAt: "2023-08-12T11:30:00Z",
		likesCount: 43,
		commentsCount: 27,
		isLiked: false,
		isBookmarked: false,
	},
];

// Sample comments
const SAMPLE_COMMENTS: Record<string, Comment[]> = {
	"post-1": [
		{
			id: "comment-1",
			postId: "post-1",
			userId: "user-002",
			userName: "Michael Rodriguez",
			userAvatar: "/assets/images/avatars/michael.jpg",
			content:
				"Make sure you return a cleanup function from your useEffect. Something like: useEffect(() => { const subscription = someAPI.subscribe(); return () => { subscription.unsubscribe(); }; }, []);",
			createdAt: "2023-08-15T14:45:00Z",
			likesCount: 12,
			isLiked: true,
		},
		{
			id: "comment-2",
			postId: "post-1",
			userId: "user-003",
			userName: "Alex Johnson",
			userAvatar: "/assets/images/avatars/alex.jpg",
			content:
				"Also check if you're using the dependencies array correctly. Missing dependencies can cause stale closures.",
			createdAt: "2023-08-15T15:12:00Z",
			likesCount: 8,
			isLiked: false,
		},
	],
};

export default function CommunityPage() {
	const { user } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [activeTab, setActiveTab] = useState<
		"latest" | "popular" | "bookmarked"
	>("latest");
	const [selectedPost, setSelectedPost] = useState<string | null>(null);
	const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
	const [comments, setComments] =
		useState<Record<string, Comment[]>>(SAMPLE_COMMENTS);
	const [showNewPostForm, setShowNewPostForm] = useState(false);

	// Toggle side menu
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	// Filter posts based on search and active tab
	const filteredPosts = posts.filter((post) => {
		// Filter by search query
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			return (
				post.title.toLowerCase().includes(query) ||
				post.content.toLowerCase().includes(query) ||
				post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
				post.userName.toLowerCase().includes(query)
			);
		}

		// Filter by tab
		switch (activeTab) {
			case "popular":
				// Sort by likes count
				return true;
			case "bookmarked":
				return post.isBookmarked;
			case "latest":
			default:
				// Sort by date
				return true;
		}
	});

	// Format date for display
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();

		// Convert to seconds
		const diffSec = Math.floor(diffMs / 1000);
		if (diffSec < 60) {
			return `${diffSec} seconds ago`;
		}

		// Convert to minutes
		const diffMin = Math.floor(diffSec / 60);
		if (diffMin < 60) {
			return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
		}

		// Convert to hours
		const diffHours = Math.floor(diffMin / 60);
		if (diffHours < 24) {
			return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
		}

		// Convert to days
		const diffDays = Math.floor(diffHours / 24);
		if (diffDays < 30) {
			return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
		}

		// Convert to months
		const diffMonths = Math.floor(diffDays / 30);
		if (diffMonths < 12) {
			return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
		}

		// Convert to years
		const diffYears = Math.floor(diffMonths / 12);
		return `${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
	};

	// Toggle post like
	const togglePostLike = (postId: string) => {
		setPosts((prevPosts) =>
			prevPosts.map((post) => {
				if (post.id === postId) {
					const isLiked = !post.isLiked;
					return {
						...post,
						isLiked,
						likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1,
					};
				}
				return post;
			})
		);
	};

	// Toggle comment like
	const toggleCommentLike = (commentId: string, postId: string) => {
		setComments((prevComments) => {
			// Get comments for the post
			const postComments = [...(prevComments[postId] || [])];

			// Update the specific comment
			const updatedComments = postComments.map((comment) => {
				if (comment.id === commentId) {
					const isLiked = !comment.isLiked;
					return {
						...comment,
						isLiked,
						likesCount: isLiked
							? comment.likesCount + 1
							: comment.likesCount - 1,
					};
				}
				return comment;
			});

			// Return updated comments map
			return {
				...prevComments,
				[postId]: updatedComments,
			};
		});
	};

	// Toggle post bookmark
	const toggleBookmark = (postId: string) => {
		setPosts((prevPosts) =>
			prevPosts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						isBookmarked: !post.isBookmarked,
					};
				}
				return post;
			})
		);
	};

	// Submit a new comment
	const submitComment = (postId: string, content: string) => {
		if (!content.trim() || !user) return;

		// Simulate API delay
		setTimeout(() => {
			const newCommentObj: Comment = {
				id: `comment-${Date.now()}`,
				postId,
				userId: user.id,
				userName: user.name,
				userAvatar: user.avatar,
				content,
				createdAt: new Date().toISOString(),
				likesCount: 0,
				isLiked: false,
			};

			// Update comments
			setComments((prevComments) => ({
				...prevComments,
				[postId]: [...(prevComments[postId] || []), newCommentObj],
			}));

			// Update post comment count
			setPosts((prevPosts) =>
				prevPosts.map((post) => {
					if (post.id === postId) {
						return {
							...post,
							commentsCount: post.commentsCount + 1,
						};
					}
					return post;
				})
			);
		}, 1000);

		return true;
	};

	// Submit a new post
	const submitNewPost = (title: string, content: string, tags: string) => {
		if (!title.trim() || !content.trim() || !user) return false;

		// Simulate API delay
		setTimeout(() => {
			const newPostObj: Post = {
				id: `post-${Date.now()}`,
				userId: user.id,
				userName: user.name,
				userAvatar: user.avatar,
				title,
				content,
				tags: tags
					.split(",")
					.map((tag) => tag.trim())
					.filter(Boolean),
				createdAt: new Date().toISOString(),
				likesCount: 0,
				commentsCount: 0,
				isLiked: false,
				isBookmarked: false,
			};

			// Add new post to the beginning of the list
			setPosts((prevPosts) => [newPostObj, ...prevPosts]);

			// Hide the form
			setShowNewPostForm(false);
		}, 1000);

		return true;
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

					{/* Community Header */}
					<div className="bg-indigo-700 text-white p-4">
						<h1 className="text-xl font-bold mb-1">Community Forum</h1>
						<p className="text-sm text-indigo-100">
							Connect, share, and learn with fellow developers
						</p>
					</div>

					{/* Search Bar */}
					<div className="p-4 bg-white border-b">
						<div className="relative">
							<input
								type="text"
								placeholder="Search discussions..."
								className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<Search
								size={18}
								className="absolute left-3 top-2.5 text-gray-400"
							/>
						</div>
					</div>

					{/* Tabs */}
					<div className="bg-white border-b">
						<div className="flex">
							<button
								className={`flex-1 py-3 text-center text-sm font-medium ${
									activeTab === "latest"
										? "text-indigo-600 border-b-2 border-indigo-600"
										: "text-gray-500"
								}`}
								onClick={() => setActiveTab("latest")}
							>
								Latest
							</button>
							<button
								className={`flex-1 py-3 text-center text-sm font-medium ${
									activeTab === "popular"
										? "text-indigo-600 border-b-2 border-indigo-600"
										: "text-gray-500"
								}`}
								onClick={() => setActiveTab("popular")}
							>
								Popular
							</button>
							<button
								className={`flex-1 py-3 text-center text-sm font-medium ${
									activeTab === "bookmarked"
										? "text-indigo-600 border-b-2 border-indigo-600"
										: "text-gray-500"
								}`}
								onClick={() => setActiveTab("bookmarked")}
							>
								Bookmarked
							</button>
						</div>
					</div>

					{/* Content Area */}
					<div className="flex-1 overflow-y-auto">
						{selectedPost ? (
							// Post Detail View
							<PostDetail
								post={posts.find((p) => p.id === selectedPost)!}
								comments={comments[selectedPost] || []}
								onBack={() => setSelectedPost(null)}
								onToggleLike={togglePostLike}
								onToggleBookmark={toggleBookmark}
								onToggleCommentLike={toggleCommentLike}
								onSubmitComment={submitComment}
								formatDate={formatDate}
							/>
						) : showNewPostForm ? (
							// New Post Form
							<NewPostForm
								onCancel={() => setShowNewPostForm(false)}
								onSubmit={submitNewPost}
							/>
						) : (
							// Post List View
							<div>
								{filteredPosts.length > 0 ? (
									<div className="divide-y divide-gray-200">
										{filteredPosts.map((post) => (
											<div
												key={post.id}
												className="p-4 bg-white hover:bg-gray-50 cursor-pointer"
												onClick={() => setSelectedPost(post.id)}
											>
												<h3 className="font-bold mb-1">{post.title}</h3>

												<div className="flex items-center mb-2">
													<div className="w-5 h-5 bg-gray-300 rounded-full overflow-hidden mr-1">
														{post.userAvatar ? (
															<img
																src={post.userAvatar}
																alt={post.userName}
																className="w-full h-full object-cover"
															/>
														) : (
															<User size={14} className="w-full h-full p-1" />
														)}
													</div>
													<span className="text-xs text-gray-600 mr-2">
														{post.userName}
													</span>
													<span className="text-xs text-gray-500">
														{formatDate(post.createdAt)}
													</span>
												</div>

												<p className="text-sm text-gray-700 mb-2 line-clamp-2">
													{post.content}
												</p>

												<div className="flex flex-wrap gap-1 mb-2">
													{post.tags.slice(0, 3).map((tag, idx) => (
														<span
															key={idx}
															className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
														>
															{tag}
														</span>
													))}
													{post.tags.length > 3 && (
														<span className="text-xs text-gray-500">
															+{post.tags.length - 3}
														</span>
													)}
												</div>

												<div className="flex items-center text-sm text-gray-600">
													<button
														className={`flex items-center mr-4 ${
															post.isLiked ? "text-indigo-600" : ""
														}`}
														onClick={(e) => {
															e.stopPropagation();
															togglePostLike(post.id);
														}}
													>
														<ThumbsUp size={16} className="mr-1" />
														<span>{post.likesCount}</span>
													</button>
													<div className="flex items-center mr-4">
														<MessageCircle size={16} className="mr-1" />
														<span>{post.commentsCount}</span>
													</div>
													<button
														className={`flex items-center ${
															post.isBookmarked ? "text-indigo-600" : ""
														}`}
														onClick={(e) => {
															e.stopPropagation();
															toggleBookmark(post.id);
														}}
													>
														<Bookmark size={16} />
													</button>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="flex flex-col items-center justify-center py-8 bg-white">
										<MessageSquare size={40} className="text-gray-300 mb-2" />
										{activeTab === "bookmarked" ? (
											<>
												<p className="text-gray-600 mb-1">
													No bookmarked posts yet
												</p>
												<p className="text-sm text-gray-500">
													Bookmark interesting discussions to find them easily
													later
												</p>
											</>
										) : searchQuery ? (
											<>
												<p className="text-gray-600 mb-1">No posts found</p>
												<p className="text-sm text-gray-500">
													Try different search terms
												</p>
											</>
										) : (
											<>
												<p className="text-gray-600 mb-1">No posts yet</p>
												<p className="text-sm text-gray-500">
													Be the first to start a discussion
												</p>
											</>
										)}
									</div>
								)}
							</div>
						)}
					</div>

					{/* Floating Action Button */}
					{!selectedPost && !showNewPostForm && (
						<button
							className="fixed bottom-20 right-4 w-14 h-14 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white"
							onClick={() => setShowNewPostForm(true)}
						>
							<Plus size={24} />
						</button>
					)}

					{/* Bottom Navigation */}
					<BottomNavigation activeTab="home" />
				</div>
			</div>
		</ProtectedRoute>
	);
}
