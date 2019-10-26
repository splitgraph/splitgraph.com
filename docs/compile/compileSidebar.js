const { addHook: overrideRequire } = require("pirates");
const { sync: mdxTransform } = require("@mdx-js/mdx");
const { transform: babelTransform } = require("babel-core");

const path = require("path");
const dirTree = require("directory-tree");

const CONTENT_DIR = path.dirname(require.resolve("@splitgraph/content"));
const DOCS_DIR = `${path.join(CONTENT_DIR, "docs")}`;

// We need Babel to be able to parse the .mdx so we can extract the exported metadata
// Note we are not actually using the parsed mdx component here, as we are only
// interested in the metadata, so it's mostly just important that babel can
// parse the file, as opposed to having parity of transformation with webpack mdx.
// Cleverness from https://github.com/mdx-js/mdx/issues/171#issuecomment-409792001
const transform = code => {
  let jsxWithMDXTags = mdxTransform(code);

  let jsx = `
    ${jsxWithMDXTags}
  `;

  let result = babelTransform(jsx, {
    plugins: ["babel-plugin-react-require"],
    presets: ["@babel/react", "@babel/preset-env"]
  });

  return result.code;
};

overrideRequire(transform, { exts: [".mdx"] });

const ContentTree = require("./ContentTree");

const compileSidebar = () => {
  const contentTree = new ContentTree(DOCS_DIR).init();

  return contentTree.map((item, parent) => {
    return {
      id: item.url ? item.url.fromSiteRoot : undefined,
      slug: item.slug,
      url: item.navigable && item.url ? item.url.fromSiteRoot : undefined,
      metadata: item.metadata,
      isSection: item.isDirectory
    };
  });
};

const sidebar = compileSidebar();

module.exports = sidebar;
