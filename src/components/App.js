// we use (useEffect) hook of (react):To fetch the data from the (server) through (API):
// import { useEffect, useState } from "react";

// we are using the (react-router-dom) package.
// for providing or giving the (routes) to our application pages or components:
// IMP => we need to import the multiple (methods or functions) from the (react-router-dom) package:
// which will help us to giving the (routes) to our application pages or components:
// first method is (BrowserRouter).we need to import it as (BrowserRouter as Router):
// IMP = if we are using the (5.2.0) or older-version of the (react-router-dom) package:
// then we need to use the (Switch) library.instead of (Routes) library:
// second method is (Routes) or (switch):
// third method is (Route):
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// here we are importing the (useAuth) custom-hoo  k:
// through this custom-hook. we can basically access the data of our (auth-context):
import { useAuth } from "../hooks";

// =>  here we are importing the functions.through which we are connecting to the (server):
// and  getting the (data) for the (component):
// import { getPosts } from "../api";

// => here we are importing our application (pages):

// first we import the (home) page:
// second we import the (Login) page:
// third we import the (signup) page:
// fourth we import the (setting) page:
// fifth we import the (UserProfile) page:
import { Home, Login, Signup, Settings, UserProfile } from "../pages";

// here we import our (Navbar) component:
// so that we can use or get it into our application:
import { Navbar } from "./";

// here we are importing the loader-component:
// we can simply use the (./) to import  our Loader-comonent:
// because our (app) or (loader) component both present in the same folder:
import { Loader } from "./";

// V.IMP = here we are creating the (privateRoute) function or component we can say:
// IMP =  we are basically creating the privateRoute(function-component) here:
// with the help of this (Component):we can ristrict the (routes) of our application:
// IMP = this function-component will get the two (props) in it:
// 1 = first props is the (childer) prop:
// IMP = the (children) props are basically the (Components) and (pages) which are related to our (PrivateRoutes):
// because when we pass any (component) and (Pages) related to our application to the (privateRoute) component:they all become the (childrens) of our (privateRoute) component:
// 2 = second props is the (rest) prop:the (rest) prop basically have the (props) which we are passing with in the (Route):
// In simple words.it will have the (prop) which we have (pass) with in the (Route):
// for example:if we are passing some kind of (data) prop to the (Route):
// IMP = we are also using the (spread-operator) on it:so that we can get all (data) from the (rest) prop:

function PrivateRoute({ children, ...rest }) {
  // here we are calling the (useAuth) custom-hook:
  const auth = useAuth();

  // IMP = With in the (PriavateRotue) component:we are basically returing or rendering the (Route):
  // but here the (Route) will be little a bit different.from the usuall (Route):
  // because here we will write some ristrictions on the (Route):which we get in the (privateRotue) component:
  // IMP = with in (returning) the Route:
  // 1 = first we will add its (data),(path),(exact) and other (methods) prop with in it:which we are getting with in the (privateRoute) Component through the (rest) prop:
  // (rest) is basically the (data),(path),(exact) and other (methods) prop  for (Route) which we are returing from the (privateRoute) component:
  // we also use the (spread-operator) on it.so that we can get the everything from the (rest-prop):
  // 2 = second we will use the (render) prop on the (Route).
  // IMP = In the (render) prop.we will basically create the (arrow-function):
  // and with in the (arrow) fucntion.we gonna be add the (ristrictions) or (Conditions) on the (Route).
  // and acc to those (ristriction) or (conditions) of the routes. we are going to show or render there (components) and (pages):

  return (
    <Route
      {...rest}
      render={() => {
        // we will only be render the (component) and (page) of the (Route).if the (user) is (authenticated) or we can say already  have lagged-in into the application:
        if (auth.user) {
          return children;
        }
        // if its not the (auth) user:
        // then we will shift the (user) to the (logIn) page or component automatically:
        return <Redirect to="/login" />;
      }}
    />
  );
}

const About = () => {
  return <h1>About</h1>;
};

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  // V.V.IMP = here we are using the (useAuth) custom-hook fucntion:
  // whhich we will basicallu have the data related to our (auth-context):
  const auth = useAuth();
  console.log("auth-app", auth);

  // =======> we use this code when we want to fetch the (posts).In the (app) component:
  // =======> and pass them to the (home) component as a (props):through its (route).In the app-component:
  // here we are using the (useState) hook to manage our (posts): which get from the  (server):
  // In our (app) or (home) component:
  // IMP = the initail value of (useState) hook will be a empty array:

  // V.IMP = after getting the (posts) from the (setPosts) function to (posts) variable:
  // we need to gave that (posts) or (posts) variable to our (home-page):
  // because we have written the (posts-component) in our home-page:
  // V.IMP = we can do that with the help of (props) method:
  // so we are passing the (posts) variable.which have our (posts) data:
  // To our (home-page) with the help of (props) method:
  // const [posts, setPosts] = useState([]);

  // here we are creating the another (State) loading:
  // through which we will show the (loading) spinner on our application-browser:
  // while we are fetching the (data) from the (server):

  // by default this loader will have the (true) value:
  // so that when ever our application get start or load:
  // it will start immediately.and continous running until we will get the (data) from the (server)
  // const [loading, setLoading] = useState(true);

  // here we are using the (useEffect) hook:
  // To calling the (api_url) for the particular (component):
  // IMP => we are also using the (async) function here on the (useEffect) method:
  // so that our application did not get (crash).and successfully (get) or (fetch) the (data) from the (api) function:

  // useEffect(() => {
  // V.IMP = so instead of using the (async) function direclty on the (useEffect) method:
  // we can created the another (arrow-function) and on that (function) we will use the (async) method:
  // and  In this function we will  (fetch) or get our  (data) from the (api) function:
  //   const fetchPosts = async () => {
  // here we will get the (data) from the (getPosts) function:
  // and we will save it in the (response) variable:
  // IMP = we are also using the (await) function on the (variable).
  // so that we will successfully (fetch) our data from the (api) function:
  //     const response = await getPosts();
  //     console.log("response", response);

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
  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }

  // => and after we get the (data) from (server) successfully:
  // then we need to put the (loader) default value into (false):
  // setLoading(false);
  //   };

  // now we just call the (fetchPosts) function:
  // so that we can access (data) of its outside the (function):In the (useEffect) method:
  //   fetchPosts();

  // we are also using the (square) brackets on the (useEffect) method:
  // so that can only run once:
  // }, []);

  // =====<

  // IMP => if we did not get the (data) from the (server):
  // and the (home-page) still showing the (loading):
  // then we need to show the (loader-component):
  // V.V.IMP = this loading function.basically get its data from the (useAuth) custom-hook:
  // because this custom-hook will have the (data) related to our (auth-context):
  // under that (auth-context):we are also maniging the state related to the (laoding):
  // IMP => when we have to show the (loading) or not:it basically depend on the (user) authentication process:
  // and we are managing the (process) under the (auth-context):
  // so here we have to use the (laoding) state of (auth-context):

  if (auth.loading) {
    // here we are returning the (Loader) component in our (app) component:

    return <Loader />;
  }

  return (
    <div className="App">
      {/* here we are rendering or showing out (home) page */}
      {/* IMP = so here we passing the (posts) variable to our (home-page):
      =>with the help of (props) method:
      =>we are doing this because the (posts) variable will have all the data related to our (posts):
      => And in the (home-page).we have written our (posts-component):*/}

      {/* here we gave (Routers) to our application pages and components: 
      => for giving (Routes) to the pages and components:
      => first we  use the (Router) method of package:
      => under that second we use the (Routes) method of package:we use it when we are creating the multiple (Route) for the Application:
      => and with in that (Routes) method we will gave the (Route) to reach (page) and (component).
      with the help of third (Route) method of the package:*/}

      {/* here we have (Router) method first: */}
      <Router>
        {/* under (Router) method: we can put our those (components):
        => which we did not want to get (Route):
        => Like = Navbar-component,Footer-component*/}
        {/*  here we have our (Navbar) component: */}
        <Navbar />

        {/* here we have (Routes) or (Switch) Method second:
        => IMP =if we are using the (react-router-dom) package version is (5.2.0):
        => IMP = then we need to use the (Switch) method or library:
        => under this (Routes) or (Switch) method.we basically create the multiple (routes) for the application: 
        => we are using the (Switch) method: */}
        <Switch>
          {/* and  under that (Routes) method.we create the multiple (Route):
        => And we will gave that each Route to the Each page or component of our Application:*/}

          {/* IMP = Under the Route method.we need to provide the (path) for the (Route) of the particular page or component:
        => we have to provide the (path) for our page or component:In the way we have define or use them in our Application:
        => IMP = for providing path in the (Route). we can use the (Path) function of the (Route) method: */}

          {/* here we gave (Route) to our (home) component:*/}

          {/* V.V.IMP = (Note-1) => if we are using the (React-Router) version is greater than (6):
      => V.V.IMP = then we need to provide the (pages) and (components).
      => To the (Route) method.with the help of Route method's (element) function or Prop:
      => we need to gave our (page) or (component) To the particular (Route):
      => with the help of (Route) method's (element) named (function or Prop):
      => IMP = we will create the javascript-object with in the (element) Prop or function of (Route) method:
      => and Under that object we will provide our (page) and (component)*/}
          {/*  V.V.IMP = (Note-2) => if we are using the (React-Router) version is greater than (6):
      => then we also define or use the (Route) method.In our application the same way we define the (components) or (pages) of our application:
      => In simple words we did not define or use the (Route) method.In our application as a (tag):
      => we define or use it in the way.we define or use our application components or pages:
      => other important functions which we use in our application:like (Image)tag:
      => IMP =  In react we use the self closing tags.and we use the (Route) method in our application.
      => with the (self-closing) tag:In the self closing tags.we did not have to write the closing-element of the tag:
      => we can simple user the forward-slash in the (end) of the tag's (starting-element) */}

          {/* V.V.IMP = (Note-3) => we also need to use the (exact) property of the (Route) method:
      => so that Browser's (render) function.did to get confuse between the (route-paths):
      => if they were little-bit matches with each other: */}

          {/* V.V.IMP =  if we are using the (Switch) library:
      => instead of (Routes) library.then we also have to create the (Route) or (Routes) for the application:
      => acc to the (Switch) libaray: */}
          <Route exact path="/">
            <Home />
          </Route>

          {/* <Route path="/" element={<Home />} exact /> */}

          {/* V.V.IMP = we use this route.
          => when we are (fetching) the (posts) from the (server).
          => In the (app) component:and we have to pass that (posts) to the (home)component:
          => because from that (component).we are basically rendering the (posts) on the (browser): */}
          {/* <Route path="/" element={<Home posts={posts} exact />} /> */}

          {/* same thing we need to do for the other pages and components:
        => which we have did in the (home) Route: */}
          <Route exact path="/login">
            <Login />
          </Route>
          {/* <Route path="/login" element={<Login />} exact /> */}

          <Route exact path="/register">
            <Signup />
          </Route>
          {/* <Route path="/register" element={<Signup />} exact /> */}

          {/* <Route path="/settings" element={<Settings/>}/> */}
          {/* here we are defining (settings-page):
          => with the help of our (PrivateRoute) component:
          => so that we can ristrict our (settings-page):
            */}
          <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute>
          {/* <PrivateRoute exact path="/settings" element={<Settings />} /> */}
          <Route exact path="/about">
            <About />
          </Route>
          {/* <Route path="/About" element={<About />} exact /> */}
          {/* IMP = here we have created the (route) for viewing the (other-user) profile:
          => through which we can see the other-users profile: */}
          <PrivateRoute exact path="/user/:userId">
            <UserProfile />
          </PrivateRoute>
          {/* <Route path="/userz/wertewrksh" exact element={<UserInfo/>} /> */}

          {/* here we create the route at the end of all the routes:
          => with the help of  the error or 404 component:
          =>if any of above route does not match with the (user's) route request:
          => then we will show this error or (404) component to the user: */}
          {/* IMP = we also need to  gave the (path) and (exact) property to this route:
          => IMp = In the path function. we have to gave him the (*) start:
          => which will repersent that if user request for any random route request.then we will gave this route component:
          => because it will only  works.when all the other uper routes path does not get match with the user's route request: */}

          {/* <Route path="*" element={<Page404 />} exact /> */}

          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
