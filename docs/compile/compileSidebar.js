const { addHook: overrideRequire } = require("pirates");
const { sync: mdxTransform } = require("@mdx-js/mdx");
const { transform: babelTransform } = require("babel-core");

const path = require("path");

const { flattenTree } = require("@splitgraph/lib/tree");

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
  url: !!item.url && typeof item.url === "string" ? item.url : undefined,
  title: item.metadata && item.metadata.title ? item.metadata.title : item.slug
});

const itemData = (item, parent) =>
  !!item
    ? {
        nodeId: item.nodeId,
        parentNodeId: parent ? parent.nodeId : undefined,
        depth: item.depth,
        url: item.navigable && item.url ? item.url.fromSiteRoot : undefined,
        slug: item.slug,
        metadata: item.metadata,
        isSection: item.isDirectory,
        nav: item.nav
      }
    : {};

const navData = (item, parent, flatTree) => {
  const flatItemIndex = flatTree.findIndex(node => node.nodeId === item.nodeId);

  const nextIndex =
    flatItemIndex >= 0 && flatItemIndex + 1 < flatTree.length
      ? flatItemIndex + 1
      : flatItemIndex >= 1
      ? 0
      : -1;
  const prevIndex =
    flatItemIndex >= 0 && flatItemIndex - 1 >= 0 && flatTree.length > 1
      ? flatItemIndex - 1
      : -1;

  const hasNext = nextIndex > -1;
  const hasPrev = prevIndex > -1;

  const prevItem = hasPrev ? flatTree[prevIndex] : {};
  const nextItem = hasNext ? flatTree[nextIndex] : {};

  return !!item
    ? {
        up:
          parent && (parent.url || parent.navigable)
            ? navItemData(parent)
            : undefined,
        left: hasPrev ? navItemData(prevItem) : undefined,

        right: hasNext ? navItemData(nextItem) : undefined
      }
    : {};
};

// This is not very efficient, but it only runs at build time
const compileSidebar = () => {
  const contentTree = new ContentTree(DOCS_DIR, {
    importMdxMetadata: true,
    urlPrefix: "/docs"
  }).init();

  const flatTree = flattenTree({
    root: contentTree.map(itemData),
    filter: node => !!node && !node.isSection
  });

  return contentTree.map((item, parent) => {
    return {
      ...itemData(item, parent),
      ...navData(itemData(item, parent), parent, flatTree)
    };
  });
};

const sidebar = compileSidebar();

module.exports = sidebar;
