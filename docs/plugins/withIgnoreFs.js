module.exports = (nextConfig, {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.node = {
        fs: "empty",
        module: "empty",
      };

      if (options.isServer && !options.dev) {
        const originalEntry = config.entry;
        config.entry = async () => {
          const entries = { ...(await originalEntry()) };
          // This script imports components from the Next app, so it's transpiled to `.next/server/scripts/build-rss.js`

          console.log("Entries:", entries);
          // entries["static/YhOKswmYGMYUm7dlcAoly/pages/index.js"] = "./posts/2.js";
          return entries;
        };
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
