const path = require('path');
const process = require('process');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          reportFiles: ['stories/**/*.{ts|tsx}'],
        },
      },
    ],
  });

  // Set WEBPACK_HMR_CLIENT_PATH in order for HMR to work behind reverse proxy with subpath
  // e.g. '/__/storybook/__webpack_hmr'
  if (process.env.WEBPACK_HMR_CLIENT_PATH) {
    config.entry = config.entry.map(x =>
      x.includes('webpack-hot-middleware/client.js')
        ? `${x}&path=${process.env.WEBPACK_HMR_CLIENT_PATH}`
        : x
    );
  }

  if (!config.watchOptions) {
    config.watchOptions = {};
  }

  // There is an issue where webpack will attempt to import the compiled typescript
  // before typescript is finished compiling it. In this case, webpack will display
  // an error and will not recompile the errored code without a restart of storybook.
  // Therefore, the best option is to set this timeout to 5 seconds, which is
  // hopefully enough time to reload before the typescript is completed building.
  if (process.env.WEBPACK_HMR_AGGREGATE_TIMEOUT) {
    config.watchOptions.aggregateTimeout = parseInt(
      process.env.WEBPACK_HMR_AGGREGATE_TIMEOUT,
      10
    );
  }

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = Object.assign(config.resolve.alias, {
    '@': path.resolve(__dirname, '..'),
  });
  return config;
};
