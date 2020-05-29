const path = require("path");
const compileContentTree = require("./compileContentTree");

const CONTENT_DIR = path.dirname(require.resolve("@splitgraph/content"));
const ABOUT_DIR = `${path.join(CONTENT_DIR, "about")}`;

const sidebar = compileContentTree({
  contentDir: ABOUT_DIR,
  urlPrefix: "/about",
});

module.exports = sidebar;
