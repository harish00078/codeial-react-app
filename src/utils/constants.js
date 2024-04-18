// => In this constants-file we will put all the things which were did not get changed:

// what are APIs: Application Programming Interfaces APIs (Application Programming Interfaces) are software components that enable two software components to communicate with each other using a set of definitions and protocols. APIs serve as an intermediary between two disconnected applications, and can handle requests, business logic, and data formats. APIs can be open source or private, and may or may not require a network to function.

// here we are using the (APIs) from the coding-ninjas:

// this is the root of the (APIs):
const API_ROOT = "https://codeial.codingninjas.com:8000/api/v2/";

// here we have the documentation related to these (APIs):In the (notion) documentation system:
// like how these (APIs) has been created and what are things has been  used to create them:

// doc url - https://www.notion.so/aakashcn/Codeial-API-docs-3a4d0b5a42c54f0a94d951a42aabc13f

// here we have stored our all the (API-URls):In the export method with the help of (const) variable (object):so that we can use them in the other files of the application as well:
// this (API_URlS) is basically a (object).which has the (Key,value) pairs in it.these (key,values) are in the form of (functions):
// here we have created the (object) of (API-URls):so that we can store them in the form of (Key, Value) pairs:
// here these (keys) basically are the functions and these (values) are value for those functions:
// IMP => we use the (function) method instead of using the simple (String) method:To create key,value pairs:because In some of the (API-urls) we have the conditions present in them:so for passing those (urls) a condition (value): we need to use the function method:so that we can pass the condition (values) to those (urls) with the help of  function (argument):

// IMP => we also need to convert those (API-urls) into the pure (string) form:so for that we are using the (string-interpolation) function:

export const API_URLS = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  createPost: () => `${API_ROOT}/posts/create`,
  createFriendship: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  friends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
  toggleLike: (itemId, itemType) =>
    `${API_ROOT}/likes/toggle?likeable_id=${itemId}&likeable_type=${itemType}`, // itemType is 'Post'/'Comment'
  getLikes: (itemId, itemType) =>
    `${API_ROOT}/likes?likeable_id=${itemId}&likeable_type=${itemType}`,
  comment: () => `${API_ROOT}/comments`, // POST - create, GET - list of comments
  deleteComment: (commentId) => `${API_ROOT}/comments?comment_id=${commentId}`,
  editUser: () => `${API_ROOT}/users/edit`,
  userInfo: (userId) => `${API_ROOT}/users/${userId}`,
  searchUsers: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
};

// HERE we create the (key) or we can say the (unique-key):
// IMP =  through this (key):we will bascially store the (token-value) of the (user-authentication).In our localstorage:
// we will use this (unique-key).everywhere in our application:
// To basically (get),(set) and (remove) the (token-value) of the (user-auth) from our localstorage:
export const LOCALSTORAGE_TOEKN_KEY = "__codeial_token__";
