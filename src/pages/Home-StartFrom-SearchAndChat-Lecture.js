// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Post,Comment, Loader, FriendsList, CreatePost } from "../components";
// import { getPosts } from "../api";
import styles from "../styles/home.module.css";
import { useAuth } from "../hooks";
import { usePosts } from "../hooks";

const Home = () => {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState([]);
  const auth = useAuth();
  // here we are using the (usePosts) custom-hook:
  // through which we are gonna be able to access or use the (posts-context) in our application components:
  const posts = usePosts();
  console.log('usePost-context',posts);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();

  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }

  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  // IMP = here we are using the (usePosts) custom-hook:for providing state-value to the  (loader) component:
  if(posts.loading){
    return <Loader/>
  }




  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {/* here we are calling the (createPost) component:In our (home) component */}
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`}/>
        ))} 
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

export default Home;
