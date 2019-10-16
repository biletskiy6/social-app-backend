const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require("./utils/fbAuth");

const { getAllPosts, addPost } = require("./handlers/posts");
const { signup, login, uploadImage } = require("./handlers/users");

app.get("/posts", getAllPosts);
app.post("/post", FBAuth, addPost);

app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
exports.api = functions.region("europe-west1").https.onRequest(app);
