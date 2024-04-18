// here we are creating the (create-post) component:through which users will able to create posts on the application:
import { useState } from "react";
import styles from "../styles/home.module.css";
// here we importing the (addPost) function:through which we are sending the (create-post) request to the (server) with  (post-content) of user's created-post:
import { addPost } from "../api";
import { useToasts } from "react-toast-notifications";
import { usePosts } from "../hooks";

const CreatePost = () => {
  // here we are managing the (text) state related to the particular (post):which we are basically getting from the (user):
  const [post, setPost] = useState("");
  // here we are managing the (state) of (add-Post) button:so that user will not able to click the add-post button randomly after clicking it once:
  const [addingPost, setAddingPost] = useState(false);

  // here we are using the (addToast) method of (useToast) function:through which we gonna be respersents the notification to the (user):when its create-post request get's satteled by the server:
  const { addToast } = useToasts();

  // IMP = here we are calling the (usePosts) custom-hook:
  const posts = usePosts();

  // here we have the function:through which we gonna be handle the click of add post button:
  // it is the event-handler function of (onClick) event:which we have gave to the add-post (button) it self:
  const handleAddPostClick = async () => {
    setAddingPost(true);
    const response = await addPost(post);
    if (response.success) {
      // if response was successfull:then we will first clear out the (post) content from the (textarea) tag:so that user will able to write the new-post content on the textarea-tag:
      setPost("");
      // IMP = here we are passing the  user's newly created posts which we have get from the (server):To the (addPostToState) function of our (usePosts) custom-hook:

      posts.addPostToState(response.data.posts);
      addToast("post created successfully", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      {/* here we use textarea keyword or tag:
            => through which user will able to write about its post: */}
      {/* textarea tag:will also have the (onChange) event-hanlder on it:
            => so that if user type anything on it:we will get that value from it:through the event-hanlder: 
            => we need to create to arrow-function with in it: so that we can handle the event through that function:
            => that function will have the event as (argument) with in it:and with in that event will have the value related to (textarea) tag:
            => we have to pass that value to the (setPost) state:
            => for getting that value from the event:we have to use the (target) method and (value) function of (event): */}
      {/* textarea tag will also get its default value from the (post) state: 
            => for providing default value to the (textarea) tag through the (post) state:we gonna be use the (value) Keyword in it:*/}
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => {
          setPost(e.target.value);
        }}
      />
      <div>
        {/* here we are giving the (onClick) event on this button-tag:
        => so that when user click on the button:will trigger the event-hanlder function:which we have pass to this event:
        => through that event-handler function:we are basically submitting the user's post:*/}
        {/* we also gonna pass the (disabled) keyword to it:
        => through which we gonna be (disable) the button:when user once clicked on it:so that it does not able to click it again:until it get's the conformation related to it first-click:
        => we will also gonna pass the state to it:through which we are basically handling state related to this (disabled) keyword: */}
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {/* we will also gonna show the text of button :
            => acc to the state  of disabled-keyword: */}
          {addingPost ? "Adding Post..." : "Add Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
