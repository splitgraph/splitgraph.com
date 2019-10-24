const process = require("process");

const withPlugins = require("next-compose-plugins");

const aliasConfig = require("./plugins/aliasConfig");
const transpileModulesConfig = require("./plugins/transpileModulesConfig");

const DOCS_ENV = process.env.DOCS_ENV || "dev";

const CONFIG_FILE = process.env.CONFIG_FILE || `./config/${DOCS_ENV}.config.js`;

const VALID_ENVS = ["dev", "build", "staging"];

if (!VALID_ENVS.includes(DOCS_ENV)) {
  console.error("Fatal: Bad DOCS_ENV");
  process.exit(1);
}

const CONFIG = require(CONFIG_FILE);

// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf8")
// );

const nextConfig = {
  env: {
    ...CONFIG
  },
  resolve: {
    alias: aliasConfig
  }
};

const _configs = {
  serviceWorker: {},
  stats: {},
  pruneBloat: {},
  lessAntd: {},
  css: {},
  bundleAnalyzer: {
    enabled: process.env.ANALYZE === "true"
  },
  transpileModules: transpileModulesConfig,
  less: {
    lessLoaderOptions: {
      javascriptEnabled: true
      // modifyVars: themeVariables
    }
  }
};

const _plugins = {
  css: require("@zeit/next-css"),
  bundleAnalyzer: require("@next/bundle-analyzer"),
  transpileModules: require("next-transpile-modules")
};

const plugins = [
  [_plugins.transpileModules, _configs.transpileModules],
  [_plugins.css, _configs.css],
  [_plugins.bundleAnalyzer(_configs.bundleAnalyzer)]
];

module.exports = withPlugins(plugins, nextConfig);
