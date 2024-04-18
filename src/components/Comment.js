// we use (PropTypes) package:To handle the (props) of this component:
// which we are gettting from the (post) Component:

import PropTypes from "prop-types";

// we also need to import its style-module:
import styles from "../styles/home.module.css";

// here we create the Comment-component:
// IMP = here pass the (props) to the comment-component:as a (object):
// because we are handling the (porps) of this component:
// through the (propTypes) package:and that package will create the (object):
// for the (props): which will help  us to (handle) or check the (errors) of the (props):
// which we are givng to the particular component:
// IMP = And also through this package we can also gave some (properties) or (ristrictions):
// to the (props):so that we can avoid the errors in our applcation related to the props-validation:
const Comment = ({comment}) => {
  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <span className={styles.postCommentLikes}>22</span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

// here we create Props object with the help of proptypes package:
// and add some (properties) and (ristriction) in the (props) of this component:
// we only add to properties to avoid error in our application:
// first is to convert them into the (object):
// second we need to add the ristriction to this object:
// like for using the (comment) component.we need to provide the comment prop to the (comment) component:
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

// here we are exporting this comment:
export default Comment;
