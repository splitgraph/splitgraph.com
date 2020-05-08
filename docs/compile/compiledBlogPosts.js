const preval = require("babel-plugin-preval/macro");

const POSTS = preval`
  const posts = require("./compileBlogPosts");
  module.exports = posts;
`;

module.exports = POSTS;
