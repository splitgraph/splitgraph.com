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

class ContentTree {
  constructor(rootPath) {
    this.rootPath = rootPath;

    this.tree = {};

    this.metaFiles = [];
    this.mdxFiles = [];
    this.directories = [];

    this.nodes = [];
  }

  init() {
    this.build();
    this.enrich();
    return this;
  }

  // Not actually right now, but at some point if we have too many files
  // and builds are slow, we can change this without breaking the interface
  build() {
    const contentTree = dirTree(this.rootPath, {}, item => {
      if (path.basename(item.path).endsWith(".meta.js")) {
        this.metaFiles.push(item.path);
      }
    });

    this.tree = contentTree;

    return Promise.resolve(this);
  }

  enrich() {
    this.walk((item, parent) => {
      item.path = {
        system: item.path,
        siteRoot: item.path.replace(this.rootPath, "")
      };

      let isMetaFile = item.name.endsWith(".meta.js");
      let isDirMetaFile =
        isMetaFile && item.name.replace(".meta.js", "") === parent.name;

      if (isDirMetaFile) {
        parent.metadata = require(item.path.system);
      }

      let isMdxFile = [".mdx", ".md"].includes(path.extname(item.path.system));

      if (isMdxFile) {
        // We can require the mdx file because we made babel transform it
        item.metadata = require(item.path.system).meta;
      }
    });

    return this;
  }

  walk(callback) {
    return ContentTree.walk(this.tree, callback, null);
  }

  static walk(root, callback = (item, parent) => ({ item, parent }), parent) {
    if (!root) {
      return Promise.resolve();
    }

    if (root.children) {
      Promise.all(
        root.children.map(node => ContentTree.walk(node, callback, root))
      );
    }

    return callback(root, parent);
  }
}

const compileDocs = () => {
  const contentTree = new ContentTree(DOCS_DIR).init();

  return contentTree;
};

const docs = compileDocs().tree;

module.exports = docs;
