import React from 'react';
import { ArrowLeft, PlayCircle, Check, ChevronRight, Clock, File, Award, Star, Download } from 'lucide-react';

const CourseDetailScreen = () => {
  const courseData = {
    title: "JavaScript Fundamentals",
    level: "Beginner",
    rating: 4.8,
    reviewCount: 128,
    instructor: "Sarah Chen",
    totalTime: "6 hours 30 minutes",
    lessonsCount: 12,
    completedLessons: 5,
    description: "Learn the core concepts of JavaScript programming from the ground up. Perfect for beginners who want to start their coding journey.",
    image: "/api/placeholder/400/200",
    lessons: [
      {
        id: 1,
        title: "Introduction to JavaScript",
        duration: "12 min",
        isCompleted: true,
      },
      {
        id: 2,
        title: "Variables and Data Types",
        duration: "18 min",
        isCompleted: true,
      },
      {
        id: 3,
        title: "Operators and Expressions",
        duration: "15 min",
        isCompleted: true,
      },
      {
        id: 4,
        title: "Control Flow: Conditionals",
        duration: "20 min",
        isCompleted: true,
      },
      {
        id: 5,
        title: "Control Flow: Loops",
        duration: "22 min",
        isCompleted: true,
      },
      {
        id: 6,
        title: "Arrays and Array Methods",
        duration: "25 min",
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 7,
        title: "Functions and Scope",
        duration: "30 min",
        isCompleted: false,
      },
      {
        id: 8,
        title: "Objects and Properties",
        duration: "28 min",
        isCompleted: false,
      },
      {
        id: 9,
        title: "DOM Manipulation",
        duration: "35 min",
        isCompleted: false,
      },
      {
        id: 10,
        title: "Events and Event Handling",
        duration: "25 min",
        isCompleted: false,
      },
      {
        id: 11,
        title: "Asynchronous JavaScript",
        duration: "40 min",
        isCompleted: false,
      },
      {
        id: 12,
        title: "Final Project",
        duration: "45 min",
        isCompleted: false,
      },
    ]
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden h-[600px]">
        {/* Course Header */}
        <div className="relative">
          <img src={courseData.image} alt={courseData.title} className="w-full h-48 object-cover" />
          <div className="absolute top-0 left-0 w-full p-4">
            <button className="bg-black bg-opacity-30 text-white p-2 rounded-full">
              <ArrowLeft size={20} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center mb-1">
              <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full mr-2">{courseData.level}</span>
              <div className="flex items-center text-yellow-400">
                <Star size={14} className="fill-current" />
                <span className="text-white text-xs ml-1">{courseData.rating} ({courseData.reviewCount} reviews)</span>
              </div>
            </div>
            <h1 className="text-white text-xl font-bold">{courseData.title}</h1>
            <p className="text-white text-xs opacity-80">by {courseData.instructor}</p>
          </div>
        </div>
        
        {/* Course Progress */}
        <div className="p-4 bg-indigo-700 text-white">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-xs">{courseData.completedLessons}/{courseData.lessonsCount} lessons</span>
          </div>
          <div className="h-2 bg-white bg-opacity-20 rounded-full">
            <div 
              className="h-2 bg-white rounded-full" 
              style={{ width: `${(courseData.completedLessons / courseData.lessonsCount) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="flex-1 overflow-y-auto h-[calc(600px-48px-64px)]">
          {/* Course Info Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button className="flex-1 py-3 border-b-2 border-indigo-600 text-indigo-600 font-medium text-sm">
                Lessons
              </button>
              <button className="flex-1 py-3 text-gray-500 font-medium text-sm">
                About
              </button>
              <button className="flex-1 py-3 text-gray-500 font-medium text-sm">
                Reviews
              </button>
            </div>
          </div>
          
          {/* Course Description */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm text-gray-600">{courseData.description}</p>
            <div className="flex mt-3 text-sm text-gray-500">
              <div className="flex items-center mr-4">
                <Clock size={16} className="mr-1" />
                <span>{courseData.totalTime}</span>
              </div>
              <div className="flex items-center mr-4">
                <File size={16} className="mr-1" />
                <span>{courseData.lessonsCount} lessons</span>
              </div>
              <div className="flex items-center">
                <Award size={16} className="mr-1" />
                <span>Certificate</span>
              </div>
            </div>
          </div>
          
          {/* Lessons List */}
          <div className="divide-y divide-gray-100">
            {courseData.lessons.map(lesson => (
              <div 
                key={lesson.id} 
                className={`p-4 flex items-center ${lesson.isCurrent ? 'bg-indigo-50' : ''}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 
                    ${lesson.isCompleted 
                      ? 'bg-green-100 text-green-600' 
                      : lesson.isCurrent 
                        ? 'bg-indigo-100 text-indigo-600' 
                        : 'bg-gray-100 text-gray-400'}`}
                >
                  {lesson.isCompleted ? (
                    <Check size={16} />
                  ) : lesson.isCurrent ? (
                    <PlayCircle size={16} />
                  ) : (
                    <span className="text-sm">{lesson.id}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-medium ${lesson.isCurrent ? 'text-indigo-700' : 'text-gray-800'}`}>
                    {lesson.title}
                  </h3>
                  <span className="text-xs text-gray-500">{lesson.duration}</span>
                </div>
                {lesson.isCompleted ? (
                  <span className="text-green-600 text-xs">Completed</span>
                ) : lesson.isCurrent ? (
                  <button className="bg-indigo-600 text-white text-xs rounded-full px-3 py-1">
                    Continue
                  </button>
                ) : (
                  <button className="text-gray-400">
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Action */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <button className="bg-indigo-600 text-white w-full py-3 rounded-xl font-medium flex items-center justify-center">
            <Download size={18} className="mr-2" />
            Download for Offline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailScreen;