const fs = require("fs");
const path = require("path");
const ContentTree = require("./ContentTree");

const CONTENT_DIR = path.dirname(require.resolve("@splitgraph/content"));
const DOCS_DIR = `${path.join(CONTENT_DIR, "docs")}`;

const PAGES_DIR = path.resolve(
  path.join(path.dirname(require.resolve(__filename)), "../pages")
);

const ROOT_DIR = path.resolve(path.join(PAGES_DIR, ".."));

const PAGES_OUT_DIR = path.join(PAGES_DIR, "_content");

const EXPORT_PATH_MAP = path.join(ROOT_DIR, "exports.json");

const prepDocsPages = () => {
  const templater = "withDocsLayout";

  const exportMap = {};
  const pagesToMake = [];

  new ContentTree(DOCS_DIR, {
    importMdxMetadata: false,
    urlPrefix: "/docs",
    templater,
    onWalk: (item, parent) => {
      if (!item.navigable) {
        return;
      }

      const nextjsPagePath = path
        .join(PAGES_OUT_DIR, `${item.url.fromSiteRoot}.js`)
        .replace(path.dirname(PAGES_OUT_DIR), "");

      exportMap[item.url.fromSiteRoot] = {
        page: nextjsPagePath.replace(/\.js$/gm, "")
      };

      pagesToMake.push({
        nextjsPagePath,
        page: path.join(PAGES_DIR, nextjsPagePath),
        source: `
import Link from "next/link";
import ${templater} from "@splitgraph/templaters/${templater}";
import MdxPage, { meta } from "@splitgraph/content${item.path.fromSiteRoot}";
export default ${templater}({MdxPage, meta, Link});
`
      });
    }
  }).init();

  return {
    pagesToMake,
    exportMap
  };
};

const writeDocsPages = ({ pagesToMake }) => {
  for (let { page, source } of pagesToMake) {
    let dirToMake = path.dirname(page);

    console.log("Make  dir:", dirToMake);
    fs.mkdirSync(dirToMake, { recursive: true });

    console.log("Make file:", page);
    fs.writeFileSync(page, source);
  }
};

const writeExportMap = ({ exportMap }) => {
  console.log("Write export map to:", exportMap);
  fs.writeFileSync(EXPORT_PATH_MAP, JSON.stringify(exportMap, null, 2));
};

module.exports = {
  prepPages: () => {
    const { pagesToMake, exportMap } = prepDocsPages();

    return { pagesToMake, exportMap };
  },
  makePages: () => {
    const { pagesToMake, exportMap } = prepDocsPages();

    writeDocsPages({ pagesToMake });
    writeExportMap({ exportMap });
  },
  EXPORT_PATH_MAP
};
