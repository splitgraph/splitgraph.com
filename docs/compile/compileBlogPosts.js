const path = require("path");
const compileContentTree = require("./compileContentTree");

const CONTENT_DIR = path.dirname(require.resolve("@splitgraph/content"));
const DOCS_DIR = `${path.join(CONTENT_DIR, "blog")}`;

const blogPosts = compileContentTree({
  contentDir: DOCS_DIR,
  urlPrefix: "/blog",
});

module.exports = blogPosts;
