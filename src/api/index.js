// here we are importing our object:which we have created in the (utils) folder of application:
// so that we can  store the  (token-key) in our application.
// and also we will be ablw to use it where-ever and when-ever we want it:

//1 =  we are also importing the (API_URLS):from the (utils) folder:
// so that we can use them in our component-function.
// TO fetch the particular data from the (server) acc to our component:
// 2 = we have also import the default (Token_key):which we have created in the utils folder's constants-file:
// which will we replace by the original-one:
// 3 = we have also import the (function).which we have created on the (utils) folder's mian-file:
// through which we are converting the (request) body-data. in the form of (x-www-form-urlencoded) request:
import { API_URLS, getFormBody, LOCALSTORAGE_TOEKN_KEY } from "../utils";

// here we are creating  the (customFetch) function:
// so that we did not have to write the (fetch) function.again and again for the every function which we will create to get the data from the APIs related to the particular compomemt element of our application:
// with the help of this (customFetch) function.we did not have to write the (try) and (catch) method again and again as well. for the every function which we have created to get the data of particular application component element:

// IMP = we also create our (customfetch) function:with the help of (async-await) method:
// IMp = In the custom-fetch function.we will put the (url) and (object or config-object) as the argument.
// this (config-object) argument will have two things or keys in it:
// 1 => (body) = body is basically a (user) data.like (email or password) or we can say the other (credentials or data) of (user).which we want to send when we are calling the (api) which will require the (user) data.
// 2 => (customConfig) =  this customConfig will have the other data related to the (api-request) of the (User). through which user making the request to the (backend):like some rules and ristrictions on the data which we want to get from the backend related to this  particular (api-request).
// IMP = here triple dots repersents the (spread-operator):
const customFetch = async (url, { body, ...customConfig }) => {
  // (1) => we need to get the token first:
  // because we need to pass the (token) in the (config) part of the (fetch) function or method with the (backend-api) url:
  // so the (server) knows that it the (authorized) person or user of the application which is making this (api-request):

  // => how we will get the token:
  // when ever user make the (log-in) request to the (server):
  // we will have the (token) in the response.
  // and will save that (token) in the (local-storage) or we can say in the localstorage of (browser) of our system:
  // or can say thatit will automatically get saved in the local storage of our (windows) system or we can say in localstorage of (browser):
  // so that we can easily get or use that (token) in our (api-requests) in which were need it.
  //  for getting the data from the (server) for the (components) which required the (authorization) of the (user) in the application:

  // => how we can get the (token) from our (local-storage) system:
  // for that we need to use the (window.localStorage.getItem) function:
  const token = window.localStorage.getItem(LOCALSTORAGE_TOEKN_KEY);

  // (2)  => second we need to set the (headers):
  // through which we will tell about our (criteria) to the (server) related to the (api-request) which we are sending to it.
  // by simply defining few things under the (headers) object of (api-request):
  // V-IMP = headers is an object where each property represents a (headers) that may be included in an HTTP request.
  // V.V.IMP => 1 =  first way of defining properites under the (headers) object:
  // these properties and there values mainly used when we are sending the simple (data) request to the (server): related to our (application) components:
  // In this case, there are two headers properties :
  // 1 = Content-Type: The content-type header is set to "application/json". This header is commonly used to indicate the media type (or MIME type) of the resource being sent or received. In this case, it specifies that the content is in JSON format.
  // 2 = Accept: The Accept header is set to "application/json". This header is used to indicate the media types that are acceptable for the response. In this case, it specifies that the client prefers to receive the response in JSON format.
  // const headers = {
  //   "content-type": "application/json",
  //   Accept: "application/json",
  // };
  // V.V.IMP => 2 =  second way of defining properites under the (headers) object:
  // these properties and there values mainly used when we are sending the (Authentication) request to the (server):
  // It also work.In getting the simple (data) from the (server):related to our application user or its components:
  // V.IMP = headers (content-type) mostly depend on our (server):like what kind of data.its accepts as a (request) from the (user):
  // In this case, there we have one headers property:
  // 1 = Content-Type:The content-type header is set to be "application/x-www-form-urlencoded".
  // This header is commonly used to indicate the media type (or MIME type) of the resource being sent or received.
  //  In this case, it specifies that the content is in the form of (x-www-form-urlencoded) .
  // V.IMP = what is x-www-form-urlencoded :
  // x-www-form-urlencoded is a way of encoding data that is sent in the body of an HTTP request.
  // It is a standard method used to transmit data between a web browser and a web server.
  // This encoding is commonly used when submitting (forms) on the web.
  // V.IMP = because our current server only accepts this kind of request from the (user):
  // When you submit a form on a web page, the data entered into the form fields needs to be sent to the server for processing.
  // The x-www-form-urlencoded format is one way to structure and transmit this data.
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };

  //=> if there is a (token) present then we need to add it into our headers object:
  //=> so that server know it is the (authorized) user of the (application). whose making this particular (api-request):
  //=> for fetching some data from the (server):

  if (token) {
    //  we will add the (token) into the (Authorization) section of the (Header):
    // through or with the help of (Bearer):
    // what is bearer:
    // Bearer : is just a keyword used to describe the type of authentication.
    // like basic , digest etc..
    // but here we are using the (JWT) token based on the (bearer) keyword.
    headers.Authorization = `Bearer ${token}`;
  }

  // (3) => third we will create the (config) object:
  // which we are giving to the (fetch) function:
  // a => first it will have the (config) object will have all the data related to the (user) request to the (server):
  // like some rules and ristrictions on the data which we want to get from the backend or server related to this  particular (api-request).
  // and it will get it (data) from the (customConfig) argument:
  // b => second it will have the (headers) key in it:
  // through which will gave some intructions to the (server) related to our (api-request):
  // we also use the spread-operator on the (headers) object in the (headers-key) Of  (config) object:
  // so that (config) object can get all the data related to the (headers-object) in it:
  // c => also if in the (customConfig) argument we have the (headers) section or key  as well.
  // then we will also add it in the (headers) sections of our (config) object:
  // d => if (customConfig) argument have anything related to the request's header:
  // that we will also add it in our (headers) object:so that it can get into our request's header:

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.header,
    },
  };

  // here we check that if we have (body) or data in our (body) argument.
  // then we will convert that (Body) or its data into the (Json) format.
  // simply using the (JSON.stringify) method:
  // and then we will gave our (body) argument or its (data) to the (config) object:

  if (body) {
    // V.IMP => 1 = we need to convert the (body) data  in the form of (json):when we are sending all the (content) related to the (request) in the form of (json) to the (server):
    // here we gave our (body) argument to the (config) object.
    // while or after converting it into the (json) format:
    // config.body = JSON.stringify(body);
    // V.IMP => 2 = we need to convert the (body) data  in the form of (x-www-form-urlencoded) format:when we are sending all the (content) related to the (request) in the form of (x-www-form-urlencoded) to the (server):
    // IMP => for doing that we need to use the (function).which we have specially created for it: In the (utils) folder's main-file:
    // these kind of request basically accepts the (form) type data:
    config.body = getFormBody(body);
  }

  // for (fetching) the data from the back-end (API). we will basically use the (try) and (catch) method. so that our application did not get (crashed).while we are fetching the data from the backend (api):

  try {
    // here we make the fetch request to (api):
    // IMP => we are also using the (await) function.while fetching the data from the (api):
    // In the (fetch) function.we will put the (url) and (config) argrument.because we want to fetch the data  from the backend or backend-api's.acc to the (url) and (config) be pass to this (customfetch) function.
    // because here we need to fetch the data from the different backend (api's) acc to our application components.

    const response = await fetch(url, config);
    console.log("server-response", response);
    // after getting the (response) or (data) from the (server):
    // => first we need to convert it into the (json) format:
    // by calling the (json) method on the (response) variable. Which has all the (data) from the (server):
    // IMP = this (json) method will also gave us the (promise):so we need to use the (await) method on it:
    // so that (promise) will (successfully) get (resolved).
    // V.IMP = here we are basically parsing the (data) into the format of (native-json):
    // V.IMP = The json() method is a built-in method in the Response interface in JavaScript. It is used to extract the JSON body content from the HTTP response. This method returns a Promise that resolves to the JSON representation of the response body.
    const data = await response.json();
    console.log("server-data", data);

    // if we (successfully) get the (data) from the (server):
    // then we need to (return) it from this (customFetch) function:
    // so we can use that (data) in our (Component) function and represent it on our application:
    if (data.success) {
      // our const (data) variable will have the (json) object:
      // and In that (json) object.we have the (data)-key.
      // In that (data-key) will have our (data) related to the (api-req) which we have made to the (server):
      // this why we are returing the (data.data) value:
      return {
        data: data.data,
        success: true,
      };
      // console.log(data);
    }
    // console.log(data);

    // if we did not able to get the (data) from the (server):
    // then we need to (throw) an (error) with a message:
    // we will through the (message) which we will get from the (server-data):
    // IMP => for throwing an in (React).we will use the two method:with there type or property:
    // 1 = (throw) method.
    // 2 = (Error) method.
    // 3 = (new) message type or property:
    throw new Error(data.message || "Something went wrong");

    // if we have the error: while we are fetching the data from the (server):
  } catch (error) {
    console.log("server-error", error);
    // then we need to (return) that (error) message as well:
    return {
      message: error.message,
      success: false,
    };
  }
};

// here we are creating the function for the particular component element of our application:whose data we have to get from the (api):
// here we are creating the (getPosts) function.so through this function we need to get the (posts) for our application component:through which we are showing (posts) on our application:
// we are fetching these (posts) from the (API):so we need to use the (get-post) API in our (getPosts) function.so that  we can get the (posts).
// so for using the (API) in our function:we need to use the (customFetch) function:where we have write our (APIs) logic:

// we also need to pass the two (arguments) to this customFetch function:
// first is the (page).In this argument:we will define that which (page's) posts we want to fetch:
// second is the (limit).In  this argument: we will define that how much (posts) we want  to fetch  from the (API):
// IMP = we can also gave the (value) to the (arguments) here.if we did not get them from the application (component) it self:

// IMP => getPosts is  a (pull) API request:basically it means that we are getting the data from the (API):
export const getPosts = (page = 1, limit = 5) => {
  // under this function: we need to call the (API):from where we get the (posts) data.
  // Instead of directly calling the (API) in this (function): we will call our  (customFetch)  function. where we have written the (logic) related to our (API) calling:
  // so for  connecting it with the (customFetch) function:we need to return this (getPosts) function's data to the (customFetch) function:

  // IMP = we need to the (data) related to our (component-function).
  // which we want to send to the (server) through the (api-request):
  // In this (return-statement) through which we are connecting to the (CustomFetch).
  // we wull gave our data to it.related to our (component) or our (Api-request):
  // which we want to send to the (server):

  // IMP:things we have define in the (return) statement:
  // 1 = first we need to define the particular (URl):related to our (component) function:
  // V.IMP = we also need to define the (url) with its (key) acc to its type:
  // like if its (function-type) or simple (string-type) (key-value) pair :
  // means that we have the pass the arguments to its (url) or not:

  // V.IMP = we also need to pass the (arguments) in the (key) of the (URL):
  // if there were present for the particular (component-function):
  // 2 = second we need to pass the (method) or (type) of this (request):

  return customFetch(API_URLS.posts(page, limit), {
    method: "GET",
  });
};

// here we have created the (login) function:
// through which we are sending the (user) credentials to the (server):

export const login = (email, password) => {
  // IMP:things we have define in the (return) statement of this function:
  // 1 = first we need to define the particular (URl):related to our (component) function:
  // V.IMP = we also need to define the (url) with its (key) acc to its type:
  // like if its (function-type) or simple (string-type) (key-value) pair :
  // means that we have the pass the arguments to its (url) or not:
  // V.IMP = we also need to pass the (arguments) in the (key) of the (URL):
  // if there were present for the particular (component-function):
  // 2 = second we need to pass the (method) or (type) of this (request):
  // 3 = also have to pass the (body) object:if we have for the particular request:
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};

// here we have created the (sign-up) or (register) function:
// through which we will basically pass the user (sign-up) form data to the (server):
// and get the (response) related to that (request) from (server):
export const register = async (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: "POST",
    body: { name, email, password, confirm_password: confirmPassword },
  });
};
// here we have created the (updated-profile) function:or (editProfile) function we are going to call it:
// through which we will basically pass the (new-data) related to the (user-profile) to the (server):
// and with the help of that new (user-profile) data server gonna change the (profile-data) of the (user) on its (database):
export const editProfile = async (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: "POST",
    body: { id: userId, name, password, confirm_password: confirmPassword },
  });
};

// here we have created the (fetchUserProfile) function:
// through which we gonna be get the (data) related to the particular (user-profile) from the (server) by passing  (user-id) to the (server):
export const fetchUserProfile = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: "GET",
  });
};

// here we have created the (fetchUserFriends) function:
// through which we gonna be get the (friendShip) section-data:
export const fetchUserFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: "GET",
  });
};

// here we have created the (addFriend) function:
// through which we gonna be add the (user) as our (friend) in the user-profile's (friends-ship) section-data:
export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: "POST",
  });
};
// here we have created the (removeFriend) function:
// through which we gonna be remove the (user) as our (friend) from the user-profile's (friends-ship) section-data:
export const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: "POST",
  });
};
// here we have created the (createPost) function:
// through which we gonna be add the (created-post) of (user) in our application:or we can say in our application's (server-data):
// IMP = this function will get the (content) of user's created-post as an argument:
// V.IMP = and we will send that argument (content) or (content):To the server with in the (body) section of server's api-request:
export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: "POST",
    body: {
      content,
    },
  });
};

// here we have created the (createComment) function:through which we gonna be add the new-comment of the particular post into the server-data:
export const createComment = async (content, postId) => {
  return customFetch(API_URLS.comment(), {
    method: "POST",
    body: {
      post_id: postId,
      content,
    },
  });
};


// here we have created the (toggleLike) function:through which we gonna be able to pass the togglelikes data related to our posts and comments into the server database:
export const toggleLike = ( itemId,itemType) =>{
  return customFetch(API_URLS.toggleLike(itemId,itemType),{
    method:"POST",

  })
}

// here we have created the (searchUsers) function:through which we are gonna be able to get the particular (users) from server:
export const searchUsers = (searchText)=>{
  return customFetch(API_URLS.searchUsers(searchText),{
    method:'GET'
  })
}

