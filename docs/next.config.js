const process = require("process");

const withPlugins = require("next-compose-plugins");

const aliasConfig = require("./plugins/aliasConfig");
const transpileModulesConfig = require("./plugins/transpileModulesConfig");
const withIgnoreFs = require("./plugins/withIgnoreFs");

const { makePages, EXPORT_PATH_MAP } = require("./compile/makePages");

const { makeCasts, getCastManifest } = require("./compile/makeCasts");

const customizeTOC = require("./plugins/rehype-plugins/customizeTOC");

const injectAsciicasts = require("./plugins/rehype-plugins/injectAsciicasts");

const splitgraphRehypePrism = require("./plugins/rehype-plugins/splitgraphRehypePrism");

const fs = require("fs").promises;

makePages();

const { castManifest } = makeCasts();

// console.log("Casts:");

for (let castKey of Object.keys(castManifest)) {
  console.log("    ", castKey);
}

const nextConfig = {
  env: {
    // This is a build time config variable, but in practice, since we should
    // only have one website deployed accessible to search engines, that's okay.
    SEO_CANONICAL_BASE_URL:
      process.env.SEO_CANONICAL_BASE_URL || `https://www.splitgraph.com`,

    // This is a relative URL but is appended to window origin on load
    MATOMO_RELATIVE_URL: "/scripts/js",
    MATOMO_JS_FILE: "",
    MATOMO_PHP_FILE: "",
    MATOMO_SITE_ID: "1",

    DOCSEARCH_JS_URL:
      process.env.DOCSEARCH_JS_URL ||
      "https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js",
    DOCSEARCH_CSS_URL:
      process.env.DOCSEARCH_CSS_URL ||
      "https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css",
    DOCSEARCH_PUBLIC_CLIENT_API_KEY:
      process.env.DOCSEARCH_PUBLIC_CLIENT_API_KEY,
    DOCSEARCH_INDEX_NAME: process.env.DOCSEARCH_INDEX_NAME || "splitgraph",
  },
  resolve: {
    alias: aliasConfig,
  },
  // exportPathMap: async () => {
  //   const jsonMap = await fs.readFile(EXPORT_PATH_MAP);
  //   return JSON.parse(jsonMap);
  // },
};

const _configs = {
  transpileModules: transpileModulesConfig,
  css: {},
  mdx: {
    options: {
      mdPlugins: [
        [require("remark-disable-tokenizers"), { block: ["indentedCode"] }],
        require("remark-sectionize"),
      ],
      hastPlugins: [
        splitgraphRehypePrism,
        [injectAsciicasts, { castManifest }],
        require("rehype-slug"),
        [
          require("rehype-toc"),
          {
            customizeTOC,
          },
        ],
      ],
    },
  },
  bundleAnalyzer: {
    enabled: process.env.ANALYZE === "true",
  },
};

const _plugins = {
  css: require("@zeit/next-css"),
  bundleAnalyzer: require("@next/bundle-analyzer"),
  withIgnoreFs,
  mdx: require("@zeit/next-mdx")(_configs.mdx), // note slightly different call format
  transpileModules: require("next-transpile-modules")([
    transpileModulesConfig.transpileModules,
  ]),
};

const createWebpackMatcher = (
  modulesToTranspile,
  logger = createLogger(false)
) => {
  return (filePath) => {
    const isNestedNodeModules =
      (filePath.match(/node_modules/g) || []).length > 1;

    if (isNestedNodeModules) {
      if (filePath.includes("/splitgraph.com/")) {
        logger(`NESTED: ${filePath}`);
      }
      // console.log("nestedNodeModules:", filePath);
      return false;
    }

    return modulesToTranspile.some((modulePath) => {
      const transpiled = filePath.startsWith(modulePath);
      if (transpiled) {
        // logger(`transpiled: ${filePath}`);
      } else if (filePath.includes("/splitgraph.com/")) {
        logger(`not transpiled: ${filePath} does not match ${modulePath}`);
      }
      return transpiled;
    });
  };
};

const modulePaths = [
  "/src/js/splitgraph.com/design",
  "/src/js/splitgraph.com/tdesign",
  "/src/js/splitgraph.com/lib",
  "/src/js/splitgraph.com/content",
  // "@splitgraph/design",
  // "@splitgraph/tdesign",
  // "@splitgraph/lib",
  // "@splitgraph/content",
];

const withTM = require("next-transpile-modules")(
  [
    // ...modulePaths,
    // "../content",
    // "../content-scripts",
    // "../lib",
    // "../templaters",
    "@splitgraph/design",
    "../design",
    "@splitgraph/tdesign",
    "../tdesign",
    "@splitgraph/lib",
    "../lib",
    "@splitgraph/content",
    "../content",
    "@splitgraph/templaters",
    "../templaters",
    "@splitgraph/docs",
    // "@splitgraph",
    // "@splitgraph/content",
    // "@splitgraph/content-scripts",
    // "@splitgraph/lib",
    // "@splitgraph/tdesign",
    // "../tdesign",
    // "./hocs",
    // "@splitgraph/templaters",
  ],
  {
    // debug: true,
    // resolveSymlinks: true,
    // __unstable_matcher: createWebpackMatcher(modulePaths, (message) =>
    //   console.info(message)
    // ),
  }
);

const plugins = [
  withTM,
  [_plugins.mdx],
  [_plugins.withIgnoreFs, {}],
  [_plugins.css, _configs.css],
  [_plugins.bundleAnalyzer(_configs.bundleAnalyzer)],
];

module.exports = withPlugins(plugins, nextConfig);
