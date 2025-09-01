// Updated constants.js to match your local server API endpoints

// Make it configurable via environment variable for flexibility.
const RAW_API_ROOT =
  process.env.REACT_APP_API_ROOT || "http://localhost:5001/api";

// Ensure a single trailing slash so path joins below are consistent
const API_ROOT = RAW_API_ROOT.replace(/\/+$/, "") + "/";

// Updated API URLs to match your local server endpoints
export const API_URLS = {
  // Authentication API - Base Path: /api/auth
  login: () => `${API_ROOT}auth/login`,
  signup: () => `${API_ROOT}auth/register`,
  refresh: () => `${API_ROOT}auth/refresh`,

  // Users API - Base Path: /api/users
  userProfile: () => `${API_ROOT}users/me`, // GET current user's profile
  editUser: () => `${API_ROOT}users/me`, // PUT update current user's profile
  userInfo: (userId) => `${API_ROOT}users/${userId}`, // GET specific user info (if needed)

  // Posts API - Base Path: /api/posts
  posts: (page, limit) => `${API_ROOT}posts?page=${page}&limit=${limit}`, // GET feed of posts
  userPosts: (userId) => `${API_ROOT}posts/user/${userId}`, // GET posts by specific user
  createPost: () => `${API_ROOT}posts`, // POST create new post
  updatePost: (postId) => `${API_ROOT}posts/${postId}`, // PUT update post
  deletePost: (postId) => `${API_ROOT}posts/${postId}`, // DELETE post

  // Comments API - Base Path: /api/comments
  postComments: (postId) => `${API_ROOT}comments/${postId}`, // GET comments for a post
  comment: () => `${API_ROOT}comments`, // POST create comment
  deleteComment: (commentId) => `${API_ROOT}comments/${commentId}`, // DELETE comment

  // Likes API - Base Path: /api/likes
  likesCount: (postId) => `${API_ROOT}likes/${postId}/count`, // GET likes count
  likePost: () => `${API_ROOT}likes/like`, // POST like a post
  unlikePost: () => `${API_ROOT}likes/unlike`, // POST unlike a post

  // Legacy endpoints (keeping for backward compatibility if needed)
  searchUsers: (searchText) => `${API_ROOT}users/search?text=${searchText}`,
  
  // These might not be in your current API but keeping for reference
  friends: () => `${API_ROOT}friendship/fetch_user_friends`,
  createFriendship: (userId) => `${API_ROOT}friendship/create_friendship?user_id=${userId}`,
  removeFriend: (userId) => `${API_ROOT}friendship/remove_friendship?user_id=${userId}`,
};

// Token storage key
export const LOCALSTORAGE_TOEKN_KEY = "__codeial_token__";
