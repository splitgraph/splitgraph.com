const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf").sync;

const CONTENT_DIR = path.dirname(require.resolve("@splitgraph/content"));

const PAGES_DIR = path.resolve(
  path.join(path.dirname(require.resolve(__filename)), "../pages")
);
const ROOT_DIR = path.resolve(path.join(PAGES_DIR, ".."));
const PAGES_OUT_DIR = path.join(PAGES_DIR, "_content");
const EXPORT_PATH_MAP = path.join(ROOT_DIR, "exports.json");
const PROXY_DIRECTORIES = path.join(ROOT_DIR, "proxyDirectories.txt");
const CONTENT_TREE = path.join(ROOT_DIR, "compile/compiledSidebar");

const prepContentTree = require("./prepContentTree");
const makeDefaultExportPathMap = require("./makeDefaultExportPathMap");

const DOCS_DIR = `${path.join(CONTENT_DIR, "docs")}`;
const prepDocsPages = () =>
  prepContentTree({
    compiledContentTree: CONTENT_TREE,
    urlPrefix: "/docs",
    templater: "withDocsLayout",
    inputDir: DOCS_DIR,
    outDir: PAGES_OUT_DIR,
    rootOutDir: PAGES_DIR,
    writePage: ({ templater, item, contentTreeLocation }) => `
import Link from "next/link";
import { withRouter } from "next/router";
import ${templater} from "@splitgraph/templaters/${templater}";
import MdxPage, { meta } from "@splitgraph/content${item.path.fromSiteRoot}";
import contentTree from "${contentTreeLocation}";
export default withRouter(${templater}({ MdxPage, meta, contentTree, Link }));
`,
  });

const BLOG_DIR = `${path.join(CONTENT_DIR, "blog")}`;
const prepBlogPages = () =>
  prepContentTree({
    compiledContentTree: CONTENT_TREE,
    urlPrefix: "/blog",
    templater: "withBlogLayout",
    inputDir: BLOG_DIR,
    outDir: PAGES_OUT_DIR,
    rootOutDir: PAGES_DIR,
    writePage: ({ templater, item, contentTreeLocation }) => `
import Link from "next/link";
import { withRouter } from "next/router";
import ${templater} from "@splitgraph/templaters/${templater}";
import MdxPage, { meta } from "@splitgraph/content${item.path.fromSiteRoot}";
import contentTree from "${contentTreeLocation}";
export default withRouter(${templater}({ MdxPage, meta, contentTree, Link }));
`,
  });

const writePages = ({ pagesToMake }) => {
  console.log("Bake content...");
  rimraf(PAGES_OUT_DIR);

  for (let { page, source } of pagesToMake) {
    let dirToMake = path.dirname(page);

    fs.mkdirSync(dirToMake, { recursive: true });
    fs.writeFileSync(page, source);
  }
};

const writeExportMap = ({ exportMap }) => {
  console.log("Done baking content. Export map:", exportMap);
  fs.writeFileSync(EXPORT_PATH_MAP, JSON.stringify(exportMap, null, 2));
};

const writeProxyDirectoryFile = ({ exportMap }) => {
  console.log("Writing proxyDirectories regex:");

  const urls = Object.keys(exportMap);

  const staticBaseDirs = ["_next", "static"];

  const dirs = urls.reduce(
    (acc, url) =>
      url === "/" ? acc : Array.from(new Set([...acc, url.split("/")[1]])),
    staticBaseDirs
  );

  const dirRegex = dirs.join("|");

  console.log(dirRegex);

  fs.writeFileSync(PROXY_DIRECTORIES, dirRegex);
};

const prepPages = () => {
  const preppedDocsPages = prepDocsPages();
  const preppedBlogPages = prepBlogPages();

  const pagesToMake = [
    ...preppedDocsPages.pagesToMake,
    ...preppedBlogPages.pagesToMake,
  ];

  const exportMap = {
    ...preppedDocsPages.exportMap,
    ...preppedBlogPages.exportMap,
  };

  return { pagesToMake, exportMap };
};

module.exports = {
  prepPages: () => {
    const { pagesToMake, exportMap } = prepPages();

    return { pagesToMake, exportMap };
  },
  makePages: () => {
    const { pagesToMake, exportMap } = prepPages();
    const defaultExportPathMap = makeDefaultExportPathMap({
      rootPagesDir: PAGES_DIR,
      ignoreTest: (page) =>
        page.startsWith("_content") || page === "_document" || page === "_app",
    });

    const combinedExportMap = {
      ...defaultExportPathMap,
      ...exportMap,
    };

    writePages({ pagesToMake });
    writeExportMap({
      exportMap: combinedExportMap,
    });
    writeProxyDirectoryFile({ exportMap: combinedExportMap });
  },
  EXPORT_PATH_MAP,
};
