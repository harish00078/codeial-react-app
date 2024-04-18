//here we are creating the (Sign-Up) or (Register) page for our application:
// this is where users will create a new account if they don't already have one.

// import the (useState) hook from (react):
// through which we will basically hanlde the (register) and (sign-uip) state related to the (user):
import {useState} from 'react';

// import the (useHistory) library from  (react-router-dom) package:
// IMP = this library basically have the (acccess) of (browser-history):
// (browser) basically use the (stack) to maintain the (application) routes:
// so with the help of this library.we will forward our (users) to the (login) page:
// when they successfully get authenticated or register in our application:
// import {useHistory} from 'react-router-dom';
// V.IMP = we are using the (useNavigate) method of (react-router-dom) libaray:
// because its compatible with our (react-router-dom) libarary:
// the (useHistory) method only comapatible with the (5.2.0) version of (react-router-dom) library:
// but we are using the (6.12.1) version of (react-router-dom) library:
// and that version is  compatible with our application node-version:
// IMP = (useNavigate) method work in same way as (useHistory) method:
// and it also get used same in our (application) as (useHistory) method:

import { useHistory, Redirect} from 'react-router-dom';

// import the (useToasts) library from (react-toast-notifications) package:
// through which  we will basically  provide the (notifications) to our application (Component-elements):
import {useToasts} from 'react-toast-notifications';

// import the (useAuth) custom-hook:
// through which we will basically provide (authentication) to our (application-components):
import {useAuth} from '../hooks';

// import the (styles) from (styles) folder:
// we are basically using  our (login) file styles here as well:
// because the (register) or (sign-up) page will be similer to the (login) page:
import styles from '../styles/login.module.css';


// here we are creating the (sign-up) or (register) component for our application:
const Signup = () =>{
    // 1 = first => we will manage the (name) of the (user) in our component:through (useState) hook:
    // the (name) that has been given to us.by the (signup) form.which we have created in the (sign-up) component:
    // through that (form) we will basically get the (user) data in our (sign-up) component:
    const [name,setName] = useState('');
    // 2 = secondly => we will handle the (email) of the (user):through (useState) hook:
    // the (email) that has been given to us.by the (signup) form.which we have created in the (sign-up) component:
    // through that (form) we will basically get the (user) data in our (sign-up) component:
    const [email,setEmail] =  useState('');
    // 3 = thirdly => we will handle the (password) of the (user):
    // the same way.we get the user (name) or (email):
    const [password, setPassword] = useState('');
    // 4 = fourth => we will handle the (confirmPassword) section of the (user):
    // In the (sign-up) page of our application: we will basically have the (two) password section:
    // one for entering the (password) and another for confirming it:
    // we will also handle it in the same way.we hanlde the other elements of the (form):
    const [confirmPassword,setConfirmPassword] = useState('');
    // 5 = fifth => here we are managing the (state) for our (register) and (sign-up) button:
    // we gonna also do that  with the help of (useState) hook:
    // we are doing this because we did not want to crash our application:
    // IMP = In simple words that we will basically block our button.when user (click) the (sign-up) button:
    // and we will not release the (block) state of that button:
    // until the (user's) first (sign-up) request does not get satteled by the (server):
    const [signingUp, setSigningUp] = useState('');
    // 6 = sixth => here we are importing (addToast) function of the (useToasts) library:
    // through which we will basically (provide) and (add) notification in our application component-elements:
    const {addToast} = useToasts();
    // 7 = seventh => here we will call our (useAuth) custom-hook:
    // through which we will basically provide the (auth) to our application components:
    const auth = useAuth();

    // 8 = eight => here we are calling the (useHistory) Library:
    // through that we can redirect the user to the homepage after (users) successfully get registered:
    // IMP = we basically call the (useHistory) library:
    // with in the (history) variable:
    // const history = useHistory();
    // here we call (useNavigate) method instead of (useHistory) method:
    const history = useHistory();
    // here we console-log the (history) or history-library:
    // so that we can see the working process of this (library):
    // console.log('history',history);
    console.log('navigate',history);


    // => 1 = Here we are creating the Fucntion:
    // through which we will basically handle the (submission) of our (sign-up) component's (form):
    // with the help of this function.we are basically getting the (userS-data):
    // through which they are try to get (register) into our application:
    // after getting the (user-data) from the (form) in the (function):
    // we will basically pass that (data) to the (server).
    // with the help of (useAuth) custom-hook:and if its (data) is in the correct format.
    // acc to the (server).then (user) will successfully get (authenticated) in our application:
    
    // IMP => 1 =  we are basically get the (user-data) from the (form) in the (event-hanlder):
    // we have to pass that (event-hanlder) to the (function):
    // so we can access that (user-data) in the (function):
    // IMP => 2 =  we are also adding the (async) method on this function:
    // so that our application did not get crashed.
    // when we are getting or (passing) the (user-data) to the (server):
    const handleFormSubmit = async (e) => {
    
        // => 3 = first we need to (stop) the (default) setting of the signUp-form's (event-hanlder):
        // so that our (sign-up) form does not get reloaded.after it get submitted:
        // we only want to reload it.when (user's) sign-up request is satteled by the (server):
        // IMp = for doing this we need to use the (preventDefault) function on the (event-handler):
        e.preventDefault();

        // => 4 = second we have to (block) our (sign-up) button:
        // so that (user) will not able to (click) twice:
        // on the (sign-up) button:for that we are managing the (state) of the (button):
        // IMP = when(user) once clicked the (sign-up) button:will set its state (true):
        // so that (user) will not able to click again on the (button):
        // util it get its (first-request) response from the (server):
        setSigningUp(true);

        // => 5-IMP = third in here we are managing the (errors) in our (handleFormSubmit) function:
        // so for managing the (error) in this (function):
        // we basically the create the (variable):which is maintaing a (boolen) value in it:
        // so that whenever:we want to tell the (user) that you have (error):
        // with the (form) that you are trying to submitting to the (server):
        // IMP = where we have the (error). we will basically set that (error) variable's value to (true).
        // But by default it has (false) value:
        // IMP = example if we have (error):then we need to tell that (error) to the (user):
        // we will tell that (error) to the (user) with the help of (notification):
        // for trigging that (notification):we are basically maintaing that (error) variable:
        // so when we got (error) in any of the (check) points in the (fucntion):
        // we wil set the (error) variable (value) to (true):and with that the (notification):
        // which we have added in the (particular) check point:will automatically get triggred.
        // and show the (notification) to the (user):
        // we are using the (let) variable-type to create the (variable):
        let error = false;


        // => 6 = then we will validate our (user-data):
        // that (data) which we get from the (form):
        // Is that data is  (appropriate) or (filled) with all the (fields) of the (form):
        // then only we are able to send (user-register) request to the (server):
        // we need to check the (four) fields of sign-up (form):
        if (!name || !email || !password || !confirmPassword){
            // if any of one form field is missing:
            // then we have to trigger the (error):
            // for (triggering) the (error) in between the (function) sequence:
            // we have to use the (error) varaible .which we are maintaing to (trigger) the (error) in between execution sequence of (function):
            
            // IMP = we create (notification):with the help of (addToast) function:
            addToast('please fill all the fields of form',{
                // we also have to provide some properties to this (notification) as well:
                // like: Its-type,and remove-state from our web-app:
                appearance:'error',
                autoDismiss:true,
            });

            // if we have (error).then we simply set the (error) variable value to (true):
            // and that will trigger.our (error) notification:
            // which we have (created) for this (error) check point:
            error = true;



        }

        // => 7 = if that (check-point) get (pass):
        // then we have to match our both passwords (fields):
        // Like our both  passwords (fields) .should have the same (password):
        // IMP = all other it have the (same) process.
        // Like we did on checking all the (form-fields) to show (notification).
        // if we have (error) in it:
        if(password !== confirmPassword){
            addToast('make sure password and confirm password field matches',{
                appearance:'error',
                autoDismiss:true,
            });
            error = true;
        }

        // IMP => 8 = And if we get any of the (error) from above form-data check-points:
        // then we also have to (disabled) our (form) button:
        // so that (user) can again gave  (request) to the (server):
        // by providing the (appropriate) data on the (form):
        if (error){
            return setSigningUp(false);
        }


        // IMP => 9 = if (user) form-data pass:
        // all those (check-points):
        // then we need to provide that user (sign-up) data to the (server):
        // we can do that with the help of (useAuth) custom-hook:
        // under that (custom-hook):we basically have written the (sign-up) function which is connected to the (server):
        // we will use that function here.with the help of (useAuth) custom-hook:
        // and pass the user (sign-up) form-data to it:
        // IMP = we will call  the (useAuth) custom-hook's (signup) with the variable:
        // because we also have to (save) the (response):which we get from the (server):
        // after the (user's) sign-up request get satteled:
        // we also use the (await) method on variable.so that our (application) did not get crash:

        const response = await auth.signup(name,email,password,confirmPassword);

        // IMP => 10 = if (response) is (success).
        // then it means that (user) have (successfully) get (register) in our application:
        // so after that we have to.(Redirect) our (users) to the (Login) page:
        // so that our (users) can (login) into our application.and use the (application):

        if (response.success){
            // IMP => 11 = here we push our (users) to the (login) page:
            // after they successfully get (authenticated) in our application:
            // IMP = here we are forwarding the (users) to the (login-page):
            // those who successfully get (registered) on application:
            // we are doing that with the help of (history) variable:
            // on which we have call the (useHistory) library:
            // IMP = we also need to use the (push) function:
            // because browser-history only triggers the (page-route):
            // if it gets (pushed) or (added) in the (browser-history) stack:
            history.push('/login');
            // V.IMP =here we are using the (useNavigate) method instead of (useHistory) method:
            // because that method is compatible with our (applicaiton's) react-router-dom library:
            // IMP = with the (useNavigate) function.we did not have to use the (push) function:
            // it automatically push us to the (another) page:
            // navigate('/login');
            // IMP => 12 = after that we also need to  (change) the state of our (signup) button:
            // so that another (users) can sign-up into our application:
            setSigningUp(false);

            // IMP => 13 = we also have to add the notification:
            // which show that (user) have been registered sucessfully:
            return addToast('User registered successfully,Please Login Now',{
                appearance:'success',
                autoDismiss :true ,
                        
            });

            // IMP => 14 = but if we got the (error):
            // while registering the (user) in our (application):
        }else{
            // IMP => 15 = we have to show the (error) notification to the (user):
            addToast(response.message,{
                appearance:'error',
                autoDismiss:true,
            })

        }

        // IMP => 16 = after that we also need to change the (state) of our (sign-up) button:
        // so that (user) can again try to login into our applicaiton:
        setSigningUp(false);



    };
    // if user is already logged into our application:
    // then we will shift the (user) to the (home-page):
    if (auth.user) {
        return <Redirect to="/" />;
      }

    return(
        // here we are creating the (sign-up) form for our application:
        // IMP = we also connect this with the (onSubmit) event-handler:
        // and that (event-handler) basically connected to the (handleFormSubmit):
        // because we will basically get the (form-data) in our (handleFormSubmit) fucntion:
        // with the help of event-handler:
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
            {/* here we create the heading for our signup form */}
            <span>SignUp</span>
            {/* here we create different fields:
            => through which we will basiclly get data related to the (sign-up) from (user): */}
            {/* first we have is (name) field: */}
            <div className={styles.field}>
                {/* here we use the (input-tags):
                => under the (form-tag):To basically get the (data) from the (user): */}
                <input 
                placeholder='Name'
                type='text'required
                // IMP = we also provide its own (value) to it:
                // with the help of (useState) hook:
                // through which we are Managing the each-fields value:
                value={name}
                // IMP = for providing the own-value of the (field) to the (field) again:
                // V.IMP = and have that (value) in our (state) hook:
                // so that we can use it in our (formsubmit) function:
                // we first need to get that (value):
                // for getting that (value) from the (field) or (input-tag).
                // we need use the (onChange) event-handler on the (field):
                // so that we can have access to the (value).which we has been enter on the (input-tag) or (field) in present-time:
                // IMP = for getting that value with the help of (event-hanlder):
                // we need to use the (target) function of the (event-hanlder):
                // and under that (target) function.we have the (value) method:
                // through which we will basically get the (value) of the input-tag or field:
                // IMP = and we also have to provide that value to the (state) which is related to this input-tag or field:
                // here we are getting the data related to the (name) field:
                // that's why we gave this data to the (name) useState hook:
                onChange={(e) => setName(e.target.value)}
                autoComplete='new-password'
                />

            </div>
            {/* here we second field: (Email) */}
            <div className={styles.field}>
                <input placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='new-password'/>
            </div>
               {/* here we third field: (password) */}
               <div className={styles.field}>
                <input placeholder='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
               {/* here we fourth field: (confirmPassword) */}
               <div className={styles.field}>
                <input placeholder='Confirm Password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {/* here we have button:
            => through which we user will submit this sign-up form: */}
            <div className={styles.field}>
                {/* here we are (disabling) our button:
                => acc to the (state) which our (signingUp) state-hook will have: 
                => IMP = for disabling our button:we are using the (disabled) method of (Button-tag)*/}
                <button disabled={signingUp}>
                    {/* if our (signingUp) state-hook:
                    => have a (true) value:then button will get disabled.and we will show the (signing up..) text on the button:
                    => but if it has (false) value:then button will not get disabled.and we will show the (signUp) text on the button */}
                    {signingUp ? 'Signing up....' : 'SignUp'}
                </button>

            </div>
        </form>
    );




};
// here we are exporting the sign-up page:

export default Signup;