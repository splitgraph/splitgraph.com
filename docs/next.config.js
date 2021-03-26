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
  experimental: {
    externalDir: true,
  },
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
  // resolve: {
  //   alias: aliasConfig,
  // },
  exportPathMap: async () => {
    try {
      const jsonMap = await fs.readFile(EXPORT_PATH_MAP);
      return JSON.parse(jsonMap);
    } catch (_) {
      console.warn("No exportPathMap found");
      return {};
    }
  },
};

const _configs = {
  transpileModules: transpileModulesConfig,
  css: {},
  mdx: {
    options: {
      remarkPlugins: [
        [require("remark-disable-tokenizers"), { block: ["indentedCode"] }],
        require("remark-sectionize"),
      ],
      rehypePlugins: [
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
  bundleAnalyzer: require("@next/bundle-analyzer"),
  mdx: require("@next/mdx")(_configs.mdx), // note slightly different call format
};

const plugins = [
  [_plugins.mdx],
  // [_plugins.withIgnoreFs, {}],
  // [_plugins.css, _configs.css],
  // [_plugins.bundleAnalyzer(_configs.bundleAnalyzer)],
];

// module.exports = nextConfig;

module.exports = withPlugins(plugins, nextConfig);
