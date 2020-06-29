const preval = require("babel-plugin-preval/macro");

const FEED = preval`
  const posts = require("./compileBlogPosts");
  const generateRSS = require("./generateRSS);
  const feed = generateRSS(posts);

  module.exports = feed;
`;

module.exports = FEED;
