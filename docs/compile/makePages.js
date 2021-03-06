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
const RSS_FEED = path.join(ROOT_DIR, "public", "feed.xml");
const PROXY_DIRECTORIES = path.join(ROOT_DIR, "proxyDirectories.txt");
const GET_LINK_TYPE = path.join(ROOT_DIR, "compile/compiledGetLinkType");
const prepContentTree = require("./prepContentTree");
const makeDefaultExportPathMap = require("./makeDefaultExportPathMap");
const generateRSS = require("./generateRSS");

const DOCS_DIR = `${path.join(CONTENT_DIR, "docs")}`;
const DOCS_CONTENT_TREE = path.join(ROOT_DIR, "compile/compiledDocsSidebar");
const prepDocsPages = () =>
  prepContentTree({
    compiledContentTree: DOCS_CONTENT_TREE,
    compiledGetLinkType: GET_LINK_TYPE,
    urlPrefix: "/docs",
    templater: "withDocsLayout",
    inputDir: DOCS_DIR,
    outDir: PAGES_OUT_DIR,
    rootOutDir: PAGES_DIR,
    writePage: ({ templater, item, contentTreeLocation }) => `
import { withRouter } from "next/router";
import ${templater} from "@splitgraph/templaters/layouts/${templater}";
import MdxPage, { meta } from "@splitgraph/content${item.path.fromSiteRoot}";
import contentTree from "${contentTreeLocation}";
export default withRouter(${templater}({ MdxPage, meta, contentTree }));
`,
  });

const PRODUCT_DIR = `${path.join(CONTENT_DIR, "product")}`;
const PRODUCT_CONTENT_TREE = path.join(
  ROOT_DIR,
  "compile/compiledProductSidebar"
);
const prepProductPages = () =>
  prepContentTree({
    compiledContentTree: PRODUCT_CONTENT_TREE,
    compiledGetLinkType: GET_LINK_TYPE,
    urlPrefix: "/product",
    templater: "withProductLayout",
    inputDir: PRODUCT_DIR,
    outDir: PAGES_OUT_DIR,
    rootOutDir: PAGES_DIR,
    writePage: ({ templater, item, contentTreeLocation }) => `
import { withRouter } from "next/router";
import ${templater} from "@splitgraph/templaters/layouts/${templater}";
import MdxPage, { meta } from "@splitgraph/content${item.path.fromSiteRoot}";
import contentTree from "${contentTreeLocation}";
export default withRouter(${templater}({ MdxPage, meta, contentTree }));
`,
  });

const ABOUT_DIR = `${path.join(CONTENT_DIR, "about")}`;
const ABOUT_CONTENT_TREE = path.join(ROOT_DIR, "compile/compiledAboutSidebar");
const prepAboutPages = () =>
  prepContentTree({
    compiledContentTree: ABOUT_CONTENT_TREE,
    compiledGetLinkType: GET_LINK_TYPE,
    urlPrefix: "/about",
    templater: "withAboutLayout",
    inputDir: ABOUT_DIR,
    outDir: PAGES_OUT_DIR,
    rootOutDir: PAGES_DIR,
    writePage: ({ templater, item, contentTreeLocation }) => `
import { withRouter } from "next/router";
import ${templater} from "@splitgraph/templaters/layouts/${templater}";
import MdxPage, { meta } from "@splitgraph/content${item.path.fromSiteRoot}";
import contentTree from "${contentTreeLocation}";
export default withRouter(${templater}({ MdxPage, meta, contentTree }));
`,
  });

const BLOG_DIR = `${path.join(CONTENT_DIR, "blog")}`;
const BLOG_CONTENT_TREE = path.join(ROOT_DIR, "compile/compiledBlogPosts");
const prepBlogPages = () =>
  prepContentTree({
    compiledContentTree: BLOG_CONTENT_TREE,
    compiledGetLinkType: GET_LINK_TYPE,
    urlPrefix: "/blog",
    templater: "withBlogLayout",
    inputDir: BLOG_DIR,
    outDir: PAGES_OUT_DIR,
    rootOutDir: PAGES_DIR,
    writePage: ({ templater, item, contentTreeLocation }) => {
      const slug = item.slug;

      return `
import { withRouter } from "next/router";
import ${templater} from "@splitgraph/templaters/layouts/${templater}";
import MdxPage, { meta } from "@splitgraph/content${item.path.fromSiteRoot}";
import contentTree from "${contentTreeLocation}";
const { flattenTree } = require("@splitgraph/lib/tree");

const matchingBlogPost =
        flattenTree({ root: contentTree }).find(
          ({ slug }) => slug === "${slug}"
        ) || {};

export default withRouter(${templater}({ MdxPage, meta, item: matchingBlogPost }));
`;
    },
  });

const ROOT_CONTENT_DIR = `${path.join(CONTENT_DIR, "root")}`;
const prepRootPages = () =>
  prepContentTree({
    compiledGetLinkType: GET_LINK_TYPE,
    urlPrefix: "/",
    templater: "withBasicLayout",
    inputDir: ROOT_CONTENT_DIR,
    outDir: PAGES_OUT_DIR,
    rootOutDir: PAGES_DIR,
    writePage: ({ templater, item }) => `
import { withRouter } from "next/router";
import ${templater} from "@splitgraph/templaters/layouts/${templater}";
import MdxPage, { meta } from "@splitgraph/content/root${item.path.fromSiteRoot}";
export default withRouter(${templater}({ MdxPage, meta }));
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

const writeRSSFeed = () => {
  console.log("Write RSS feed to", RSS_FEED);
  const posts = require("./compileBlogPosts");
  console.log("posts:", posts);
  const feed = generateRSS(posts);
  fs.writeFileSync(RSS_FEED, feed);
};

const getAutogeneratedTopLevelDirs = ({ exportMap }) => {
  const urls = Object.keys(exportMap);

  const staticBaseDirs = ["_next", "static"];

  const dirs = urls.reduce(
    (acc, url) =>
      url === "/" ? acc : Array.from(new Set([...acc, url.split("/")[1]])),
    staticBaseDirs
  );

  return dirs;
};

const writeProxyDirectoryFile = ({ exportMap }) => {
  console.log("Writing proxyDirectories regex:");

  const dirs = [...getAutogeneratedTopLevelDirs({ exportMap }), "feed\\.xml"];

  const dirRegex = dirs.join("|");

  console.log(dirRegex);

  fs.writeFileSync(PROXY_DIRECTORIES, dirRegex);
};

const prepPages = () => {
  const preppedDocsPages = prepDocsPages();
  const preppedProductPages = prepProductPages();
  const preppedBlogPages = prepBlogPages();
  const preppedRootPages = prepRootPages();
  const preppedAboutPages = prepAboutPages();

  const pagesToMake = [
    ...preppedDocsPages.pagesToMake,
    ...preppedProductPages.pagesToMake,
    ...preppedBlogPages.pagesToMake,
    ...preppedRootPages.pagesToMake,
    ...preppedAboutPages.pagesToMake,
  ];

  const exportMap = {
    ...preppedDocsPages.exportMap,
    ...preppedProductPages.exportMap,
    ...preppedBlogPages.exportMap,
    ...preppedRootPages.exportMap,
    ...preppedAboutPages.exportMap,
  };

  return { pagesToMake, exportMap };
};

const makeExportMap = () => {
  const { pagesToMake, exportMap } = prepPages();
  const defaultExportPathMap = makeDefaultExportPathMap({
    rootPagesDir: PAGES_DIR,
    ignoreTest: (page) =>
      page.startsWith("_content") ||
      page.match(/\[.*\]\.(js|ts)x?/) ||
      page === "_document.js" ||
      page === "_app.js",
  });

  const combinedExportMap = {
    ...defaultExportPathMap,
    ...exportMap,
  };

  return { pagesToMake, exportMap: combinedExportMap };
};

module.exports = {
  makeExportMap,
  getAutogeneratedTopLevelDirs,
  prepPages: () => {
    const { pagesToMake, exportMap } = prepPages();

    return { pagesToMake, exportMap };
  },
  makePages: () => {
    const { pagesToMake, exportMap } = makeExportMap();

    writePages({ pagesToMake });
    writeExportMap({ exportMap });
    writeRSSFeed();
    writeProxyDirectoryFile({ exportMap });
  },
  EXPORT_PATH_MAP,
};
