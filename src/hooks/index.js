// Updated hooks/index.js to work with new API structure

import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../providers";
import { PostsContext } from "../providers";

import {
  editProfile,
  fetchUserFriends,
  register,
  login as userLogin,
  getPosts,
  fetchCurrentUserProfile, // New function for getting current user
} from "../api";

import {
  setItemInLocalStorage,
  removeItemFromLocalStorage,
  LOCALSTORAGE_TOEKN_KEY,
  getItemFromLocalStorage,
} from "../utils";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const usertoken = getItemFromLocalStorage(LOCALSTORAGE_TOEKN_KEY);

      if (usertoken) {
        try {
          // Decode token to get basic user info
          const tokenUser = jwtDecode(usertoken);

          // Fetch complete user profile from server using the new API
          const userResponse = await fetchCurrentUserProfile();

          let userData = tokenUser; // fallback to token data
          if (userResponse.success) {
            userData = userResponse.data.user || userResponse.data;
          }

          // Fetch user friends (if friendship feature exists)
          const friendsResponse = await fetchUserFriends();
          let friends = [];

          if (friendsResponse.success) {
            friends = friendsResponse.data.friends || [];
          }

          setUser({
            ...userData,
            friends,
          });
        } catch (error) {
          console.error("Error loading user:", error);
          // Invalid token, remove it
          removeItemFromLocalStorage(LOCALSTORAGE_TOEKN_KEY);
          setUser(null);
        }
      }

      setLoading(false);
    };

    getUser();
  }, []);

  // Updated updateUser function to work with new API
  const updateUser = async (name, email, password) => {
    try {
      const response = await editProfile(name, email, password);
      console.log("edit-profile", response);

      if (response.success) {
        const updatedUser = response.data.user || response.data;
        setUser((prevUser) => ({
          ...prevUser,
          ...updatedUser,
        }));

        // Update token if provided
        if (response.data.token) {
          setItemInLocalStorage(LOCALSTORAGE_TOEKN_KEY, response.data.token);
        }

        return { success: true };
      } else {
        return {
          success: false,
          message: response.message,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to update profile",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await userLogin(email, password);

      if (response.success) {
        const userData = response.data.user || response.data;
        const token = response.data.accessToken;

        setUser(userData);

        if (token) {
          setItemInLocalStorage(LOCALSTORAGE_TOEKN_KEY, token);
        }

        return { success: true };
      } else {
        return {
          success: false,
          message: response.message,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    try {
      const response = await register(name, email, password, confirmPassword);

      if (response.success) {
        return { success: true };
      } else {
        return {
          success: false,
          message: response.message,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "Signup failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOEKN_KEY);
  };

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }

    const newFriends = user.friends.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );
    setUser({
      ...user,
      friends: newFriends,
    });
  };

  return {
    user,
    login,
    logout,
    loading, // Fixed typo from 'laoding'
    signup,
    updateUser,
    updateUserFriends,
  };
};

// Posts hooks
export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get auth context to check if user is authenticated
  const auth = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      // Only fetch posts if user is authenticated
      if (!auth.user) {
        setLoading(false);
        setPosts([]);
        return;
      }

      try {
        const response = await getPosts();
        console.log("postsProvider", response);

        if (response.success) {
          const postsData = response.data.posts || response.data;
          setPosts(Array.isArray(postsData) ? postsData : []);
        } else {
          console.error("Failed to fetch posts:", response.message);
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [auth.user]); // Re-run when authentication status changes

  const addPostToState = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  const addComment = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), comment],
        };
      }
      return post;
    });
    setPosts(newPosts);
  };

  // New function to update a post
  const updatePostInState = (postId, updatedData) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, ...updatedData };
      }
      return post;
    });
    setPosts(newPosts);
  };

  // New function to remove a post
  const removePostFromState = (postId) => {
    const newPosts = posts.filter((post) => post._id !== postId);
    setPosts(newPosts);
  };

  return {
    posts: posts, // Renamed data to posts for clarity
    loading,
    addPostToState,
    addComment,
    updatePostInState,
    removePostFromState,
    setPostsState: setPosts, // Expose setPosts for rollback
  };
};
