import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { App } from "./components/index";

// here we are importing our notification library:
// In our application's main-file named as (react-toast-notifications):
// IMP => we need to import the particular (package) from this library:
// which is named as (ToastProvider):
import { ToastProvider } from "react-toast-notifications";
// V.Imp = here we are importing the (AuthProvider) function.
// through which we are able to provide the (auth) of the (user).
// To all the component of our application:
import { AuthProvider } from "./providers";
// IMP = here we are importing the (postsProvider):
import { PostsProvider } from "./providers";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   {/* <Router> */}
     {/* we will wrap up our hole application:
    //     => under this (ToastProvider) package of the (react-toast-notifications) library:
    //     => so that we can use it.In any where of our application */}
     {/* V.IMP => we aslo have to gave some properties to it:
    //     => first is the (autoDismiss):so that notification will automatically get removed after showing:it will also have a value in the form of (true) and (false):and by default its value is (true):
    //     => second is the (autoDismissTimeout).we also have to gave the time to the notification.To tell it that after how much it has to remove from the web-page:we gave him the time-data in the form of (miliseconds)
    //     => third is the (placement):we also need to place the notifications.like where we want them to pop-up on the web-page:*/}
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      {/* here we are (using) or (wrapping) our hole application:
      => under the (AuthProvider) function.which we have create or used to handle the (AuthContext) of the (user) in our application: */}
      <AuthProvider>
        <PostsProvider>
          <App />
        </PostsProvider>
      </AuthProvider>
    </ToastProvider>
   {/* </Router> */}
 </React.StrictMode> 
);
