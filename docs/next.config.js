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

console.log("Casts:");

for (let castKey of Object.keys(castManifest)) {
  console.log("    ", castKey);
}

const nextConfig = {
  env: {
    // This is a build time config variable, but in practice, since we should
    // only have one website deployed that is accessible to search engines,
    // that's okay. For testing purposes, use the staging URL right now.
    // TODO: Before launch, make sure to change to www.splitgraph.com
    SEO_CANONICAL_BASE_URL:
      process.env.SEO_CANONICAL_BASE_URL || `https://web.splitgraph.com`,
  },
  resolve: {
    alias: aliasConfig,
  },
  exportPathMap: async () => {
    const jsonMap = await fs.readFile(EXPORT_PATH_MAP);
    return JSON.parse(jsonMap);
  },
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
  transpileModules: require("next-transpile-modules"),
};

const plugins = [
  [_plugins.transpileModules, _configs.transpileModules],
  [_plugins.mdx],
  [_plugins.withIgnoreFs, {}],
  [_plugins.css, _configs.css],
  [_plugins.bundleAnalyzer(_configs.bundleAnalyzer)],
];

module.exports = withPlugins(plugins, nextConfig);
