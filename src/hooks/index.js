// here we will creating the  custom-hooks.which we are using in the (context-api's) of our application:

import { useContext, useEffect, useState } from "react";

// => 1 = AuthProvider custom-hooks:
// here we are importing the (library):
// through which we will basically (decode) the (user-token):|
// and get the (user) data from it:
import { jwtDecode } from "jwt-decode";
// import jwt_decode from "jwt-decode";

// here we are importing the (AuthContext):so that we can have the access of this (AuthContext) or (AuthState) of the (user):
// In every component of our application:with the help of (useAuth) custom-hook function:
import { AuthContext } from "../providers";
// here we are importing the (PostsContext):
import { PostsContext } from "../providers";

// => 1 = here we are importing the (login) function from the (api) folder:
// which is basically connected to the (server) and get the (user-auth) from the (server):
// after (server) authenticate the (user-credentials):which has been send to the (Server) in the (request):
// through this (login) function:
// IMp = we have to change the name of this (login) function:
// which we are importing from the (api) folder:
// because we have written the same name for the other (login) or (login) handing function:
// we can change its with the help of (as) keyword:
// by using it we can change the name of (login) fucntion:
// when we are importing it from the (api) folder:
// => 2 = here we are importing the (register) function:from the (api-folder):
// => 3 = here we are importing the (editProfile):through which we gonna update the data of the (user-profile) on the (server):
import {
  editProfile,
  fetchUserFriends,
  register,
  login as userLogin,
  getPosts,
} from "../api";

// 1 = here we import the (setItemInLocalStorage) function:
// through which we will bascially ADD the (token-value) of the (user-auth) in our (localStorage):
// 2 = we also have import the (unique-key) from the (same) folder:
// through which we will basically add the (token-value) in the lacalstorage:
// 3 = we will also import the (removeItemFromLocalStorage) function:
// through which we will basically (remove) the (token-value) form the (localStorage):
import {
  setItemInLocalStorage,
  removeItemFromLocalStorage,
  LOCALSTORAGE_TOEKN_KEY,
  getItemFromLocalStorage,
} from "../utils";

// 2 => here we create the second custom-hook named as (useAuth):with the help of this custom-hook:
// IMP = we will be able to (access) the (Auth-state) of the (user) in  our application-components:
// 1 = basically means that the (AuthProvider) function will (provide) the (auth-state) of the (user) to the every component of our application:
// 2 = And with the help of (useAuth) custom-hook: we will be able to (access) that (Auth-state) of the (user) in our application components:

export const useAuth = () => {
  // V.IMP= 3  => so for giving the acccess of the (user-auth) state.
  //  with the help of this custom-hook function.In each and every component of our application:
  //  V.IMP=4  => we need to (return) the (auth-state) or (auth-context) of the (user) from this custom-hook function:
  //so that whenever we want to access the (auth-state) of the (user).
  // In our application components.we can have that with the help of this (useAuth) custom-hook:

  // V.IMP = 5=> the (Auth-state) of the (user).will be present in the(Auth-context).which we have created:
  // so we have to (return) that (Auth-context):form this custom-hook fucntion:
  // so that we can have the (access) of that (Auth-context or state) of the (user) in our each and every component of application:
  // V.IMP = 6 => so for doing that first we need to have that (Auth-context) of the (user) in this (custom-hook) function:
  // we can have that (Auth-context)  in this custom-hook:
  // with the help of (inbuild) hook named as (useContext):
  // and after that from this (custom-hook) function.we will have that (Auth-context).
  // In every component of our application:
  // V.IMP = 7 => the main reason of doing this or creating this (custom-hook) function:
  // so that we did not have to import the (useContext) hook again and again.
  // were we want to have the access of user (Auth-state or Context):
  // we can simple get that state with the help of this (custom-hook) funciton:

  return useContext(AuthContext);
};

// 1 => here we create the first custom-hook named as (useProvideAuth):
// through which we are handling the authentication in our application:
// IMP => we will create the custom-hooks:with the help of functions:
// here we are using the (arrow-function):
export const useProvideAuth = () => {
  // 1 => under this custom-hook or function.we  basically have or handle the (user-auth) state:
  // that (state) basically handle or manage by the inbuild  (useState) hook:
  // by default it has a value of (null):because by default our user have a (null) auth:
  const [user, setUser] = useState(null);
  // 2 => this function also have a (loading) functionality in it:
  // for that we are creating the another state (loading);with the help of (useState) hook:
  // which is initially or bydefault set to be true:
  const [laoding, setLoading] = useState(true);

  // V.IMP = here under this (useProvideAuth) function:
  // we are basically handling the user-token (decode).
  // so that whenever our (application) get reload:
  // IMP = we are able to provide that (user-data) again to our application:
  // IMP = so we will do that with the help of (useEffect) hook.
  // And the (library) which we use to (decode) the (user-token):
  useEffect(() => {
    const getUser = async () => {
      // under this (useEffect) hook:
      // => first we  have to get the (user-token).from the (localstorage) of the (user-browser):
      // because we have store its (token).In the (localstorage) of its (browser):
      // so for getting the token from Its (localStorage).we need to use the (fucntion):
      // which we have specificaly created to get the (user-token) from user (browser's-localstorage):
      // IMP => we also have to store that (token) in the (variable):
      // so that we can decode that token:
      const usertoken = getItemFromLocalStorage(LOCALSTORAGE_TOEKN_KEY);

      // after getting the (token) from the (user-browser's) localstorage:
      // IMP => 1 =  first we have to check that.If we get any token from the (localstorage):
      if (usertoken) {
        // 2 = then we have get the (user-data) from that (token).by decoding it:
        // for (decoding) the (token).we have to use the (decoding-library):
        // which is named as (jwt-decode):here In this file we named it (jwt):
        // we have to pass the (user-token) to this (library):so that it get (decode):
        // IMP = we did not have to do anything to get the (user-data) from (token) with the help of (library):
        // because this (library) will automatically get the (user-data) from the (token):cause its (build) to that work:

        const user = jwtDecode(usertoken);

        // const user = jwt_decode(usertoken);
        // V.V.IMP = when ever our application get referesh here we will call the (function) through which we gonna be get the (friendship) section  from the server:
        const response = await fetchUserFriends();
        console.log("user-friends-data", response);
        // here we have create the empty (friends-array):if we did not get the friends-data from the (server) related to the currrent-user:
        // IMP = then we gonna be directly pass this empty-array to the (user) state with the user-data:
        let friends = [];

        // if we successfully get the (freinds) data related to the (current-user) from the server:

        if (response.success) {
          // then we gonna be pass that friends-data:To the friends-array:which we have created:
          friends = response.data.friends;
        }

        // IMP = when we check the (Condition) related to the (friends-data):that we have the (friends-data) related to current-user or not:
        // then we have to gave that data to the (user) state:
        setUser({
          // first we gave the user-data:which we have (fetch) from the (token):
          // we will use the spread-operator on that  user-data.so that we can get everything from that token's user-data:
          ...user,
          // and next we will proivde the (friends-data) related to the current-user.
          // we will provide the friends-array:which we have created.and with in which will have the friends-data and its just a empty-array:if we did not get any reponse from the server:related to the current-user's friends-data:
          friends,
        });

        // 3 = after getting the (user) data from the (token):
        // we have to gave that (user-data) to the (user) state-hook in the (useProvideAuth) function:
        // so that every where in our app we can access that (user-data):
        // and show that user-data on our application:
        // setUser(user);
      }

      // 4 = after giving the (user-data):To the (user) state-hook:
      // we have to gave the (false) value to the (setLoading) state-hook:
      // so that the (loading) state.get removed from our application's web-page:
      setLoading(false);
    };
    // call the getUser function of useEffect-hook:
    getUser();
  }, []);

  // here we are creating the function:
  // through which we gonna update the (user-profile) data which has been given by the (user) it self on the server:
  // we also need to pass the (arguments) to this function.
  // which basically gonna be  the (fields) of (user-profile).whom's data we want to update on the (server):
  const updateUser = async (userId, name, password, confirmPassword) => {
    // IMP = under this function.we will call the another function:the (edit-profile):
    // through which which we are connected to the server:and passing the new (user-profile) data to the (server):so that (server) can update the user-data related to the  (user-profile) on its database:
    // IMP = we also need to save the response of this another-function:so that's why we are calling this function under the variable which is named as (response):
    // and we also need to call this function with the help of (await) method:so that our application did not get crash while calling this (updateUser) function:
    const response = await editProfile(userId, name, password, confirmPassword);
    console.log("edit-profile", response);
    // after that when we get the (response) from the (server):related to this (request):
    // => if  the response was (success):
    if (response.success) {
      // then first we need to (set) the new-data of the (user) to the (context):
      // because we have change the (name) of the (user) in its (user-profile):and we wanna show that (new-name) of the (user) on our application:
      // for doing that we simply need to (provide) the (new-data) of the (user) to the (setUser) state:
      setUser(response.data.user);
      // IMP = after providing the (new) data of the (user):To our (setUser) state:
      // we need to get the new (token) of the (user) related to its (new-profile) data from the (response) which we get from the server:
      // and we need to store that (new-token) in the (local-storage) of our (user-machine):
      // so that when (user) refresh its application we will get its new(user-data) from that (token) and provide that (new-data) to our (application):
      setItemInLocalStorage(
        LOCALSTORAGE_TOEKN_KEY,
        response.data.token ? response.data.token : null
      );

      // IMP = and we also need to return the (success) message:To tell the (user) that its (request) submitted successfully:and we also need to complete this function:
      // so that (user) new-profile-data also get reflected on our application:
      return {
        success: true,
      };
      // same thing we need to do with the (error):
      // if we get the (error) from the (server) related to the (user) (request):
      // then we need to return the (error-messsage) to the (user).which we get from the (server):
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  // 3 => after that it aslo have a (login) function init:
  // through which we are handling the (login) functionlity in our application:
  // this funciton will have a (two) arguments in it:
  // first is (email) of (user):
  // second is (password) which provided by the (user):
  // IMP = we will add the (async-await) method on this function:
  // so that our (application) did not get (crash):through any of the (error):
  // when we try to login the (user) with the help of this function:

  const login = async (email, password) => {
    // => 1 = V.IMP = this (login) function is also connected with the another (login) function:
    // which we have written in our (api) folder's (main-file):
    // that is the (function) which is connected to the (server) and get the (user-auth) from the (server):
    // => 2 = V.IMp = so for getting (user-auth) from the (server):
    // we need to call that (login-function) which is connected to the (server).under this function:
    // and to that function we have pass the (user-credentials):
    // so that it can pass those (user-credentials) to the (server).
    // and get the (user-auth) from the (server) for us:

    //  => 3 =  V.IMP = when we get the (user-auth) result from the (login-function):
    // which is connected to the (server):
    // we have to save that (result) in this (login) fucntion:were  are handling the (login) functionality for our (application):
    /// so that we can  authenticate the (user) to  our application:
    // when its (login-credentials) successfully get (authenticated) by the (server):

    // => 4 = we are saving the (server) response related to the (user-auth):
    // In the (response) variable:

    const response = await userLogin(email, password);

    // => 5 = after that we have to check that:
    // (user) successfully get authenticated or not:
    // if the (server) response is (successfull) or (true):
    if (response.success) {
      // if user (successfully) get authenticated:
      // then we will gave the (user) data which we are getting from the (server):
      // To our (user) state:which we have created:
      // so we can access that (state) in our application components:
      // with the help of (useAuth) custom-hooK:
      // here we will only gave the (user) data to the (user) state:
      // IMP = under the (data) section of our (server's) response:we have the (user) data:
      setUser(response.data.user);

      // V.IMP = here we are adding the our (token) to the (localStorage):
      // which we are getting from the (server).On the behalf of user's (successfull) authentication (request's) response:
      // IMP = for doing that we have to use the (setItemInLocalStorage) helper-function which we have created:
      // through this function.we will add the (token) value in the (localstorage):
      // we have to  pass the two things to this function:for storing the token-value in the local storage:
      // => 1 = first the (unique-key):which we have created:
      // through which we will basically find-out the (token-value) in our application.When we need it:
      // => 2 = second the (token-value):It self which we are getting from the (server):
      // after the user successfully get authenticated:
      // IMP = we also add the condition on this fucntion:that if (token) is avaiable:
      // then we add the (token-value) in localstorage:if its not then we will add its value to (null):
      setItemInLocalStorage(
        LOCALSTORAGE_TOEKN_KEY,
        response.data.token ? response.data.token : null
      );

      // then we need to return that (success) response:
      // from this (login) function:so that (useProvideAuth) function:
      // can have the (access) of that (response):
      // and gave that to the every component of our applicaion:
      return {
        success: true,
      };
      // if the (server) response is (notsuccessfull) or (false):
    } else {
      // then we return.the whatever message.we get from the (server):
      // through (login) function:so that (useProvideAuth) function:
      // can have the (access) of that (response):
      // and gave that to the every component of our applicaion:
      return {
        return: false,
        message: response.message,
      };
    }
  };

  // IMP = its also have a (Signup) functionality:
  const signup = async (name, email, password, confirmPassword) => {
    // we have save the response.which we get from the (server):
    // related to the (request) which this (function) has send to the (server):
    // IMP = for giving this function's data to the (server):
    // we need to call the (api) function.To whom we want to provide this data:
    // that (api) fucntion.basically gave that to the (server) with the help of (customFetch) function:
    const response = await register(name, email, password, confirmPassword);

    // if (user) successfully get (registered) on the application:
    // then we will return the (success) key value to true:
    // TO tell the other function.where we use this fucntion:
    // that user has successfully get (registered) on the application:
    if (response.success) {
      return {
        success: true,
      };
      // if not get register.then we will return the (success) key value to (false):
      // and also return the (server-error) message:
      // with in the (message) key's value:
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  // 4 => it also have a (logout) functionality:
  // through which we are handling the (logout) functionlity in our application:
  const logout = () => {
    // for hanlding the (logout) functionality of our application:through the (logout) function:
    // we simply have to set the (user) state to (null):
    setUser(null);
    // => IMP = when (user):try to or (logout) from the (application):
    // then we also have to (remove) the (Token-value).
    // which is related to that particular (user).from the (localStorage):
    // IMP = for that we have to use the (removeItemFromLocalStorage) fucntion:which we have created:
    // TO (remove) the (token-value) of the (user) from the (localstorage):
    // IMP = we have to pass the (key) argument.Through which we will pass the (unique-key) to this (fucntion):
    // so that with the help of that (key).we will able to (remove) the (token-value) from the (localstorage):
    removeItemFromLocalStorage(LOCALSTORAGE_TOEKN_KEY);
  };

  // => V.IMP = here we create the function:through which we gonna be updated the friendship section-data of the  (user):
  // when ever they try add the new-friend by clicking on the add-friend button:
  // IMP = this function basically have the two things as a arguments in it:
  // first is addFriend:addFriend is basically a boolean.it will basically have the (ture) or (False) value in it.
  // when we are removing the (user) as friend then this argument will have the (false-value):
  // and when we are adding the (user) as friend then this argument will have the (true-value):
  // second is friend:friend is basically the (data) of the (user) which we are trying to add as Friend or remove as friend from our user-profile's friendship section-data:
  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      // if the (addFriend) argument is ture:then we have to add that (user) in our friends-array:
      // after when we add the  (users) as our friends.through by adding them in our friends-array:
      // IMP = we need to set the (user) state again:
      // so that we can access our new friends-data in our user-profile:
      setUser({
        // first we pass the user-data it self to the (user) state:
        ...user,
        // second we gonna we pass the user's updated (friends-data):
        // so for doing this:we gonna be create the (friends) key: and with in that (friends) key:we will create the (array):and with in that (array):
        // first we gonna be pass old friends-data: and then second we gonna be the (new) friend-data.which they are just try to add as friend in there friends-data:
        // we gonna be use the spread-operator on the (user's) old-friends data:so that we can get all the old-friends data of the user:
        // and then we gonna be add there new-friend-data:In the friends-array section of the (user's) profile:
        friends: [...user.friends, friend],
      });
      // after updating the user-state.we need to return from this function:
      return;
    }
    // if we get the (false) value in (addFriend) argument:
    // then we gonna be remove the friend from the friends-section of  current user's profile:
    // IMP = we are getting the (user) in the (friend) argument which we have to remove as friend from our friends section-data:
    // IMP = we gonna do this by creating a new friends-array:
    // and with in that friends-array:we gonna be add the friends whose userid's are not matching with the userid of the friend-argument-user:
    // In this way we are able to remove the friend-object of the particular user in the friends section-data of current user's-profile or user-state:
    // we gonna be use the (filter) method on friends section-data:To check that which user-id matches with the userid of friend-argument-user:
    // because we have the array of friend-object in friends section-data:
    // IMP = and also (filter) method will return the new-array:
    const newFriends = user.friends.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );
    // after that we gonna be set the new (user-state) with the (new-friends) array:
    setUser({
      ...user,
      friends: newFriends,
    });
  };

  // 6 => V.IMP = we also need to return all these things from this function:
  // because through this function.we are providing the these things to the another function or element:
  // that why we have to return them from this function:
  // so that we can access these things on the another function or element:
  return {
    user,
    login,
    logout,
    laoding,
    signup,
    updateUser,
    updateUserFriends,
  };
};

// => 1 = PostsProvider custom-hooks:
export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log("postsProvider", response);
      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);
  // here we will get all posts of the user.with its newer post as well as an argument:with in this function:
  const addPostToState = (post) => {
    // here we will create newPosts array:with in that array:we will basically gonna be pass all the posts which we are getting as argument with in this function:
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };
  // here we will create function:through which we gonna be add the newly created-comment by the (user) to its post:
  const addComment = (comment, postId) => {
    // find out the particular post:which matches with the new-comments (postsId):
    const newPosts = posts.map((post) => {
      // then we gonna be create the new-post with the help of that:
      if (post._id == postId) {
        // with in that new-post:we gonna be add details of that (post) which we have found:
        // and also:we gonna be add its all (old-comments) with its (newer-comment) as well:
        return { ...post, comments: [...post.comments, comment] };
      }
      // if not found the particular post in posts-array:then we simply gonna be return the old (posts):
      return post;
    });
    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
  };
};
