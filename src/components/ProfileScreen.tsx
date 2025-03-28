import React from 'react';
import { Home, Book, Code, User, Settings, LogOut, Award, Calendar, Clock, Target, Zap, Gift } from 'lucide-react';

const ProfileScreen = () => {
  const userData = {
    name: "Alex Johnson",
    username: "alexcode",
    level: "Beginner",
    experiencePoints: 1250,
    totalCourses: 3,
    completedCourses: 1,
    totalChallenges: 42,
    completedChallenges: 18,
    streakDays: 7,
    studyHours: 24,
    joinDate: "November 2023",
    badges: [
      { id: 1, name: "First Course", icon: <Book size={18} />, color: "bg-blue-500" },
      { id: 2, name: "Code Newbie", icon: <Code size={18} />, color: "bg-purple-500" },
      { id: 3, name: "7-Day Streak", icon: <Zap size={18} />, color: "bg-yellow-500" }
    ],
    achievements: [
      { id: 1, name: "JavaScript Basics", progress: 100, icon: <Award size={18} /> },
      { id: 2, name: "React Apprentice", progress: 45, icon: <Award size={18} /> },
      { id: 3, name: "Problem Solver", progress: 62, icon: <Award size={18} /> }
    ]
  };

  // Calculate next level
  const levelProgress = 80; // Percentage to next level

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden h-[600px]">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-indigo-700 font-bold text-xl">
              {userData.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold">{userData.name}</h1>
              <p className="text-indigo-200">@{userData.username}</p>
              <div className="flex items-center mt-1">
                <span className="bg-white bg-opacity-20 text-xs rounded-full px-2 py-0.5">
                  {userData.level}
                </span>
                <span className="text-xs ml-2">{userData.experiencePoints} XP</span>
              </div>
            </div>
          </div>
          
          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Level Progress</span>
              <span>{levelProgress}%</span>
            </div>
            <div className="h-2 bg-white bg-opacity-20 rounded-full">
              <div 
                className="h-2 bg-white rounded-full" 
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="overflow-y-auto h-[calc(600px-160px)]">
          {/* Stats Section */}
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-600 mb-3">Stats Overview</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2">
                    <Book size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Courses</p>
                    <p className="font-medium">{userData.completedCourses}/{userData.totalCourses}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                    <Code size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Challenges</p>
                    <p className="font-medium">{userData.completedChallenges}/{userData.totalChallenges}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">
                    <Zap size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Current Streak</p>
                    <p className="font-medium">{userData.streakDays} days</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Study Time</p>
                    <p className="font-medium">{userData.studyHours} hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-3 text-xs text-gray-500">
              <Calendar size={14} className="mr-1" />
              <span>Member since {userData.joinDate}</span>
            </div>
          </div>
          
          {/* Badges Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold text-gray-600">My Badges</h2>
              <button className="text-indigo-600 text-xs">View All</button>
            </div>
            <div className="flex space-x-4">
              {userData.badges.map(badge => (
                <div key={badge.id} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full ${badge.color} flex items-center justify-center text-white mb-1`}>
                    {badge.icon}
                  </div>
                  <span className="text-xs text-gray-600 text-center">{badge.name}</span>
                </div>
              ))}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mb-1">
                  <Gift size={18} />
                </div>
                <span className="text-xs text-gray-400 text-center">Next Badge</span>
              </div>
            </div>
          </div>
          
          {/* Achievements Section */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold text-gray-600">Achievements</h2>
              <button className="text-indigo-600 text-xs">View All</button>
            </div>
            <div className="space-y-3">
              {userData.achievements.map(achievement => (
                <div key={achievement.id} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full ${achievement.progress === 100 ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-200 text-gray-500'} flex items-center justify-center mr-2`}>
                        {achievement.icon}
                      </div>
                      <span className="font-medium text-sm">{achievement.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{achievement.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div 
                      className={`h-1.5 rounded-full ${achievement.progress === 100 ? 'bg-yellow-500' : 'bg-indigo-600'}`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-gray-200 px-4 py-3 absolute bottom-0 w-full">
          <div className="flex justify-around">
            <button className="flex flex-col items-center text-gray-500">
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center text-gray-500">
              <Book size={20} />
              <span className="text-xs mt-1">Courses</span>
            </button>
            <button className="flex flex-col items-center text-gray-500">
              <Code size={20} />
              <span className="text-xs mt-1">Practice</span>
            </button>
            <button className="flex flex-col items-center text-indigo-600">
              <User size={20} />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ProfileScreen;