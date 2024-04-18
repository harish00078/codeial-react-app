// here we are building the (setting) page:
// through which (user) can do some changes on its profile-data:
// IMP = we only allowed few-sections Of the (profile-structure).
// to the (user) on which they can do some changes on it (profile-data):
// (user) only able to do changes on the (name) and (password) section of its profile-data:

// here we are importing the (useState) hook:
// through which we will basically manage the (states) of this (component-elements);
import { useState } from "react";

// here we importing the (useToasts) library of (react-toast-notification) package:
// through which we gonna show the notification on setting component page:
// when (user's) profile-data (successfully) get (updated) on the server:
import { useToasts } from "react-toast-notifications";

// here we are importing our styles-file from styles-folder:
// which we have  created for this (page):
import styles from "../styles/settings.module.css";


// here we are importing the (useAuth) custom-hook:
// through which we will  access the (Auth-Context) of our application:
// under that (context) we will have the (auth-data) related to the (user):
import { useAuth } from "../hooks";

// here we are creating the setting-component:
const Settings = () => {
  // here we are using the (useAuth) custom-hook:
  // through which we will  access the (Auth-Context) of our application:
  // under that (context) we will have the (auth-data) related to the (user):
  // and with the help of this (context).will (repersent) the (data) of (user) in this page or component:
  // IMP = and also provide the (authority) to the (users).that they can do some changes some changes in there (auth-data):
  // we only allowed (few-sections) to the (user) to do some changes on (auth-data) it:
  // mainly those section are (user-name) and (password):
  // => here we store (useAuth) custom-hook:
  // In the (auth) variable.through which we will call the (useAuth) custom-hook in our application:
  const auth = useAuth();

  // =>here we are creating the multiple (states) with the help of (useState) hook.
  // through which we will basically manage the (states) related to the (elements) of this setting-component:
  // for-example:
  // first is different states of the (form-button) or we can say different-states of the form's different-buttons:
  // second is to manage the (states) related to the (data).which has been given by the (user) through the form's input-tags:

  // IMP = here we are handling the (states) of the form's different buttons:
  // => 1 = first we will manage the state of form's (edit-profile) button:
  // we will gave the name to this state is (editMode):
  // with the help of this (state).we will basically connect our (input-tags) of few-elements of the (form) with the (edit-profile) button:
  // so that whenever user click on the (edit-pofile) button.we will show the (input-tag) to the (user) on the few-elements of the (form):
  // which we wanna gave to the (user) for changing the current (profile-data) through those elements of the form:
  // instead of showing them there (profile-data) values through those form elements:
  // IMP = by default it will have (false) value:
  // so that when user click on the (edit) button.its state get changed into (true):
  // and all those elements which  have connected with this state of edit-button:
  // get reflected on the (form):
  const [editMode, setEditMode] = useState(false);

  // => 2 = second we will manage the state of form's (save-button):
  // in order to show or hide it based on whether user is in edit mode or not:
  // and also when (user) click on this button:
  // IMP = we will basically send the (form-data) to the (server):
  // IMP = also block the (save-button) of  form:until (server) does not (satteled) the first-request of the (user) related to the (form) submission:
  // IMP = by default it will have (false) value:
  // so that when user click on the (save) button.its state get changed into (true):
  // and with in that we will send the (form-data) of the (user) to the (server):
  // and after that also block the (save-button) of the form:
  const [savingForm, setSavingForm] = useState(false);

  // IMP = here we are creating the (states) for handling the (data) of (form) (diff-elements):
  // we are basically getting the input from the (user) related to the few-element of the (form) with the help of (input-tag):
  // for having that data with us. we need to create the (states) for them.
  // so that we can have the (data) of those input-tags.and gave data to the (server):
  // when user click on the form's (save-button):
  // => 3 = first we will create the state for form's (name-element) data:
  // IMP = we also wanna show the already present(name) of the (user) on the input-element:
  // so that user can see its already present name on the input-element:
  // for doing that we simply need to gave the (value) of the (user-name) to the (initail-value) of the (user) state-hook:
  // we gonna get that (name) from the (useAuth) custom-hook:we gonna gave that (name) to the (name)state-hook:with the  help of condition operator:
  // so that we did not get the error in our application:
  const [name, setName] = useState(auth.user?.name ? auth.user.name : "");
  // => 4 = second we will create the state for form's (password-element) data:
  const [password, setPassword] = useState("");
  // => 5 = third we will create the state for  form's (confirmPassword-element) data:
  const [confirmPassword, setConfirmPassword] = useState("");

  // here we are calling the (useToasts) library:
  // through which we gonna use its (addToast) function:
  // and provide the (notification) to the elements of this (component) with the help of that (addToast) function:
  const { addToast } = useToasts();


  // here we are creating the (clearForm) fucntion:
  // through which we will clear the (password-fields) data of the (form):
  // if user's (profile-data) successfully get updated:
  // we did this because we did not the (user) to see its (old) passwords:if its profile-data (successfully) get updated:
  // IMP = and name-fields data will automatically get updated:as we use the (new-profile) data of the (user) in our application:
  const clearForm = () => {
    // we can do that why simply:
    // clearing the  (values) of our (password) states:
    // In which we are basically maintaing the (password) values of the (user):
    // IMP = we can simply put the (empty-string) value in those (password) states:
    setPassword('');
    setConfirmPassword('');

  };



  // IMP = here we creating the (updateProfle) function:
  // through which we gonna pass the (new-data) of the (user-profile) to the (server):
  // which has been given by the (users) it self:because they want to updated there profile-data:
  // IMP = we will create this function:
  // with the help of (async-await) method:
  // because we did not the (error) in our application:while we are sending the (request) to the (server) with help of this (function):

  const updateProfile = async () => {
    // IMP = under this function:first we need to set the value of our (savingForm) state to (true):
    // because now our (save-button) is pressed and we are trying to save the data of (user-profile) in the (server):
    // and did not want the (user) to click that button again.util it does not get the stattelement related to its (first-request) from the (server):
    setSavingForm(true);

    // here we create the variable (error) and by default it has the value (false):
    // we gonna use this variable:to tell the (users) that where they have made the mistake while sending the data to the (server):
    // with the help this variable we gonna triggered the notification which we have added in the  (check-points) of this function:
    // and going to tell the (users) that where they have made the (mistake):
    let error = false;

    // IMP = know before passing the new-data of the (user-profile) to the (server):
    // we need to check the (few) things and have the more (things) then the new-data for passing the new (user-profile) data to the (server):

    if (!name || !password || !confirmPassword) {
      addToast("please fill all the fields", {
        appearance: "error",
      });
      // here we are changing the value of the variable to (true):
      // so that we can trigger the notification.to tell the user that where they have made the mistake:
      error = true;
    }

    // we also need to check that password and confirmpassword is matches with each other:
    if (password !== confirmPassword) {
      addToast("password and confirm password does not match", {
        appearance: "error",
      });
      error = true;
    }

    // if we get any of the above errors:
    // then we need to (abled) the (save-button) again:
    // so that (user) can again send the (request) to the (server):after re-correcting its mistake:
    if (error) {
      // for abling the save-button again:
      // we just need to change the (value) of (savingForm) state to (false):
      // we also need to return that (value) from this (if) condition:
      return setSavingForm(false);
    }

    // IMP = if we did not get any of the above errors or check-points:
    // then we can send the (resquest) to the (server) with the (user) data:
    // IMP = we can send the request to the (server) with the help of our (useAuth) custom-hook's (updateUser) function:
    // IMP =  we also need to use the (await) method on it:so that we did not get any (error):while sending the (request) to the (Server):
     
    const response = await auth.updateUser(
      // 1 =  here the (user-id) field:whose (value) we are getting from our (useAuth) custom-hook.which will have the (context) related to (user-data) in it:
      auth.user._id,
      // 2 = here the other (three) fields.whose (value) we are getting from our (states).In which we have (manage) the (data) related to these (fields):
      name,
      password,
      confirmPassword
    );

    // IMP = if the response was successfull:
    // which we get from the (server):
    // related to the (user) resquest:
    // 1 = then we need to show the (notification) to the (user):
    // telling him/her about the succesful update of his profile information:
    // IMP = we aslo need to do other things as well:
    // like: 2 =  we need to change the (state) value Of (edit-profile) button or (edit-mode):
    // 3 = we also need to change the (state) value of (save-button) as well:

    if(response.success){
      // here we are changing the state (value) of (editMode): 
      // if the (response) was (successfull).which we get from the (server).
      // because then we need to set the  (user) to automatically get into the (edit-Profile) button page:
      setEditMode(false);
      // here we (abling) the (save-button):
      // if the (response) was (successfull).which we are getting  from the (server)
      setSavingForm(false);
      // IMP = if the (response) was (succecssfull):
      // then we need to (clear) form as well:
      // because we did not show the (user) its old data on the (form-fields):
      // if its (user-profile) data get updated:
      // we only need to clear the (password) fields.because the (name) field will get its (updated-name) value automaticallty:
      // that why here we are calling the (clearForm) function:through which we will basically clear our form's (password-fields) data:
      clearForm();
      addToast('User Updated successfully',{
        appearance:'success'
      });
      // if the (response) we not (successfull):
    }else{
      // then we need to show the (error) notification to the (user):
      // we will show the (error) message:
      // which we get from the (server):
      addToast(response.message,{
        appearance:'error'
      })

    }
    


    // IMP = if the (response) was (success) which (user) get from the (server) related to its (request):
    // then we also need to  change the value of  (savingForm) state:so that (user) can again use that (button):
    setSavingForm(false);

  };

  // 1 = we need to provide the (styles) to the (elements) of this page or component:
  // we can do that with the help of (className) method.and under that method we will provide the (style-object) to it:
  // we will provide the styles to the (className) method with in the object not in the string:
  // because we have created the styles for our application components in the (module.css) files:
  // that's why for accessing the styles of (module.css) file.we need to use the (object) or currly brackets structure we can say:
  return (
    <div className={styles.settings}>
      {/* => 1 = here we have image container:
        => were have image related to the (user): */}
      <div className={styles.imgContainer}>
        {/* for having or showing the image of  (user):
            => we need to use the (image) tag: */}
        <img
          src="https://cdn-icons-png.flaticon.com/128/13135/13135440.png"
          alt=""
        />
      </div>

      {/* => 2 = here we have container:
        => were we repersent or have our (user) data-fields: */}
      {/* IMP = In first field-container we (repersents) the (email-value) of the (user): */}
      <div className={styles.field}>
        {/* under this container:
            => we have two fields basically:
            => first (field) repersents the (title) or (Label):like (name) or (email) of the (user):
            => second (field) repersents the (value) related to that (title):like the (value) of user's (name) and (email): */}
        {/* first we have (email) field-section: */}
        {/* => this is the first-field: */}
        <div className={styles.fieldLabel}>Email</div>
        {/* => this is the second-field:
        => here we are providing the (value) of the (user-data) to this field.with the help of (useAuth) custom-hook:  */}
        {/* IMP = we also need to add the condition in this field.
        => where we are repersenting the (user-data):
        =>we need to add the (condition) here.that if we have (user-email) then show that (email).otherwise show (undefined)
        :*/}
        {/* => IMp = we can do that with the help of (condition-operator) or (ternary-operator):  
        => there are two ways to use it as well:
        => FIRST-WAY: we can define the hole condition-express.like this (condition ? <expression if true> : <expression if false>)
        => SECOND-WAY: In this way we can simple add the (?).In between and front of the hole value.which we want to (check):*/}
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      {/* IMP = In second field-container we (repersents) the (name-value) of the (user): */}
      {/* => IMP = here we are using the (editMode):
      => so that when (user) click on the (edit-button):
      => we will show the input-tag.Instead of  showing the (profile-value) of user'
      s particular profile-section on this particular form-element:
      => so with help of  (input-tag) user will able to change the (value) of that particular-section of its (user-profile): */}

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {/* => IMP = we are using the condition-operator:
      => so that we can show the input-tag.here acc to the (state) of form's (edit-button): 
      =>if user in the edit-button mode:then we will shpw the input-tag here:
      =>if user not in the edit-button mode.then we will show the (value) of (user-profile) particular-section:*/}
        {editMode ? (
          // here we will get the (data) from (user):
          // related to this particular-section of (user-profile)
          <input
            type="text"
            // here we are showing the current value of (name) state:
            // with the help of (value) keyword:we are basically doing that The value of the input field is set to the current value of the name state.
            value={name}
            // and from here we will get the new-value for  (name) state:
            // IMP= we will get that value with the help of (onChange) event-hanlder:
            // whenever user enter anythings on this (input-tag):
            // we will get that (value).from this input-tag with the help of  (onChange) event-handler:
            // we have create arrow-function under this (event-hanlder).we are passing the event-hanlder to this function as a (argument).with name (e):
            // under that argument we will have the (data) of input-tag:
            // so fetching the data from (event-hanlder).under the arrow-function:
            // we need to use the two-things of event-handler:
            // first is (target) method:
            // second is (value) function:
            // through these two  things.we will able to get the (current-value) of the input-tag:which has been enter by the (user):
            // IMP = and also under that (arrow-function).after getting the (user-value) from that input-tag:
            // we will gave that value to the (name) state.with the help of state's (setName) callback function:
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {/* IMP = same thing we need to do with the (password and confirmPassword-element) of form as well:that we did with the (name-element):
      => we need to connect these (elements) with the (state) of form's (edit-button):
      => IMP = we basically put these both elements in the (one-condition).where we connect them with the (state) of form's (edit-button):*/}

      {/* IMP = we gonna do that with the help of (&&) ANd-operator.we gonna basically connect these both password-elements with the (state) of (edit-button).
      => so that whenever (edit-button) state get (true):will show the these both (password-elements) and there input-boxes as well:
      => IMP = we need to use the (fragment) (<> </>).so that we can add the two same  (password-elements) in (one-place):
      = */}

      {editMode && (
        <>
          {/* IMP = the third field-container is different from other field-containers:
      => because In this (field-container): we basically want the  (new-password) value  form the (users): 
      => if they want to change there (password) value:*/}
          {/* IMP = so here In this container.
      => we did not have the (value-field):
      => instead of that we use the (input-tag).through which  (user) will provide the (new-value) for its (password):  */}

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* IMP = In fourth field-container we will get the (confirmPassword-value) of the (user):
      => In the same way.we get the (value) for the (password):
      => we also need to get the (value) for (confirm-password) field.because  we are getting the (new-value) for the (password-field) from the (user): */}

          <div className={styles.field}>
            <div className={styles.fieldLabel}>confirm Password</div>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      {/* In the last.we will have the (button-tag) or (button-container) we can say:
      => through which (user) can submit that(new-data) in its (auth-profile).
      => and get (updated) its (auth-profile) in the (server). */}
      <div className={styles.btnGrp}>
        {/* IMP = we have created the (different) styles for the (button):
        => acc to the (type) of the (button):
        => so defining the (particular) button-style to the (particular-button):
        => we need to use the (string-interpolation) method in the (object).were we gave provide styles to the (elements):
        => with the help of (string-interpolation) method:we can define the (multiple) things in the (one-string):
        => because (string-interpolation) method.basically (convert) every-thing which we have gave to him. In the (one-string): 
        => IMP = so we need to define the (style-value) of (two-classNames) in the  (one-className) object:
        => that'w why  we need to  use the (string-interpolation) method.because it will convert them in the (one-style) value:*/}
        {/* IMP = for adding the more values in the (string-interpolation).we use the (jquery) method: */}
        {/* V.IMP => 1 = here we are connecting our (edit-profile) button with its (state):
        => which we have created for it:
        => we gonna do that with the help of (condition-operator): */}
        {/* V.IMP => 2 = we need to take care of one thing:
        => which is that.we need to show the two buttons for this form:
        => so how and when we gonna show the which button.we need to place those button acc to that logic in the condition-operator.
        => so what we gonna do for that is:
        => when we are in the (true-state) of edit-button.we gonna show the (save-button).so that user can gave its (form-data) to the (server).which they had enter on the form:
        => and when we are in the (false-state) of (edit-button).we gonna show the (edit-button) itself:
        => so that by pressing it:user can go into the (true-state) of (edit-button).and in that state we have the another button.instead of edit-profile button:
        => and that button is (save-button):
        => IMP = we also need to use the (fragments) here.because we are using the two same kind of elements in one-place or condition*/}
        {editMode ? (
          <>
            {/* IMP = we also need to add or write the condition for this button as well:
          =IMP = so we can connect this button with its (state):
          => we gonna do that with the help of (condition-operator):
          => IMP = By managing this button's (state).we gonna (enable) and (disable) this button:
          => because through this button.we are sending the (form-data) to the (server).which has been enter by the user in the form for  updating its profile-data:
          => so we need to disable this button.when user click on it.
          => and enable it again.util we did not get the satteled statement from the server.related to the first-request that has been send by the user through this button: */}
            {/* IMP = with the help of this button.
          => we gonna put this (new-data) on the (user-profile) of (user) which is in the (server):
          => V.IMP = for doing that we need to use the (onClick) event-hanlder on this button:
          => and to the (event-hanlder):we gonna pass the (function).through which we are basically handling the (data-updation) of the (user-profile)  on the (server):*/}
            {/* IMP => we need to (disbaled) this (button).acc to the (value) of our (savingForm) state:
          => for disabling this button.we need to use the (disabled) attribute.
          => and under that attribute we are passing the (savingForm) state to it: */}
           <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving profile...' : 'Save profile'}
            </button>

            {/* here we are adding the another button:the (back-button):
            => through which user can go into the edit-profile button-state: */}
            {/* IMP = for getting back into the edit-profile button state.with the help of this (go-back) button:
            =>then we simply need to put the state-value of (editMode) state into  (false) with the help of this button:
            => for changing the value of editmode state with the help of this go-back button.
            // we need to use the (onClick) event-hanlder and with in the that event-hanlder we need use the function on this button.through which we gonna change that value of (editMode) state and gonna  gave back that changed to it. */}
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => 
                setEditMode(false)
              }
            >
              Go Back
            </button>
          </>
        ) : (
          // IMP = we are handling the (value) of our (editMode) state.with the help of this button:
          // so for that we need to use the (onClick) event-handler on this button.under that button we use the arrow-function.and with in that function we will change the value of (editMode) state.and provide that value to it.by simply passing that change value to its function the (setEditMode) function or argument:
          // IMP =  so that we ever user click on the button the (value) of (editmode) state get changed.
          // and acc to the  (state) value of this(editMode).the elements of (setting-component) should work:
          // acc to whatever the (logic) we have applied on them:related to the state value of (editMode) state:

          <button
            className={`button ${styles.editBtn}`}
            onClick={() => 
              setEditMode(true)
            }
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

// here we are exporting the setting-component:
export default Settings;
