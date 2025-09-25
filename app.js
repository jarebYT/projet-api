const express = require('express');
const userRoute = require('./route/user.route');
const authRoute = require("./route/auth.route");
const commentRoute = require('./route/comment.route');
const postRoute = require('./route/post.route');
const path = require('path');
require('./model/index');
const app = express();

app.use(express.json());

// ROUTES
app.use('/images', express.static(path.join(__dirname, "images")));
app.use("/users", userRoute);
app.use('/auth', authRoute);
app.use('/comments', commentRoute);
app.use('/posts', postRoute);

module.exports = app;