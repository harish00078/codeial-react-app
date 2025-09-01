// Updated API index.js to work with your local server endpoints

import { API_URLS, LOCALSTORAGE_TOEKN_KEY } from "../utils";

// Toggle between real API and local mocks via env flag
const USE_MOCKS = String(process.env.REACT_APP_USE_MOCKS || "").toLowerCase() === "true";
let mockApi;
if (USE_MOCKS) {
  mockApi = require("./mocks");
}

// Updated customFetch function with better error handling and JSON support
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOEKN_KEY);

  // Set headers for JSON requests (your local server likely expects JSON)
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  // Add authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  // Handle request body
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    console.log("server-response", response);

    // Handle different response status codes
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        message: errorData.message || `HTTP Error: ${response.status}`,
        success: false,
      };
    }

    const data = await response.json();
    console.log("server-data", data);

    // Assume success if we get here and have data
    return {
      data: data.data || data, // Handle both {data: ...} and direct data responses
      success: true,
    };

  } catch (error) {
    console.log("server-error", error);
    return {
      message: error.message,
      success: false,
    };
  }
};

// Authentication APIs
export const login = (email, password) => {
  if (USE_MOCKS) return mockApi.login(email, password);
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};

export const register = async (name, email, password, confirmPassword) => {
  if (USE_MOCKS) return mockApi.register(name, email, password, confirmPassword);
  return customFetch(API_URLS.signup(), {
    method: "POST",
    body: { name, email, password, confirmPassword },
  });
};

export const refreshToken = () => {
  if (USE_MOCKS) return Promise.resolve({ success: true, data: { token: "mock_token" } });
  return customFetch(API_URLS.refresh(), {
    method: "POST",
  });
};

// Users APIs
export const fetchCurrentUserProfile = () => {
  if (USE_MOCKS) return mockApi.fetchUserProfile("current");
  return customFetch(API_URLS.userProfile(), {
    method: "GET",
  });
};

export const editProfile = async (name, email, password) => {
  if (USE_MOCKS) return mockApi.editProfile("current", name, password, password);
  return customFetch(API_URLS.editUser(), {
    method: "PUT",
    body: { name, email, password },
  });
};

export const fetchUserProfile = (userId) => {
  if (USE_MOCKS) return mockApi.fetchUserProfile(userId);
  return customFetch(API_URLS.userInfo(userId), {
    method: "GET",
  });
};

// Posts APIs
export const getPosts = (page = 1, limit = 5) => {
  if (USE_MOCKS) return mockApi.getPosts(page, limit);
  return customFetch(API_URLS.posts(page, limit), {
    method: "GET",
  });
};

export const getUserPosts = (userId, page = 1, limit = 5) => {
  if (USE_MOCKS) return mockApi.getPosts(page, limit);
  return customFetch(`${API_URLS.userPosts(userId)}?page=${page}&limit=${limit}`, {
    method: "GET",
  });
};

export const addPost = (content) => {
  if (USE_MOCKS) return mockApi.addPost(content);
  return customFetch(API_URLS.createPost(), {
    method: "POST",
    body: { content },
  });
};

export const updatePost = (postId, content) => {
  if (USE_MOCKS) return Promise.resolve({ success: true, data: { post: { _id: postId, content } } });
  return customFetch(API_URLS.updatePost(postId), {
    method: "PUT",
    body: { content },
  });
};

export const deletePost = (postId) => {
  if (USE_MOCKS) return Promise.resolve({ success: true });
  return customFetch(API_URLS.deletePost(postId), {
    method: "DELETE",
  });
};

// Comments APIs
export const getPostComments = (postId) => {
  if (USE_MOCKS) return Promise.resolve({ success: true, data: { comments: [] } });
  return customFetch(API_URLS.postComments(postId), {
    method: "GET",
  });
};

export const createComment = async (content, postId) => {
  if (USE_MOCKS) return mockApi.createComment(content, postId);
  return customFetch(API_URLS.comment(), {
    method: "POST",
    body: { content, postId },
  });
};

export const deleteComment = (commentId) => {
  if (USE_MOCKS) return Promise.resolve({ success: true });
  return customFetch(API_URLS.deleteComment(commentId), {
    method: "DELETE",
  });
};

// Likes APIs
export const getLikesCount = (postId) => {
  if (USE_MOCKS) return Promise.resolve({ success: true, data: { count: 0 } });
  return customFetch(API_URLS.likesCount(postId), {
    method: "GET",
  });
};

export const likePost = (postId) => {
  if (USE_MOCKS) return mockApi.toggleLike(postId, "Post");
  return customFetch(API_URLS.likePost(), {
    method: "POST",
    body: { postId },
  });
};

export const unlikePost = (postId) => {
  if (USE_MOCKS) return mockApi.toggleLike(postId, "Post");
  return customFetch(API_URLS.unlikePost(), {
    method: "POST",
    body: { postId },
  });
};

// Legacy/Additional functions (keeping for backward compatibility)
export const toggleLike = (itemId, itemType) => {
  if (USE_MOCKS) return mockApi.toggleLike(itemId, itemType);
  // This might need adjustment based on your server implementation
  if (itemType === "Post") {
    return likePost(itemId);
  }
  return Promise.resolve({ success: false, message: "Unsupported item type" });
};

export const searchUsers = (searchText) => {
  if (USE_MOCKS) return mockApi.searchUsers(searchText);
  return customFetch(API_URLS.searchUsers(searchText), {
    method: "GET",
  });
};

// Friend-related functions (keeping if you have friendship functionality)
export const fetchUserFriends = () => {
  if (USE_MOCKS) return mockApi.fetchUserFriends();
  return customFetch(API_URLS.friends(), {
    method: "GET",
  });
};

export const addFriend = (userId) => {
  if (USE_MOCKS) return mockApi.addFriend(userId);
  return customFetch(API_URLS.createFriendship(userId), {
    method: "POST",
  });
};

export const removeFriend = (userId) => {
  if (USE_MOCKS) return mockApi.removeFriend(userId);
  return customFetch(API_URLS.removeFriend(userId), {
    method: "POST",
  });
};