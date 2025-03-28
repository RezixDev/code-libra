// src/types/community.ts

export interface Post {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;
    likesCount: number;
    commentsCount: number;
    isLiked: boolean;
    isBookmarked: boolean;
  }
  
  export interface Comment {
    id: string;
    postId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    createdAt: string;
    likesCount: number;
    isLiked: boolean;
  }
  
  export type SortOption = 'latest' | 'popular' | 'oldest' | 'mostCommented';
  export type FilterOption = 'all' | 'bookmarked' | 'myPosts' | 'myComments' | 'tag';
  
  export interface CommunityState {
    posts: Post[];
    comments: Record<string, Comment[]>;
    isLoading: boolean;
    error: string | null;
    currentFilter: FilterOption;
    currentSort: SortOption;
    selectedTag?: string;
  }
  
  export interface CommunityAction {
    type: 
      | 'FETCH_POSTS_REQUEST'
      | 'FETCH_POSTS_SUCCESS'
      | 'FETCH_POSTS_FAILURE'
      | 'FETCH_COMMENTS_REQUEST'
      | 'FETCH_COMMENTS_SUCCESS'
      | 'FETCH_COMMENTS_FAILURE'
      | 'ADD_POST'
      | 'UPDATE_POST'
      | 'DELETE_POST'
      | 'ADD_COMMENT'
      | 'UPDATE_COMMENT'
      | 'DELETE_COMMENT'
      | 'TOGGLE_LIKE_POST'
      | 'TOGGLE_BOOKMARK_POST'
      | 'TOGGLE_LIKE_COMMENT'
      | 'SET_FILTER'
      | 'SET_SORT';
    payload?: any;
  }
  
  export interface PostFormData {
    title: string;
    content: string;
    tags: string;
  }