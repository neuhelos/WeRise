const recentPost = require("express").Router();
const { getRecentPost } = require("../Queries/getRecentPostQueries");

recentPost.get("/", getRecentPost);


module.exports = recentPost;
