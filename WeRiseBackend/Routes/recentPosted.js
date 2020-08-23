const recentPost = require("express").Router();
const { getRecentPost } = require("../Queries/RecentPostQueries");

recentPost.get("/", getRecentPost);


module.exports = recentPost;
