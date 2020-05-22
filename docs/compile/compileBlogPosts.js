const path = require("path");
const compileContentTree = require("./compileContentTree");
const dayjs = require("dayjs");

const CONTENT_DIR = path.dirname(require.resolve("@splitgraph/content"));
const DOCS_DIR = `${path.join(CONTENT_DIR, "blog")}`;

const mostRecentFirst = (a, b) =>
  dayjs(a.metadata.date).isBefore(dayjs(b.metadata.date)) ? 1 : -1;

const blogPosts = compileContentTree({
  contentDir: DOCS_DIR,
  urlPrefix: "/blog",
  sort: mostRecentFirst,
});

module.exports = blogPosts;
