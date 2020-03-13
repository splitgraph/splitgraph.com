const path = require('path');
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

  const hmrPath = '/__/storybook/__webpack_hmr';
  config.entry = config.entry.map(x =>
    x.includes('webpack-hot-middleware/client.js') ? `${x}&path=${hmrPath}` : x
  );

  if (!config.watchOptions) {
    config.watchOptions = {};
  }

  config.watchOptions.aggregateTimeout = 5000;

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = Object.assign(config.resolve.alias, {
    '@': path.resolve(__dirname, '..'),
  });
  return config;
};
