// here we are importing our all pages in one-file:
// and from there we will export them to the application.
// so that we can keep track on our application pages.
// and this will also gave the structure to our application.
// we will also structure our all the section of the application in the same way:

// here we import the (home) page:
// IMP 1 -> we can import our home-page as (object):
import Home from "./Home-StartFrom-SearchAndChat-Lecture";

// import the Login page or component: 
import Login  from "./Login";
// import the (Signup) page:
import Signup from "./SignUp";
// import the (setting) page:
import Settings from "./Settings";
// import the (UserProfile) page:
import UserProfile from './UserProfile';
// here we export the (home) page:
// IMP 2 -> or we can export it as (object):
// V.IMP 3 -> by doing this we can add the multiple (pages) our application in the one (object):
// V.IMP 4 -> and we can also export them all in the one (export) statement:instead of exporting them one by one:
// V>IMP 5 -> that's why we are putting them in the export (object):
// V.IMP = and  we did not use the (default) method on export. if we are importing the multiple (file) in the one export statement:

// export the log-in-page with home-page:
export { Home ,Login, Signup,Settings,UserProfile};

// IMP = we can also export the (pages) with the help of (asterisk):
// with the help of this method we can easily (import) and (export) the (pages).
// In the application from the main file of the (pages) folder:
// export * from './Home';


