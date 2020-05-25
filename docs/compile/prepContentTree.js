const path = require("path");
const ContentTree = require("./ContentTree");

const PAGES_DIR = path.resolve(
  path.join(path.dirname(require.resolve(__filename)), "../pages")
);

const prepContentTree = ({
  compiledContentTree,
  compiledGetLinkType,
  urlPrefix,
  templater,
  inputDir,
  outDir,
  rootOutDir = PAGES_DIR,
  writePage = ({ templater, item, contentTreeLocation, getLinkTypeLocation }) =>
    "",
}) => {
  const exportMap = {};
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

      const contentTreeLocation = compiledContentTree
        ? path.relative(path.dirname(pathToSave), compiledContentTree)
        : undefined;

      const getLinkTypeLocation = path.relative(
        path.dirname(pathToSave),
        compiledGetLinkType
      );

      pagesToMake.push({
        nextjsPagePath,
        page: pathToSave,
        source: writePage({
          templater,
          item,
          contentTreeLocation,
          getLinkTypeLocation,
        }),
      });
    },
  }).init();

  return {
    pagesToMake,
    exportMap,
  };
};

module.exports = prepContentTree;
