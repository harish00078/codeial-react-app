// here we importing the (hooks):
// with the help of these hook:we will able to fetch the data from the (api):
// and provide that data to the (home-component) elements:
import { useEffect, useState } from "react";

// here we import the (LINK) library:
import { Link } from "react-router-dom";

// here we import the (prop-types) package:
// IMP => with the help of this package.
// we basically tell the (react) that the (prop) which we are passing to this component.
// that should be in the form of (array):so that we did not get (error) in application:
// while we are fetching the (data) from the (prop):
// import PropTypes from "prop-types";

// here we are creating the home-component for our application:
// here we are importing the (css-module) which we have created particularly for this (component) of our application:
import styles from "../styles/home.module.css";

// 1 = import comment-component from the component's-folder:
// 2 =  we are also importing the (Loader) component:
// so that we can show the (loader) on browser.
// when our application fetching the (post-data) from the (server):
import { Comment, FriendsList, Loader } from "../components";

// =>  here we are importing the functions.through which we are connecting to the (server):
// and  getting the (data) for the (component):
import { getPosts } from "../api";
import { useAuth } from "../hooks";

// we are creating the home page or component through  (Function) component type:
// so for creating the (home) page we can use the (arrow) function:instead of using casual function:
// and we can also use the (Const) variable-type on that arrow function:

// IMP = we can aslo direclty use the (export) on the arrow function or function component:
// so that we did not have to write the export method differently:
// export const Home = () => {

// here in the (home) page will get our (posts) prop:
// which we have pass to our home-component:In the app-component:
// we gonna pass that (posts) prop to our home-component as a (argument):
// which will have all the data related to the (posts):

// V.IMP = after installing the prop-types package:related to the (props):
// and create its (object) which has some properties related to (props)for the home-component:
// then we need to pass our (props) to this component: as a (object):
// because we have pass our (prop) to the (Object) of (package) which we have created:
// and we are accessing our (prop) from that (Object).
// that' why we need to pass the (prop) as object to the (component):

export const Home = () => {
  // here we are using the (useState) hook to manage our (posts).which get from the (server):

  // IMP = the initail value of (useState) hook will be a empty array:

  // V.IMP = after getting the (posts) from the (setPosts) function to (posts) variable:
  // we need to gave that (posts) or (posts) variable to our (home-page):
  // because we have written the (posts-component) in our home-page:
  // V.IMP = we can do that with the help of (props) method:
  // so we are passing the (posts) variable.which have our (posts) data:
  // To our (home-page) with the help of (props) method:

  const [posts, setPosts] = useState([]);

  // here we are creating the another (State) loading:
  // through which we will show the (loading) spinner on our application-browser:
  // while we are fetching the (data) from the (server):

  // by default this loader will have the (true) value:
  // so that when ever our application get start or load:
  // it will start immediately.and continous running until we will get the (data) from the (server)
  const [loading, setLoading] = useState(true);

  // here we are calling the (useAuth) custom-hook:
  // through which we gonna be show the (Friendlist) component only if we have present any (user) in our (useAuth) custom-hook:
  const auth = useAuth();

  useEffect(() => {
    // V.IMP = so instead of using the (async) function direclty on the (useEffect) method:
    // we can created the another (arrow-function) and on that (function) we will use the (async) method:
    // and  In this function we will  (fetch) or get our  (data) from the (api) function:
    const fetchPosts = async () => {
      // here we will get the (data) from the (getPosts) function:
      // and we will save it in the (response) variable:
      // IMP = we are also using the (await) function on the (variable).
      // so that we will successfully (fetch) our data from the (api) function:
      const response = await getPosts();
      console.log("posts-response", response);

      // IMP => here we are giving our (posts) data to the (setPosts) function of the (useState) hook:
      // so that our (posts) data will get repersented on the browser:
      // IMP =>  through this (setPosts) function we will gave our data to the (posts) variable of (useState) hook:
      // and with the help of that (post) variable.
      /// we will gave our (posts) data to (post) component:

      // before giving the (post) data to the (setPosts) function:
      // we need to check that we have the (data) in our (response) or (data-variable);
      // so that we can avoid the (error) of the (undefined) data:
      // IMP => we can do that by simply checking the (message-key) in the (data):
      // if its (success).then it means we have the (data):
      if (response.success) {
        setPosts(response.data.posts);
      }

      // => and after we get the (data) from (server) successfully:
      // then we need to put the (loader) default value into (false):
      setLoading(false);
    };

    // now we just call the (fetchPosts) function:
    // so that we can access (data) of its outside the (function):In the (useEffect) method:
    fetchPosts();

    // we are also using the (square) brackets on the (useEffect) method:
    // so that can only run once:
  }, []);

  // here we are using the (Loader-component):
  // To show the Loading state on the browser:
  // util our application did not get the (posts-data) from the (server):
  // IMP = we do that with the help of our (laoding) state.which we are maintaining:
  // if our (loading) state is true:then we have to show the (Loader):
  // if its not.then it means that we have fetch the (post-data) from the (server):
  // then we have to set the (loading) state to (false):
  if (loading) {
    return <Loader />;
  }

  // under this arrow function.we will write the (html) for our (home-page):
  // and return it from this function.
  // so that we can export it from this file: and use it in our (application):

  // IMP => here we are converting our (posts) object into the (array):
  // because the (map) function only traverse on the (array):
  // const postsArray = Array.isArray(posts) ? posts : [];

  if (!Array.isArray(posts)) {
    console.log("posts: ", posts);

    console.error("Posts is not an array:", posts);
    return null; // or handle the error in another way
  }

  return (
    <div className={styles.home}>
      {/* // IMP => here we are using the (css-module):with the help of creating (javascript) object in the (html) elements: 
      // and under that object we will define the particular value of the (css-element):To the (className) property:
      // which we wanna gave that to the particular element of the (html): 
      // IMP => after creating the (object) we need to connect that (object) with the (className) method of the react: 
      // V.IMP => so that react knows we are giving the (style) to our (html) elements through this (javascirpt-object): */}
      <div className={styles.postsList}>
        {/* post-wrapper is basically repersents the particular (post) */}
        {/* after getting the (posts) prop.
       => In our home-component:we need to use that (posts) props:
       => or we can say have to destruct that (posts) props:
      => so that we can use the (data) of that (posts) props:
        => In the (posts-component):which we have created or written in our (home-component): */}
        {/* for using the (posts) prop or (data) in it:
       => we simple need to use the (map) function on the (posts) prop:
      => so that we can get the (data) of each-post one by one in our home-component: */}
        {/* under that map function we will paste our (past-component) code:
        => so that we can pass the data of (posts) to the post-component elements:
       => we will pass  the (post) as a argument to the (map) function which we are running on the (posts) prop:
        => so that at one time we will only get one (posts) from the (posts) prop.
        => and gave that (post) data to our (post-component):  */}
        {posts.map((post) => (
          // IMP = after putting our (post-component):
          //    under the map-function.which we are running on the (posts) prop:
          //    It will have the (data) related to our (posts) in the (object) form:
          //   V.IMP => so we need to gave the (keys) of that (object).
          //   which will have the (data) or (value) related to our post-component's (html-elements):
          //    so that we can show that (data) on our component's browser-page:

          // 1 =>  v.IMP = we also need to provide the (unique-key) or (identity) to the every-post:
          // otherwise we will get the (error) from the (react):Warning: Each child in a list should have a unique "key" prop.
          // because we are getting the every post from the (map) function:
          // so we need to separate them from each other by providing the unique key or identity:
          // IMP = we are going to gave them there (unique-ID).which we are getting with them from the server:
          // when we are fetching them from the server:which has been given them through the (server):

          // 2 => V.IMP => for the we need to use the (key) method:
          // and under that (key) method. we will basically define the (object):
          // which will have the (unique) identity for the every post:
          // those we are getting with the (posts) from the (server):

          // 3 => V.IMP => how we can do that:
          // 1 - we will use the (key) method:
          // 2 - and under that  (key) method.we will create the object:
          // 3 - under that object we gonna use the (string-interpolation) method:
          // 4 - To create a (key):and that will have a value of the (post) unique-key or identity:
          // here (post) is our key.and that key will have a value of post's (unique-identity):
          // 5 - IMP = for giving the value  of the (unique-identity) to the (post) key.
          //  we are going to use the ($) dollar-sign.and under that we gonna put the (post-id) which we are getting from the (server) with the (posts):
          // for giving that (id).we need to simply write the (post._id):the we are getting them from the (server):

          // 4 = V.IMp = Note: learn more about them from the (notes-page):
          // - The ($) character identifies a string-literal (" ") as an interpolated-string (` `).

          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/13135/13135440.png"
                  alt="user-pic"
                />
                <div>
                  {/* IMP => 1  = here we are showing the names of the (users):
                => so we want that whenever a particular user.clicks on the name of the other users:
                => then it will get directed to its (user-profile): */}
                  {/* IMP => 2 = so for doing that:
                => we need to convert this user-name into the (LINK):so that whenever any user click on the name of other-user:
                =>  then its will get redirected to the (user-profile) page of that (user):
                => and can see the other information related to that particular-user:
                */}
                  {/* V.IMP => 3 = for doing this we need to add the (LINK) tag on the (name-element):
                => and with in the (to) method of this (link) tag.we are going to add the (path) of the (user-profile) component:
                => IMP =  we will define the (path) with in the (currly-brackets):
                => because we need to use the (string-interpolation) method on the (path):
                => we did this because.with in the (path).we also need to add the (user-Id) of the (user) on which user's name we have clicked:
                => so that we can show the (user-profile) of the particular (user).To the another user: */}

                  {/* => first-way:To transfer-data from one-component to another-component:
                V.V.IMP => 1 = instead of simply converting the (name-element) into (link):acc to our (user-profile) component's (route-path):
                => V.IMP = we can also use this (link) for passing the (user-data) state to  (user-profile) component.or we can say to the (component) on which that (link) is connected to:
                => we are doing this (because).we only have the (access) of our (application-data) in this (Component):
                => so for having the (access) to application-data in the (another-component):
                => we need to pass that (application-data) from (component) to (another-component):
                => so for doing that we are getting the help from (Links) or (routes) of our application:*/}
                  {/* => how we can transfer the (application-data) with the help of  (links) or (routes) from one-component to another-component:
                => IMP =  we can do that by creating a  object with in the (to) method of (link)tag:instead of simply passing the component (route) to this (to) method of (link) tag:
                => IMP = with in the (object):
                => 1 = first we will add the (path) related to our component-route:by using the (pathname) Key in the object:
                => 2 = second we will create the (state) object.
                -> and with in that object:we are going to create the another (key) name as (user):
                -> and with in that (user) key.we are going to pass the (user-data):
                -> On which (user's-name).we have clicked on:*/}
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
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                    alt="likes-icon"
                  />
                  <span>5</span>
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
                <input placeholder="start typing a comment" />
              </div>
              {/* here we are showing the comments.
            => related to the (posts): */}
              {/* V.IMp = so for doing that we are importing our (comments) component:
            => which we have created in our components-folder:
            => through which we will show our comments here.under the every (post) */}
              <div className={styles.postCommentList}>
                {/* IMP = so before getting the comment-component:
              => we need to have the data related to the  comments: */}
                {/* IMP = we will have our comments-data.
              => under the (posts) prop.because every post have a comment in it:
              => so we will fetch our comments-data from the (posts) prop: */}
                {/* we will run the map-function on the (post.comment) object.
              => so that we can have every comment acc to our posts: */}
                {post.comments.map((comment) => (
                  // Under it we will use our comment (comment)component:
                  // which we have created in the (component) folder:
                  // V.IMp => we also need to pass the (Comments) data.To our (Comment) component.
                  // so that we can gave data to our comment-component (elements).
                  //  and show them on under the every post of our application.on the browser:
                  // IMP = we use (props)  method to pass the data of the every comment to our (Comment) component:

                  // V.IMP = we also need to provide the (unique) key or identity to the every comment:
                  // so that each comment can be separate from each other:
                  // we have to do this because we are fetching the comments with the help of map-function.
                  // so we need to provide them the unique identity:
                  // we can do that with the help of same method we use for our (posts) component:
                  // IMP = we need to use the (key) method:and under that key-method.
                  // we need to create the js-object.which will have the (string-interpolation) of (unique-key) for the every (comment):
                  // we will use the (unique) key of the (comment).which we are getting from the (server):when we are fetching them from the server:
                  // IMP = and this (unique-key) will also help us to (delete) the particular (Comment):
                  // because every comment has its own identity:
                  <Comment
                    comment={comment}
                    key={`post-comment-${comment._id}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* here we are showing the (FriendsList) component:
      => only if we have any (user) logged-in into our application: */}
      {auth.user && <FriendsList />}
    </div>
  );
};

// here we create (protypes) object of our (home-component):
// 1 => IMP = we can use the (Prop-types) package:
// BY define or giving some  properties to our function-component:
// related to the (prop) which we are passing to it:
// so that application did not get crash while we are fetching the (data) from the (prop):
// 1. to make sure that the data we are passing to our component is in the correct format.

// 2 = IMP => so how we gonna gave properties to our function-component.
// through the prop-types package:
// IMp => we will basically create the object of (properties):
// and gonna pass that object to our component with the help of (prop-types) package:
// =====> we use it when we get the post from the (app) component: as a (props):
// Home.proptype = {
// 3 = IMP => under this (object) we gonna pass the (props).
// which we wanna gave to this (component) as a (Key):
// currently we are only passing the (posts) prop to this (home-component):

// 4 = IMP => under this (posts) key we are going define the properties of the (prop-types) package:
// so that our application does not get crash while fetcing the data from the (prop):

// 5 = IMP => we are going to gave the prop-types properties to this (prop) posts-(key) as a (value);
// under this value we gonna pass the prop-type package.and the (key) or (function) and (object) of the package with dot (.):
//  which we gonna gave to this (prop) key:
// V.IMP = In simple words we are basically defining the type of this (posts) prop-key:
// with the help of (prop-types) package:

// 6 => we also need to define that if any-one using this home-component:
// then they need to pass this (posts) prop to the component:
// for doing that we gonna gave the (isrequired) property of the (prop-types) package:
// To this posts-prop key:
//   posts: PropTypes.array.isRequired,
// };

// here we are exporting the (home-page) component:
export default Home;
