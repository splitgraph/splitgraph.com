const path = require("path");
const dirTree = require("directory-tree");

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

module.exports = ContentTree;
