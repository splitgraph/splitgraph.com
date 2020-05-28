const path = require("path");
const compileContentTree = require("./compileContentTree");

const CONTENT_DIR = path.dirname(require.resolve("@splitgraph/content"));
const PRODUCT_DIR = `${path.join(CONTENT_DIR, "product")}`;

const sidebar = compileContentTree({
  contentDir: PRODUCT_DIR,
  urlPrefix: "/product",
});

module.exports = sidebar;
