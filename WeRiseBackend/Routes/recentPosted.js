const recentPost = require("express").Router();
const { getRecentPost } = require("../Queries/RecentPostQueries");

recentPost.get("/:id", getRecentPost);


module.exports = recentPost;
