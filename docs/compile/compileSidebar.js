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

const navItemData = item => ({
  url: item.navigable && item.url ? item.url.fromSiteRoot : undefined,
  title: item.metadata && item.metadata.title ? item.metadata.title : item.slug
});

const itemData = (item, includeNav) =>
  !!item
    ? {
        id: item.url ? item.url.fromSiteRoot : undefined,
        url: item.navigable && item.url ? item.url.fromSiteRoot : undefined,
        slug: item.slug,
        metadata: item.metadata,
        isSection: item.isDirectory,
        nav: item.nav
      }
    : {};

const navData = (item, parent) => {
  const myIndex = !parent ? 0 : parent.children.findIndex(i => i === item);
  const numSiblings = !parent ? 0 : parent.children.length - 1;

  return !!item
    ? {
        up:
          parent && (parent.url || parent.navigable)
            ? navItemData(parent)
            : undefined,
        left:
          myIndex > 0 && numSiblings > 0
            ? navItemData(
                parent.children.slice(0, myIndex).find(c => !!c && !c.isMeta),
                false
              )
            : undefined,

        right:
          myIndex < numSiblings && numSiblings > 0
            ? navItemData(
                parent.children.slice(myIndex + 1).find(c => !!c && !c.isMeta),
                false
              )
            : undefined
      }
    : {};
};

const compileSidebar = () => {
  const contentTree = new ContentTree(DOCS_DIR, {
    importMdxMetadata: true,
    urlPrefix: "/docs"
  }).init();

  return contentTree.map((item, parent) => {
    return {
      ...itemData(item),
      ...navData(item, parent)
    };
  });
};

const sidebar = compileSidebar();

module.exports = sidebar;
