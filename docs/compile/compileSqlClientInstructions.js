const glob = require("glob");
const path = require("path");

const BASE_DIR = "@splitgraph/content/sql-client-instructions";

const mdxDirIdx = require.resolve(BASE_DIR);
const mdxDir = path.dirname(mdxDirIdx);
const fileWildcard = `${mdxDir}/*.mdx`;

const components = [];

glob.sync(fileWildcard).forEach(function (file) {
  const ComponentName = path.basename(file).replace(".mdx", "");

  components.push({
    ComponentName,
  });
});

module.exports = {
  BASE_DIR,
  components,
};
