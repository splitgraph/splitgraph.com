const path = require("path");
const dirTree = require("directory-tree");

const makeDefaultExportPathMap = ({
  rootPagesDir,
  ignoreTest = (item) => false,
}) => {
  const extensions = /\.(js|tsx|ts|jsx)$/;
  const exportPathMap = {};

  dirTree(rootPagesDir, { extensions }, (item) => {
    let rel = path.relative(rootPagesDir, item.path);

    let shouldIgnore = ignoreTest(rel);

    if (shouldIgnore) {
      return;
    }

    let filename = path.basename(item.path);
    let extlessFilename = filename.replace(extensions, "");
    let isIndex = extlessFilename === "index";

    let relDirname = path.dirname(rel);

    let pageDirname = relDirname === "." ? "" : relDirname;
    let urlDir = `/${pageDirname}`;
    let urlFile = isIndex ? "" : extlessFilename;

    let url = (page = path.join(urlDir, urlFile));

    exportPathMap[url] = {
      page,
    };
  });

  return exportPathMap;
};

module.exports = makeDefaultExportPathMap;
