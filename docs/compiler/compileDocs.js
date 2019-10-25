const fs = require("fs");
const path = require("path");

const dirTree = require("directory-tree");

const CONTENT_DIR = path.dirname(require.resolve("@splitgraph/content"));
const DOCS_DIR = `${path.join(CONTENT_DIR, "docs")}`;

class ContentTree {
  constructor(rootPath) {
    this.rootPath = rootPath;

    this.tree = {};

    this.metaFiles = [];
    this.mdxFiles = [];
    this.directories = [];

    this.nodes = [];
  }

  async init() {
    await this.build();
    await this.enrich();
    return this;
  }

  // Not actually async right now, but at some point if we have too many files
  // and builds are slow, we can change this without breaking the interface
  async build() {
    const contentTree = dirTree(this.rootPath, {}, item => {
      if (path.basename(item.path).endsWith(".meta.js")) {
        this.metaFiles.push(item.path);
      }
    });

    this.tree = contentTree;

    return Promise.resolve(this);
  }

  async enrich() {
    await this.walk(async (item, parent) => {
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
        item.metadata = require(item.path.system).meta;
      }
    });

    return this;
  }

  async walk(callback) {
    return await ContentTree.walk(this.tree, callback, null);
  }

  static async walk(
    root,
    callback = async (item, parent) => ({ item, parent }),
    parent
  ) {
    if (!root) {
      return Promise.resolve();
    }

    if (root.children) {
      await Promise.all(
        root.children.map(
          async node => await ContentTree.walk(node, callback, root)
        )
      );
    }

    return await callback(root, parent);
  }
}

const compileDocs = async () => {
  const contentTree = await new ContentTree(DOCS_DIR).init();

  console.log(JSON.stringify(contentTree.tree, null, 2));
};

compileDocs();
