const path = require("path");
const compileContentTree = require("./compileContentTree");

const CONTENT_DIR = path.dirname(require.resolve("@splitgraph/content"));
const DOCS_DIR = `${path.join(CONTENT_DIR, "docs")}`;

const sidebar = compileContentTree({
  contentDir: DOCS_DIR,
  urlPrefix: "/docs",
});

module.exports = sidebar;
