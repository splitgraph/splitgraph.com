const TSCONFIG_PATH = require("path").join(
  __dirname,
  "..",
  process.env.TSCONFIG_PATH ?? `tsconfig.json`
);

console.log("TSCONFIG_PATH:", TSCONFIG_PATH);

module.exports = {
  core: {
    builder: "webpack5",
  },
  // https://storybook.js.org/docs/react/configure/typescript
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",

    // https://github.com/hipstersmoothie/react-docgen-typescript-plugin
    // https://github.com/styleguidist/react-docgen-typescript#parseroptions
    // https://github.com/hipstersmoothie/react-docgen-typescript-plugin#debugging
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  reactOptions: {
    fastRefresh: true,
  },
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-designs",
  ],
};
