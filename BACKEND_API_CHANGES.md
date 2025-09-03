# Backend API Changes

This document outlines the changes made to the backend API to resolve issues with the friendship and user profile functionalities.

## User Profile API

**Issue:** The frontend was unable to fetch user profiles, resulting in a `404 Not Found` error. This was because there was no backend route to handle requests for specific users by their ID.

**Changes:**

1.  **`SocialNode/src/controllers/userController.js`**:
    *   Added a new `getUser` function to fetch a user's profile by their `userId`.

    ```javascript
    exports.getUser = async (req, res, next) => {
      try {
        const user = await User.findById(req.params.userId)
          .select('-password')
          .populate({
            path: 'friends',
            populate: {
              path: 'to_user',
              select: 'name email avatar'
            }
          });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
      } catch (e) {
        next(e);
      }
    };
    ```

2.  **`SocialNode/src/routes/userRoutes.js`**:
    *   Added a new route, `GET /api/users/:userId`, to handle requests for specific user profiles.

    ```javascript
    router.get('/:userId', auth, getUser);
    ```

## Friendship API

**Issue:** The frontend was unable to fetch a user's friends list, resulting in a `404 Not Found` error. This was due to a mismatch in the API endpoint between the frontend and backend.

**Changes:**

1.  **`SocialNode/src/routes/friendshipRoutes.js`**:
    *   Modified the `getFriends` route to accept a `userId` as a parameter.

    ```javascript
    // Before
    router.get('/', auth, getFriends);

    // After
    router.get('/:userId', auth, getFriends);
    ```

2.  **`SocialNode/src/index.js`**:
    *   Changed the base route for the friendship API from `/api/friendships` to `/api/friendship` to match the frontend's API calls.

    ```javascript
    // Before
    app.use('/api/friendships', friendshipRoutes);

    // After
    app.use('/api/friendship', friendshipRoutes);
    ```