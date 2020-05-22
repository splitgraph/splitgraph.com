const { addHook: overrideRequire } = require("pirates");
const { transform: babelTransform } = require("@babel/core");
const { flattenTree } = require("@splitgraph/lib/tree");

// We need Babel to be able to parse the .mdx so we can extract the exported metadata
// Note we are not actually using the parsed mdx component here, as we are only
// interested in the metadata, so it's mostly just important that babel can
// parse the file, as opposed to having parity of transformation with webpack mdx.
// Cleverness from https://github.com/mdx-js/mdx/issues/171#issuecomment-409792001
const transform = (code) => {
  // TODO: Less hacky code, RIP
  // let jsxWithMDXTags = mdxTransform(code);
  // let jsx = `
  //   ${jsxWithMDXTags}
  // `;

  // Absolutely ridiculous hack:
  // Babel does not have the full rehype toolchain, and it is unable to fully
  // parse the file. Trying to run mdxTransform(code) on a file that includes
  // HTML, like from sphinx, will result in an error.
  //
  // Fixing this is a non-trivial problem. But we can sidestep it,
  // because we only want to import the metadata from each file, in order to
  // build the sidebar. So we use a regex to extract only the code from the
  // file that is matching a meta export.
  //
  // This is a hack because a regex is unlikely to be the best way to match
  // exports, and is already failing on at least two files. However, it's a
  // decent hack so long as errors are made obvious (which they currently are,
  // by setting metadata title to "Error") and the regex can be finetuned.

  // There is a more complex regex that will match all

  // Note: This will not match nested JSON objects
  // There is a more complex regex which works 100% here: https://stackoverflow.com/a/60556735/3793499
  // ...but unfortunately it does not work in JS, which does not support lookbehinds.
  const exportRegex = /export const meta = \{\s?[A-za-z0-9:"\s\.-_\,\-\+]+}\;?/gm;

  let exportMatch = exportRegex.exec(code);

  let metaExport = "";

  if (exportMatch && exportMatch.length > 0) {
    metaExport = exportMatch[0];
  } else {
    console.warn("Could not extract metadata");

    metaExport = `export const meta = {title: "error", id: "error"};`;
  }

  let result = babelTransform(metaExport, {
    filename: "something.js",
    plugins: ["babel-plugin-react-require"],
    presets: ["@babel/react", "@babel/preset-env"],
  });

  return result.code;
};

overrideRequire(transform, { exts: [".mdx"] });

const ContentTree = require("./ContentTree");

const navItemData = (item) => ({
  url: !!item.url && typeof item.url === "string" ? item.url : undefined,
  title: item.metadata && item.metadata.title ? item.metadata.title : item.slug,
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
        nav: item.nav,
      }
    : {};

const navData = (item, parent, flatTree) => {
  const flatItemIndex = flatTree.findIndex(
    (node) => node.nodeId === item.nodeId
  );

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

        right: hasNext ? navItemData(nextItem) : undefined,
      }
    : {};
};

// This is not very efficient, but it only runs at build time
const compileContentTree = ({
  contentDir,
  urlPrefix,
  map = () => ({}),
  sort = null,
}) => {
  const contentTree = new ContentTree(contentDir, {
    importMdxMetadata: true,
    urlPrefix,
  }).init();

  const flatTree = flattenTree({
    root: contentTree.map(itemData),
    filter: (node) => !!node && !node.isSection,
  });

  const unsorted = contentTree.map((item, parent, depth) => {
    return {
      ...itemData(item, parent),
      ...navData(itemData(item, parent), parent, flatTree),
      ...map({ item, parent, depth, flatTree }),
    };
  });

  if (!sort) {
    return unsorted;
  }

  return new ContentTree(contentTree.rootPath, { tree: unsorted })
    .init()
    .sort(sort);
};

module.exports = compileContentTree;
