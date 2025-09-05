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
          friends.map((friend) => {
            // Handle both friendship objects and direct user objects
            const friendUser = friend.to_user || friend;
            return (
              <div key={`friend-${friendUser._id}`}>
                <Link className={styles.friendsItem} to={`/user/${friendUser._id}`}>
                  <div className={styles.friendsImg}> 
                    <img
                      src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                      alt=""
                    />
                    <div className={styles.friendsName}>
                      {friendUser.name || friendUser.email}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FriendList;

