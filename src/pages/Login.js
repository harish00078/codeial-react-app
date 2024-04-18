// here we are creating the Login page:

// here we are importing the style module:which we have created particularly created for this component:
import { useState } from "react";
import styles from "../styles/login.module.css";

// we need to use the particular package of the (react-toast-notification) library for adding the notifications in the particular element of the component :
// and that  package name is (useToast):
import { useToasts } from "react-toast-notifications";

// here we are importing the (Redirect) Method of (react-Router-dom) libarary:
// through which we can redirect the (user) from (one-page) to the another-page of application:
import {Redirect} from 'react-router-dom';



// here we are importing the (useAuth) custom-hook:
// which we have created.To access the (user-Auth) state:
// In eaCh and every component of our application:
import { useAuth } from "../hooks";



const Login = () => {
  // we are using the (useState) hook:To get the data from the (form):
  // and gave that data to the component elements:which will send that data to the (server) for authentication the user with the help of that data:

  // first (useState) hook:we create for the (email) data:
  const [email, setEmail] = useState("");
  // second (useState) hook: we create for the (password) data:
  const [password, setPassword] = useState("");

  // IMP = third => we also need to maintain the (data) of the user's (login) button:
  // so that user did not click that login button again and again:
  // IMP = until its get the information from the server: related to its first login-request to the server:
  // IMP = By default its (false):means user can use that button to send request to the server:
  // but when request get send to the server:then that button get disabled.until user did not get the conformation related for its first-request to the server:
  const [loggingIn, setLoggingIn] = useState(false);

  // => IMp = useToast package of the notification libray:
  // It is  also a (hook) or we can say work like (hook):
  // so we need to use the (addToast) variable of this (useToasts) hook:
  // through which we gonna add the (notifications) in our (component-elements):
  const { addToast } = useToasts();


  // here we are calling the (useAuth) custom-hook:
  // which will have the (userAuth) state in it:
  // and we store that (useAuth) custom-hook in the another variable:
  // so that we can use that (auth) in our (application) component:
  // In which component we are importing it:
  const auth = useAuth();
  console.log('auth-login',auth);

  // here we are creating the (function).
  // through which we will handle the (onSubmit) event-handler of the form-tag:
  // IMP = In this function.we will pass the (event) of the form-tag:as a argument (e) in it:
  // here (e) repersents the (event-handler) or (event) of the (form-tag):\
  // IMP = we are adding the (async-await) method on this (login-handle-submit) function:
  // so that we can handle the (login) fucntionality without having any (crash) in our application:
  // through this (function):
  const handleSubmit = async (e) => {
    // V.IMP = first we need to (prevent) the (default) working of the (form-tag) after submission:
    // because in its default working.our application (page) gets reload when the user submit it:and we did not want that:
    // we only want to reload it.when we are done with our component or page-logic.related to this form:
    // => we use the (preventDefault) property of the (event-handler):To prevent it from doing its default working:
    e.preventDefault();

    // => (second) = after the form-get submited by the (user):
    // we need to set the (setLoggingIn) variable of the (useState) hook into (true):
    // so that we can disable the (log-in) button.for the (user) until it does not get the (response) from the (server).related to its first (log-in) request:
    setLoggingIn(true);

    // => (third) =  we also need to check that.we have got the email or password.
    // or we can say that user have added the email or password in the form:
    // if we did not get one of them.after user's submission on the form:
    // => then we need to gave the notification to the user:
    // that we add the both the detials for logging into the applications:
    // for notification.we are going to use the (react-toast-notification) library:
    if (!email || !password) {
      // if we did not get any one of them from the user:
      // then we need to return the notification to the user:
      // under the notification hook-variable: we need to add the two things:
      // first is message to the user: = we also need to add the string.acc to our perference:
      // second is to define the (options) or (reasons) related to the notification:
      // In second argument: we also have the multiple things to add:
      // 1 = (appearance):basically means the type of (notification):we define the (type) of notification in it:
      // like if its (error) notification.then we need to put the (error) value in it:
      // 2 = autoDismiss:it basically automatically remove the notification:after the time we have given to him:
      // we also have to gave the value to it:like (true) or (false):
      return addToast("please enter both email or password", {
        appearance: "error",
        // we are not writing the autodismiss.here we because we have already declared it in the main file of app:
        // autoDismiss:true,
      });
    }

    // => fourth = if we get the (email) and (password) from the (user):
    // then we have to login the (user) with those (credentials):
    // IMP = 1 =>for doing that we will gave those (credentials) to the (login) function:
    // which we have created.To hanlde the (login) functionality in our application:
    // IMP = 2 => we have created that function.In the (main-file) of our (hooks) folder:
    // that function is basically a custom-hook:
    // through which we are (handling) or (creating) the (auth-state) of the (user):
    // V.IMP = 3 => for that doing that we have to call the (login) function:
    // and we have to pass the (user) credentials to that fucntion:
    // while doing that we will add the (await) method on the function:
    // so that we did not (crash) our application.while be  try to (login) the (user):
    // through the (login) function:
    // V.IMP = 4 =>  we will also have to save that (response) of (login) function:
    // so that we can add the (notifications) acc to the (result) of that (response):
    // To tell the user that.its login request worked or not:
    // so for saving that (response).we have created the (response) variable:

    // V.V.IMP = working of (auth.login):
    // when you call the (login) function provided by the (useAuth) hook:
    // V.V.IMP = you're essentially triggering the (logic) within the (login) function in the (AuthProvider):
    // V.V.IMP = Or the another function.which we are using the in the (AuthProvider):To hanlde the (login) functionality:
    // which, that In turn, updates the state. This updated state is then accessible to all components using the (useAuth) hook through the AuthContext.
    const response = await auth.login(email, password);

    // => fifth = after getting the (response):
    // related to the (user) login:from the (login) function:
    // we have to create the (notification) for the (user):
    // acc to that what kind of (response) we get from the (function):
    if (response.success) {
      addToast("successfully logged in", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }

    // => sixth = after all of that we set (setLoggingIn) state into (false):
    // so that (user) can again use the (login) function:
    // if they are not successfully able to (login) into the applicaiton:
    setLoggingIn(false);
  };

  // IMP = here we are (redirecting) the (users) directly to the (HOME-PAGE):
  // when are successfully get (authenticated) in our application:
  // for doing that we are using the (Redirect) method of (react-router-dom) library:
  // and for checking that (user) is successfully get authenticated in application:we gonna be use the (useAuth) custom-hook:
  // which will basically have the (context) related to (user) authentication:
  if(auth.user){
    return <Redirect to="/" />;
  }


  // under the Login-page:we will create the (Form):
  // through which we will get the input from the user related to there user-id and password:
  // and gave that data back to the server.TO check that this user is authorized user of the application or not:

  return (
    // V.IMP = we also need to gave the event to the (form):
    // so that we can handle the (working) of this form:
    // IMP = we are giving the (onSubmit) event-handler to this form-tag:
    // under that event-handler:we will create the javascript object:
    // with in that object.we will gave him the function:
    // and through that function we will handle this form-tag's working:
    // working = means that we want to work this (form) after the submission by user:
    // V.IMP = acc to our component's logic:

    <form className={styles.loginForm} onSubmit={handleSubmit}>
      {/* we use span-tag as our page header */}
      <span className={styles.loginSignupHeader}>Log-In</span>
      {/* here we user div-tag:
        =>under that div-tag.we basically use the input-tags to get (data) from user related to there login credentials: */}
      {/* this div's input-tag get the e-mail input from the user: */}
      <div className={styles.field}>
        {/* we are using the propeties of the input-tag:
        => first is (type) of the input-tag.
        => second we use the (placeholder) in it.To gave some repersentation value to the input-tag.so that user knows what kind of input they need to put in this particular input-tag
        => third is the (required) ristriction property:so that user did not leave this input-tag empty: */}

        {/* V.IMP = here we are using the another property of the input-tag:
        => through which we will gave the (initial-value) to (value) the email (input-tag): 
        => IMP = for that we are using the (value) property of the (input-tag):
        => and that (value) property. will get the (value) for it. from the (email) variable of the useState hook*/}

        {/* V.IMP = we are also using the (event-handler) on this input-tag:
        => so that we can get its (data) or (value).when it get triggered by the user.
        =< by simply clicking on of its (form) button or submit-button:
        V.IMP = after getting its data. we will send that data to our (setEmail) variable of the useState hook:
        = which will pass that data to the (email) variable of (userState) hook:
        => and from that varaible.we will send the user-email data to the (server).for authenticating the (user): */}
        {/* V.V.IMP = we are using the (onchange) event-handler.
        => 1 =  we need to add that (onChange) event-handler on the (input-tag).
        => 2 =  so that when ever the (input-tag) get triggered:
        => 3 =  then this event-handler will collect it (data):
        // after getting the data of input-tag in the event-handler:
        V.V.IMP = we will create the arrow-function in the (onchange) event-handler:
      => so that we can get the event-data of the input-tag from the (onchange) event-handler.
      => we will pass the event-handler data to the function as a (arguement).by simply adding (e) in the argument:
      => this (e) repersent the event-handler.
      => know we need to get the (data) from this (e) or event-handler.
      => for that we need to use the property of the (event-handler).which will gave us the (data) or (value) of the event-handler:
      => and that property name is (e.target.value):
      // IMp = after getting the value or data of the input-tag.with the help of (event-handler):
      => we have to gave that data to the (setEmail) state variable of the (useState) hook:
      => and that (setEmail) state variable of useState hook.which is basically a function itself.
      => IMP = that function basically used to change value of the other-ariable of the (useState) hook.which will have the initial or starting value related to the element:
      => and when that initail-value holder variable get the value from the function-variable:
      => then we will use that (initail-value) holder varaible :To send the (data) of the (users) credentials to the server.through which user  are try to authenticate in the application: 
      */}

        <input
          type="email"
          placeholder="Email"
          // required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* this div's input tag basically get the password input from the user: */}
      </div>
      <div className={styles.field}>
        {/* we are using the three propeties of the input-tag:
        => first is (type) of the input-tag.
        => second we use the (placeholder) in it.To gave some repersentation value to the input-tag.so that user knows what kind of input they need to put in this particular input-tag
        => third is the (required) ristriction property:so that user did not leave this input-tag empty: */}

        {/* V.V.IMP = same thing we need to do.
        => for collecting the value of password from its input-tag: 
        => the way we did in collecting the (value) of the (email):from its input-tag:
        => and send that value to its (useState) hook variable:*/}

        <input
          type="password"
          placeholder="Password"
          // required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* here we create another div:
      => under this div. we will have our submit button: */}
      {/* IMP = here we are giving the (disabled) property to this (button) through its (div):
      => and that disabled property will have a (value) in it.acc to the (loggingIn) state.which we have maintain with the help of usestate hook:  */}
      <div className={styles.field} disabled={loggingIn}>
        {/* IMP = here we are giving the (object) to this button:
        => with the help of our (loggingIn) state:so that user did not trigger that button again and again: */}
        <button>{loggingIn ? "Logging in...." : "Log In"}</button>
      </div>
    </form>
  );
};
export default Login;