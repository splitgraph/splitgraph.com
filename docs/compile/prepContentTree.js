const path = require("path");
const ContentTree = require("./ContentTree");

const PAGES_DIR = path.resolve(
  path.join(path.dirname(require.resolve(__filename)), "../pages")
);

const prepContentTree = ({
  compiledContentTree,
  urlPrefix,
  templater,
  inputDir,
  outDir,
  rootOutDir = PAGES_DIR,
  writePage = ({ templater, item, contentTreeLocation }) => "",
}) => {
  const exportMap = {
    "/": {
      page: "/",
    },
  };
  const pagesToMake = [];

  new ContentTree(inputDir, {
    importMdxMetadata: false,
    urlPrefix,
    templater,
    onWalk: (item, parent) => {
      if (!item.navigable) {
        return;
      }

      const nextjsPagePath = path
        .join(outDir, `${item.url.fromSiteRoot}.js`)
        .replace(path.dirname(outDir), "");

      exportMap[item.url.fromSiteRoot] = {
        page: nextjsPagePath.replace(/\.js$/gm, ""),
      };

      const pathToSave = path.join(rootOutDir, nextjsPagePath);

      const contentTreeLocation = path.relative(
        path.dirname(pathToSave),
        compiledContentTree
      );

      pagesToMake.push({
        nextjsPagePath,
        page: pathToSave,
        source: writePage({ templater, item, contentTreeLocation }),
      });
    },
  }).init();

  return {
    pagesToMake,
    exportMap,
  };
};

module.exports = prepContentTree;
