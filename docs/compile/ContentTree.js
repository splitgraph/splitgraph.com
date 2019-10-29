const path = require("path");
const dirTree = require("directory-tree");

const { walkTree, mapTree } = require("@splitgraph/lib/tree");

const defaultOpts = {
  urlPrefix: "/",
  importMdxMetadata: true,
  onWalk: (item, parent) => {},
  onMap: (item, parent) => {}
};

// https://stackoverflow.com/a/7616484/3793499
const simpleStringHash = inputStr => {
  var hash = 0,
    i,
    chr;
  if (inputStr.length === 0) return hash;
  for (i = 0; i < inputStr.length; i++) {
    chr = inputStr.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
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
      item.nodeId = simpleStringHash(item.path);
      item.parentNodeId = parent.nodeId;
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
    return walkTree({ root: this.tree, callback });
  }

  map(callback) {
    return mapTree({ root: this.tree, callback });
  }
}

module.exports = ContentTree;
