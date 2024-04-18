// In this file we will be writing the (logic) related to the authentication for our application:
// V.IMP = we are using the (context-api) method.To the (handle) and (provide) the (authentication) to our hole application:

// for that we have to import the (createContext) function from the react:
import { createContext } from "react";

// here we are importing the custom-hook:which we have created to handle the (authentication) in our application:
import { useProvideAuth} from "../hooks";

// Imp = here we are creating the (initailState).which we have to pass to the (createContext) function:
// here we create the initialState object.
const initailState = {
  // 1 = here user value will be null.because its initialstate.
  user: null,
  // 2 = here we create the (login) key:which will have a arrow-function init:
  login: () => {},
  // 3 = here we create the (logout) key:which will also have a arrow-function init:
  logout: () => {},
  // 4 = fourth it will have the (loading) key:that repersents the (loading-state) of the (user) authentication:
  // by default we put it into (true):
  loading: true,
  // 5 - here we create the (Signup) key:which will also have a (arrow-function) in it:
  signup:() => {},
    // 6 - here we create the (updateUser) key:which will also have a (arrow-function) in it:
  updateUser:() =>{},
  // 7 - here we create the (updateUserFriends) key:which will also have a (arrow-function) in it:
  updateUserFriends:()=>{},

};

// for that:
// first = we have to  create the (Context):
// - here we are creating the (context):
// - for creating (context).we need to use the (createContext) function:
// - under that function we have to pass the (initialState) to it:
export const AuthContext = createContext(initailState);


//second = after creating the context:
// we will create the (AuthProvider) function.
// which will have a (children) agrument in it:
// this (children) arguments is basically a (prop):
// or we can say we are getting the childrens from the (prop).by destructuring the (prop):
// V.V.IMP = these childrens basically are the (components) or (children-components) of our application:
// V.V.IMP = because we will (wrap) our hole application under this (AuthProvider) function:
// with the help of this function.under which we are creating the (authcontext).
// V.V.IMP = we are able to access the (user-auth) or (user-auth-state).In all the components of application:
export const AuthProvider = ({ children }) => {
  // here we are creating the (auth) object.which will have the (auth) state in it:
  // which we need to pass to the (value) keyword of the (AuthContext.Provider) tag:
  // V.V.IMP = with the help of that we are able to provide the current (auth-state) to the (Childrens) or (children-components):
  // V.IMP = this (auth) state.also  handle by another (custom-hook):which we named  as (useProvideAuth):
  // this custom-hook.basically grab or have the (Current-state) of (authentication) in it:it also have the  default state in it:
  
  const auth = useProvideAuth();
 
  // 1 = V.IMP = under this function. we will basically return the (AuthContext) which we have created:
  // by connecting it with the (Provider) function:
  // 2 = V.IMP = the (AuthContext) with (Provider) function.will become the (tag):
  // and we are returning that (tag) from this (function):
  // 3 = V.IMP = this (tag).will also have a (default) value in it:
  // and that (value) will be (auth)object or (auth-state) object:
  // V.V.IMP = through this (value-keyword).we are able to pass our (auth-state) to all the (childrens) or (children-components) of our application:

  return (
    <AuthContext.Provider value={auth}>
      {/* V.Imp = under this (tag).we are basically (returning) or (rendering).all the childrens.
    => which we are getting as arguments in this (function). */}
      {children}
    </AuthContext.Provider>
  );
};
