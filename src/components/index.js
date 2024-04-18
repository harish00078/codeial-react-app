// import (app) component.In main file of component folder:
import App from "./App";
// import Navbar Component.
import Navbar from "./Navbar";
// import Comment Component;
import Comment from "./Comment";



// here we are importing the (loader-component) in our main-file of (Components):
import Loader from "./Loader";
// Import the FriendsList component:
import FriendsList  from "./FriendList";
// Import the CreatePost component:
import CreatePost from "./CreatePost";
import Post from './Post';


// And here we export all the component.so that we can use the in our application.
// we export them with one export function.as an object.
// so we did not have write the export again and again for the particular component.which we want to export.
// IMP = it also help system to do not check all the components one by one:
// it can get them in one (go):
export { Post,App,Navbar,Comment, Loader,FriendsList,CreatePost};
