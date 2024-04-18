// here we are creating the navbar component:
// it will have a list of links to other pages in our app.

// here we are importing the (Link) function from the (react-router-dom) library:
// IMP = we will use this function on the behalf of (anchor) tag:
// V.IMP = basically when we use the (anchor-tag) for providing (url) reference or (Routes) to our application elements:
// it will reload the hole page for going into the another url or route which we have given to the element:
// V.IMP = so that's why instead of using the (anchor-tag): we will use the (Link) function provided by the (react-router-dom) library:
// this (Link) function basically did not reload the hole page when we are jumping on the another url or route:
// and this is we need because we are building the (SPA) application:
// Single Page Application, so when user click on any link then only that part should be loaded not whole page again and again.
import { Link } from "react-router-dom";

// here we are importing the (css) file:In the navbar component:
// we will import the css-module.which we particularly created for this component:
import styles from "../styles/navbar.module.css";

// here we are importing the (useAuth) custom-hook:
// through which we will provide the (user-auth) context to our (hole) application:
// or here we can say to our application's (navbar) component:
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";
import { searchUsers } from "../api";

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);
      if (response.success) {
        // setSearchText('');
        setResults(response.data.users);
      }
    };
    if (searchText.length > 2) {
      fetchUsers();
    }else{
      setResults([]);
    }
  }, [searchText]);

  // here we are using the (useAuth) custom-hook:
  // with the help of which we will provide the (user-auth) context to our hole application:
  const auth = useAuth();

  return (
    <div className={styles.nav}>
      {/* under the main div.
            => we create the two divs.
            => first div will be the (left) part of our navbar
            => second div will be the (right) part of our navbar*/}

      {/* this (div) have left part of our navbar */}
      <div className={styles.leftDiv}>
        {/* under this we will have (logo's).
                IMP = which will we working as a (links) to the different pages of application. */}
        {/* for giving link.we use (<a></a>) anchor tag.
                => under that (anchor-tag). we will use (Img-tag)acc to react app.
                => we provide source link of the logo to the image-tag */}
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/128/10469/10469570.png"
          alt=""
        />

        <input
          placeholder="Search Users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/13135/13135440.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* this (div) have right part of our navbar */}
      {/* IMP = In right we have (user-profile).and other links like him: */}
      <div className={styles.rightDiv}>
        {/* under main right div.we will create div.
                => which will have link to the (user-profile): */}
        {/*IMP => here we are giving the (auth-user) name to the navbar:
                => and we only have to show this (name) element of the navbar:
                => if we have any (auth-user):
                => we can find our that (auth-user):with the help of (useAuth) custom-hOOK:
                => we will basically add the (AND-operator) condition on this (element): */}
        {auth.user && (
          <div className={styles.user}>
            {/* we gave link to this div.
                    => by using (anchor) tag */}
            {/* V.V.IMP = so instead of using the (anchor-tag):
                    => we will use the (Link) tag or function in the (SPA) applications which is provided by the (react-router-dom) Library:
                    => because the (Link) page did not reload the hole page of the application:
                    => for going from the one-page (url or route) of application to another-page (url or route):  */}
            {/* V.IMP = for using the (LinK) function: we simple need the two things like anchor-tag:
                    => first is the (Link) function it self.instead of (a) tag
                    => second is the (to) property of the function.instead of (href) property of anchor-tag */}
            <Link to="/settings">
              {/* and anchor-tag.we use img-tag.
                        => which will have the user profile-image (source): */}
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/128/13135/13135440.png"
                className={styles.userDp}
              />
            </Link>
            {/* under anchor-tag.we have span tag.
          => which will repersent the name of the user */}
            {/* here we are giving the (auth-user-name) to the our (span) div element:
          => which basically repersents the (user-name) on the browser: 
          => we are getting that name from the (useAuth) custom-hook:*/}

            <span>{auth.user.name}</span>
          </div>
        )}

        {/* under the right-div.
        => we will also have one more div.
        => which will have the (log-in) and (log-out) Buttons. */}
        <div className={styles.navLinks}>
          {/* for creating buttons.we will use the unordered-list-method */}
          <ul>
            {/* under unordered-list-method.we use (list-tag):
                => To repersent the (lists): */}
            {/* IMP = we are also giving the (ristrictions) to the (routes) that:
            => if (user) logged in.then we only have to show the (log-out) route to the (user):
            => if (user) not (Logged) in.then we will show the (login) and (register) route to the (user):
            => IMP = we can check the (user) logged in or not:with the help of our (useAuth) custom-hook:
            => because it will have the (auth-data). related to the (user): 
            */}
            {/* IMP = for doing that we need to use these (<> </>) (fragments):
            => because with in one condition we are not able to use the (two-list) tags in continous manner or render:
            */}

            {auth.user ? (
              <>
                {/* V.IMP = here in this another list-tag.we will have another link or button. 
                => through which (user) will get (logout) from our application:*/}
                {/* V.IMP = we can also add the (onClick) event-hanler.function with in the (list-tag):
                => basicallty means that instead of using (button) tag.provide it the (event-handler):
                => we can direclty provide that to the (list-tag):
                => and under that (event-hanlder) function.we will basically gave the (logout) funciton to it:
                => with the help of (useAuth) custom-hook:the same way we did to the (button-tag): */}
                <li onClick={auth.logout}>
                  {/* IMP = we can do that with the help of (useAuth) custom-hook:
                  => through this custom-hook.we will connect this Button with the (logout) function of our (auth-context):
                  => so when every user.(click) on this (button):our logout function of the (auth-context):
                  => will basically logout the (user) from the application:
                  => V.IMP = how we can gonna do that:
                  => for that we will add the (onClick) event-handler in this (button):
                  => and under that (onclick) event-handler.will basically add the (logout) function of the (auth-context).with the help of (useAuth) custom-hook: */}
                  {/* <button onClick={auth.logout}>Log-Out</button> */}
                  Log-Out
                </li>
              </>
            ) : (
              <>
                <li>
                  {/* under List-tag.we will use the anchor-tag.
                    => To create a particular link or button for the particular thing */}
                  <Link to="/login">Log-In</Link>
                </li>

                {/* this list-tag.will have link of (register) component: */}
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// here we export our navbar component:
export default Navbar;
