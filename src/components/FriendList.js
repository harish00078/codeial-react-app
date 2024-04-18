import styles from "../styles/home.module.css";
// here we import the (LINK) library:
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
const FriendList = () => {
  // we will get our friendslist from the (useAuth) custom-hook:
  // because it will have the data-related to our authenticated (user):
  const auth = useAuth();
  // here we are (destructuring) friends from (useAuth) custom-hook:and passing them to the empty(array):
  // IMP => (Destructuring) =  Destructuring is a JavaScript feature introduced in ES6 that allows you to extract specific values from objects or arrays and assign them to variables:
  // It's a way to extract values from objects and bind them to variables. Here, it's saying that from the auth.user object, extract a property called friends and assign it to a variable named friends. The = [] part is providing a default value of an empty array in case the friends property is not found in auth.user.
  const { friends = [] } = auth.user;
  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>
        Friends
        {/* here we are putting the friends:which we are basically getting from (useAuth) custom-hook: */}
        {/* IMP = first we check that if did not have any friends in the array:*/}
        {friends && friends.length === 0 && (
          <div className={styles.noFriends}>
            {/* then we will show this (div-element) value */}
            NO Friends Found
          </div>
        )}
        {/* IMP = second if we have the friends in the array:
        => then we have to (map) over on those friends.and show them through this (div-element): */}
        {/*  IMP = we also pass the (friend's) object or document (id) to this div-element:
        => so that with the help of (link): when user clicks the link:
        => we can transfer the (user) to the (friends) user-profile: */}
        {friends &&
          friends.map((friend) => (
            // IMP => when used in the context of rendering a list of friends, key={friend-${friend._id}} ensures that each friend element in the list has a unique identifier, which helps React optimize its rendering performance and efficient-updates.
            <div key={`friend-${friend._id}`}>
              {/* here we are passing the url of (user-profile) component:to this Link-tag:
            => because (friend-id's) are similar to the (user-id's):basically the (friend) object or documents are made from the (user) object or documents:  */}
            {/* IMP => /user/${friend._id} is constructing a URL string dynamically, incorporating the unique _id of each friend object into the URL path. This is commonly used in React applications to create dynamic links and navigate to specific pages or resources. */}
              <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
                {/* here we are showing the details of the (friends):
              => like there (names) and (images):*/}
                <div className={styles.friendsImg}> 
                  <img
                    src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                    alt=""
                  />
                  <div className={styles.friendsName}>
                    {friend.to_user.email}
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendList;

