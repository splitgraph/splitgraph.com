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
    this.opts = Object.assign({}, defaultOpts, opts);

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
    const contentTree = dirTree(
      this.rootPath,
      { extensions: /\.(md|mdx|json)$/ },
      item => {
        if (path.basename(item.path).endsWith(".meta.json")) {
          this.metaFiles.push(item.path);
        }
      }
    );

    this.tree = contentTree;

    return Promise.resolve(this);
  }

  enrich() {
    this.walk((item, parent, depth) => {
      let isMetaFile = item.name == "metadata.json";
      if (isMetaFile) {
        // let extlessName = item.name.replace("metadata.json", "");
        // let isDirMetaFile = parent && extlessName === parent.name;

        // if (isDirMetaFile) {
        // parent.metadata = require(item.path);
        // }

        parent.metadata = require(item.path);
        item.isMeta = true;

        return;
      }

      let isMdxFile = [".mdx", ".md"].includes(path.extname(item.path));
      if (isMdxFile && this.opts.importMdxMetadata) {
        // We can require the mdx file because we made babel transform it
        item.metadata = require(item.path).meta;
      }

      if (!isMdxFile && !item.type === "directory") {
        item.name = "blahblah";
        item = undefined;
        return;
      }

      item.depth = depth;
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

      item.slug = delexify(`/${item.name}`).replace("/", "");

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
    return ContentTree.walk({ root: this.tree, callback });
  }

  static walk({
    root,
    callback = (item, parent, depth) => {},
    parent,
    depth = 0
  }) {
    if (!root) {
      return;
    }

    root.children = root.children
      ? root.children.filter(c => !!c && Object.keys(c).length > 0 && !c.isMeta)
      : undefined;

    if (root.children) {
      root.children.forEach(node =>
        ContentTree.walk({
          root: node,
          callback: callback,
          parent: root,
          depth: depth + 1
        })
      );
    }

    return callback(root, parent, depth);
  }

  map(callback) {
    return ContentTree.map({ root: this.tree, callback });
  }

  static map({
    root,
    callback = (item, parent, depth) => {},
    parent,
    twin = {},
    depth = 0
  }) {
    if (!root) {
      return;
    }

    root.children = root.children
      ? root.children.filter(c => !!c && Object.keys(c).length > 0 && !c.isMeta)
      : undefined;

    if (root.children) {
      twin.children = [];
      for (let i = 0; i < root.children.length; i++) {
        let node = root.children[i];
        twin.children.push(
          ContentTree.map({
            root: node,
            callback: callback,
            parent: root,
            twin: twin.children[i],
            depth: depth + 1
          })
        );
      }
    }

    Object.assign(twin, callback(root, parent, depth));

    return twin;
  }
}

module.exports = ContentTree;
