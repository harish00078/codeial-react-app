// Lightweight client-side mock API for local development when backend is unavailable.
// Enable by setting REACT_APP_USE_MOCKS=true in your .env.

const LS_DB_KEY = "__mock_db__";

function base64url(input) {
  return btoa(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function createUnsignedJwt(payload) {
  const header = { alg: "none", typ: "JWT" };
  const encHeader = base64url(JSON.stringify(header));
  const encPayload = base64url(JSON.stringify(payload));
  // No signature for mock
  return `${encHeader}.${encPayload}.`;
}

function nowIso() {
  return new Date().toISOString();
}

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function readDb() {
  const raw = localStorage.getItem(LS_DB_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (_) {}
  }
  // Seed database
  const u1 = { _id: "u1", name: "Demo User", email: "demo@example.com", password: "123456" };
  const u2 = { _id: "u2", name: "Jane Doe", email: "jane@example.com", password: "password" };
  const initial = {
    users: [u1, u2],
    friendships: [],
    posts: [
      {
        _id: "p1",
        content: "Welcome to the demo feed!",
        user: { _id: u2._id, name: u2.name },
        createdAt: nowIso(),
        likes: [],
        comments: [],
      },
    ],
  };
  localStorage.setItem(LS_DB_KEY, JSON.stringify(initial));
  return initial;
}

function writeDb(db) {
  localStorage.setItem(LS_DB_KEY, JSON.stringify(db));
}

function delay(result, ms = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(result), ms));
}

// Helpers to shape responses like the real API
function ok(data) {
  return delay({ success: true, data });
}
function err(message) {
  return delay({ success: false, message });
}

export async function login(email, password) {
  const db = readDb();
  const user = db.users.find((u) => u.email === email && u.password === password);
  if (!user) return err("Invalid email or password");
  const token = createUnsignedJwt({ _id: user._id, name: user.name, email: user.email });
  return ok({ user: { _id: user._id, name: user.name, email: user.email }, token });
}

export async function register(name, email, password, confirmPassword) {
  if (!name || !email || !password || password !== confirmPassword) {
    return err("Invalid sign up details");
  }
  const db = readDb();
  if (db.users.some((u) => u.email === email)) return err("User already exists");
  const user = { _id: uid("u"), name, email, password };
  db.users.push(user);
  writeDb(db);
  return ok({ user: { _id: user._id, name, email } });
}

export async function getPosts(page = 1, limit = 5) {
  const db = readDb();
  const start = (page - 1) * limit;
  const items = db.posts.slice().reverse().slice(start, start + limit);
  return ok({ posts: items });
}

export async function addPost(content) {
  if (!content || !content.trim()) return err("Post content is required");
  const db = readDb();
  // For demo, attribute to demo user
  const author = db.users[0];
  const post = {
    _id: uid("p"),
    content: content.trim(),
    user: { _id: author._id, name: author.name },
    createdAt: nowIso(),
    likes: [],
    comments: [],
  };
  db.posts.push(post);
  writeDb(db);
  // match app expectation: data.posts is a single post object
  return ok({ posts: post });
}

export async function createComment(content, postId) {
  if (!content || !content.trim()) return err("Comment content is required");
  const db = readDb();
  const post = db.posts.find((p) => p._id === postId);
  if (!post) return err("Post not found");
  const author = db.users[0];
  const comment = {
    _id: uid("c"),
    content: content.trim(),
    user: { _id: author._id, name: author.name },
    createdAt: nowIso(),
  };
  post.comments.push(comment);
  writeDb(db);
  return ok({ comment });
}

export async function toggleLike(itemId, itemType) {
  const db = readDb();
  const actorId = db.users[0]._id;
  let arr;
  if (itemType === "Post") {
    const post = db.posts.find((p) => p._id === itemId);
    if (!post) return err("Post not found");
    arr = post.likes;
  } else {
    // Not implementing comment likes in mock; treat as success
    return ok({ deleted: false });
  }
  const idx = arr.indexOf(actorId);
  if (idx >= 0) {
    arr.splice(idx, 1);
    writeDb(db);
    return ok({ deleted: true });
  }
  arr.push(actorId);
  writeDb(db);
  return ok({ deleted: false });
}

export async function fetchUserProfile(userId) {
  const db = readDb();
  const user = db.users.find((u) => u._id === userId);
  if (!user) return err("User not found");
  return ok({ user: { _id: user._id, name: user.name, email: user.email } });
}

export async function fetchUserFriends() {
  const db = readDb();
  // For demo, treat first user as current
  const me = db.users[0];
  const friends = db.friendships
    .filter((f) => f.from_user === me._id)
    .map((f) => {
      const to = db.users.find((u) => u._id === f.to_user) || { _id: f.to_user, email: "unknown@example.com" };
      return { _id: f._id, to_user: { _id: to._id, email: to.email } };
    });
  return ok({ friends });
}

export async function addFriend(userId) {
  const db = readDb();
  const me = db.users[0];
  const target = db.users.find((u) => u._id === userId);
  if (!target) return err("User not found");
  if (db.friendships.some((f) => f.from_user === me._id && f.to_user === target._id)) {
    return err("Already friends");
  }
  const friendship = { _id: uid("f"), from_user: me._id, to_user: target._id };
  db.friendships.push(friendship);
  writeDb(db);
  return ok({ friendship: { _id: friendship._id, to_user: { _id: target._id, email: target.email } } });
}

export async function removeFriend(userId) {
  const db = readDb();
  const me = db.users[0];
  const before = db.friendships.length;
  db.friendships = db.friendships.filter((f) => !(f.from_user === me._id && f.to_user === userId));
  writeDb(db);
  if (db.friendships.length === before) return err("Friendship not found");
  return ok({ removed: true });
}

export async function editProfile(userId, name, password, confirmPassword) {
  if (!name || !password || password !== confirmPassword) return err("Invalid profile details");
  const db = readDb();
  const user = db.users.find((u) => u._id === userId);
  if (!user) return err("User not found");
  user.name = name;
  user.password = password;
  writeDb(db);
  const token = createUnsignedJwt({ _id: user._id, name: user.name, email: user.email });
  return ok({ user: { _id: user._id, name: user.name, email: user.email }, token });
}

export async function searchUsers(text) {
  const db = readDb();
  const q = (text || "").toLowerCase();
  const users = db.users
    .filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    .slice(0, 10)
    .map((u) => ({ _id: u._id, name: u.name, email: u.email }));
  return ok({ users });
}
