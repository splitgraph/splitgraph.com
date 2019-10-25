module.exports = (nextConfig, {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.node = {
        fs: "empty",
        module: "empty"
      };

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};
