// src/hooks/useCourseProgress.ts
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Types 
export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  currentLessonId?: string;
  lastAccessedAt: string;
  isCompleted: boolean;
}

export interface CourseProgressStats {
  totalCompleted: number;
  percentageCompleted: number;
  completedByCategory: Record<string, number>;
  streakDays: number;
  totalStudyTime: number; // in minutes
}

interface UseCourseProgressReturn {
  progress: Map<string, CourseProgress>;
  isLoading: boolean;
  completeLesson: (courseId: string, lessonId: string) => Promise<void>;
  resetProgress: (courseId: string) => Promise<void>;
  getCourseProgress: (courseId: string) => CourseProgress | undefined;
  getOverallProgress: () => CourseProgressStats;
}

// Custom hook for managing course progress
export function useCourseProgress(): UseCourseProgressReturn {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Map<string, CourseProgress>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage on component mount
  useEffect(() => {
    const loadProgress = () => {
      try {
        setIsLoading(true);
        
        if (!user) {
          setProgress(new Map());
          return;
        }
        
        const savedProgress = localStorage.getItem(`course-progress-${user.id}`);
        
        if (savedProgress) {
          const progressArray: CourseProgress[] = JSON.parse(savedProgress);
          const progressMap = new Map<string, CourseProgress>();
          
          progressArray.forEach(item => {
            progressMap.set(item.courseId, item);
          });
          
          setProgress(progressMap);
        }
      } catch (error) {
        console.error('Error loading course progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const saveProgress = () => {
      try {
        if (!user) return;
        
        const progressArray = Array.from(progress.values());
        localStorage.setItem(`course-progress-${user.id}`, JSON.stringify(progressArray));
      } catch (error) {
        console.error('Error saving course progress:', error);
      }
    };

    if (!isLoading) {
      saveProgress();
    }
  }, [progress, isLoading, user]);

  // Mark a lesson as completed
  const completeLesson = async (courseId: string, lessonId: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, make an API call to update progress
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get existing course progress or create new
      const courseProgress = progress.get(courseId) || {
        courseId,
        completedLessons: [],
        lastAccessedAt: new Date().toISOString(),
        isCompleted: false
      };
      
      // Add lesson to completed list if not already completed
      if (!courseProgress.completedLessons.includes(lessonId)) {
        courseProgress.completedLessons.push(lessonId);
      }
      
      // Update last accessed time
      courseProgress.lastAccessedAt = new Date().toISOString();
      
      // Update current lesson (in a real app, you would determine the next lesson)
      courseProgress.currentLessonId = lessonId;
      
      // Create new Map to trigger update
      const newProgress = new Map(progress);
      newProgress.set(courseId, courseProgress);
      
      // Update state
      setProgress(newProgress);
      
      // In a real app, update user's experience points as well
    } catch (error) {
      console.error('Error completing lesson:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset course progress
  const resetProgress = async (courseId: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, make an API call to reset progress
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new Map to trigger update
      const newProgress = new Map(progress);
      
      // Remove the course from progress
      newProgress.delete(courseId);
      
      // Update state
      setProgress(newProgress);
    } catch (error) {
      console.error('Error resetting course progress:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get progress for a specific course
  const getCourseProgress = (courseId: string) => {
    return progress.get(courseId);
  };

  // Calculate overall progress stats
  const getOverallProgress = (): CourseProgressStats => {
    // Default empty stats
    const defaultStats: CourseProgressStats = {
      totalCompleted: 0,
      percentageCompleted: 0,
      completedByCategory: {},
      streakDays: 0,
      totalStudyTime: 0
    };
    
    if (!user || progress.size === 0) {
      return defaultStats;
    }
    
    // Sample course category mapping - in a real app, this would come from your course data
    const courseCategoryMap: Record<string, string> = {
      'js-fundamentals': 'JavaScript',
      'react-hooks': 'React',
      'typescript-advanced': 'TypeScript'
    };
    
    try {
      // Calculate total completed lessons
      const totalCompletedLessons = Array.from(progress.values()).reduce(
        (sum, course) => sum + course.completedLessons.length, 
        0
      );
      
      // Assume 100 total lessons for demo purposes
      // In a real app, this would be the total number of lessons across all courses
      const totalLessons = 100;
      
      // Calculate completion by category
      const completedByCategory: Record<string, number> = {};
      
      for (const [courseId, courseProgress] of progress.entries()) {
        const category = courseCategoryMap[courseId] || 'Uncategorized';
        
        completedByCategory[category] = (completedByCategory[category] || 0) + 
          courseProgress.completedLessons.length;
      }
      
      // Calculate streak days (simplified for demo)
      // In a real app, this would be based on actual completion dates
      const streakDays = 7; 
      
      // Calculate total study time (simplified for demo)
      // In a real app, this would be based on actual time spent on lessons
      const totalStudyTime = totalCompletedLessons * 20; // Assume 20 minutes per lesson
      
      return {
        totalCompleted: totalCompletedLessons,
        percentageCompleted: Math.round((totalCompletedLessons / totalLessons) * 100),
        completedByCategory,
        streakDays,
        totalStudyTime
      };
    } catch (error) {
      console.error('Error calculating overall progress:', error);
      return defaultStats;
    }
  };

  return {
    progress,
    isLoading,
    completeLesson,
    resetProgress,
    getCourseProgress,
    getOverallProgress
  };
}