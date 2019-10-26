const path = require("path");
const url = require("url");
const dirTree = require("directory-tree");

const defaultOpts = {
  urlPrefix: "/",
  importMdxMetadata: true,
  onWalk: (item, parent) => {},
  onMap: (item, parent) => {}
};

class ContentTree {
  constructor(rootPath, opts) {
    this.rootPath = rootPath;
    this.opts = Object.assign(defaultOpts, opts);

    this.tree = {};

    this.metaFiles = [];
    this.mdxFiles = [];
    this.directories = [];

    this.nodes = [];

    this.pathTreeMap = {};
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
      let isMetaFile = item.name.endsWith(".meta.js");
      if (isMetaFile) {
        let extlessName = item.name.replace(".meta.js", "");
        let isDirMetaFile = parent && extlessName === parent.name;

        if (isDirMetaFile) {
          parent.metadata = require(item.path);
        }

        return;
      }

      let isMdxFile = [".mdx", ".md"].includes(path.extname(item.path));
      if (isMdxFile && this.opts.importMdxMetadata) {
        // We can require the mdx file because we made babel transform it
        item.metadata = require(item.path).meta;
      } else if (!isMdxFile) {
        return;
      }

      let isRoot = !parent;

      let fromContentRoot = isRoot ? "/" : item.path.replace(this.rootPath, "");
      item.path = {
        system: item.path,
        fromContentRoot,
        fromSiteRoot: path.join(this.opts.urlPrefix, fromContentRoot)
      };

      // Remove the lexiographical sort 0100, 0200 and the .mdx extension
      const LEXICAL_JUNK = /\/\d{1,5}\_|\.mdx?$/gm;
      const delexify = s => s.replace(LEXICAL_JUNK, "/").replace(/\/$/, "");

      item.slug = delexify(item.path.fromContentRoot);

      item.url = {
        fromContentRoot: delexify(item.path.fromContentRoot),
        fromSiteRoot: delexify(item.path.fromSiteRoot)
      };

      item.isDirectory = item.type === "directory";
      item.navigable = !item.isDirectory;

      this.nodes.push(item);

      if (item.type === "directory") {
        this.directories.push(item);
      } else {
        this.mdxFiles.push(item);
      }

      this.opts.onWalk(item, parent);
    });

    return this;
  }

  walk(callback) {
    return ContentTree.walk(this.tree, callback, null);
  }

  static walk(root, callback = (item, parent) => {}, parent) {
    if (!root) {
      return;
    }

    if (root.children) {
      root.children.forEach(node => ContentTree.walk(node, callback, root));
    }

    return callback(root, parent);
  }

  map(callback) {
    return ContentTree.map(this.tree, callback, null, {});
  }

  static map(root, callback = (item, parent) => {}, parent, twin = {}) {
    if (!root) {
      return;
    }

    if (root.children) {
      twin.children = [];
      for (let i = 0; i < root.children.length; i++) {
        let node = root.children[i];
        twin.children.push(
          ContentTree.map(node, callback, root, twin.children[i])
        );
      }
    }

    Object.assign(twin, callback(root, parent));

    return twin;
  }
}

module.exports = ContentTree;
