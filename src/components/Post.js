import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { createComment, toggleLike, deletePost } from "../api"; // Import deletePost
import { usePosts, useAuth } from "../hooks"; // Import useAuth
import styles from "../styles/home.module.css";
import { Comment } from "./";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const auth = useAuth(); // Get auth context

  const handleAddComment = async (e) => {
    if (e.key === "Enter") {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);
      console.log("add comment response", response);

      if (response.success) {
        setComment("");
        posts.addComment(response.data.comment, post._id);
        toast.success("Comment created successfully!");
      } else {
        toast.error(response.message);
      }

      setCreatingComment(false);
    }
  };

  const hanldePostLikeClick = async () => {
    const response = await toggleLike(post._id, "Post");
    console.log("Liked post Response", response);
    if (response.success) {
      if (response.data.deleted) {
        toast.success("Like Removed Successfully");
      } else {
        toast.success("Like Added Successfully");
      }
    } else {
      toast.error(response.message);
    }
  };

  const handleDeletePost = async () => {
    const originalPosts = posts.posts; // Use posts.posts
    posts.removePostFromState(post._id);

    const response = await deletePost(post._id);

    if (response.success) {
      toast.success("Post deleted successfully!");
    } else {
      // If the API call fails, restore the original posts array
      posts.setPostsState(originalPosts);
      toast.error(response.message);
    }
  };

  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/13135/13135440.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={hanldePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
            disabled={creatingComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
      {/* Show delete button only if the logged-in user is the post author */}
      {auth.user && auth.user._id === post.user._id && (
        <button className={styles.postDeleteBtn} onClick={handleDeletePost}>
          Delete Post
        </button>
      )}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
