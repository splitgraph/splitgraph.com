module.exports = {
  presets: [
    [
      "next/babel",
      {
        "@babel/plugin-transform-react-jsx": {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      },
    ],
  ],
  plugins: ["@emotion/babel-plugin", "preval", "macros"],
};

// module.exports = {
//   presets: ["next/babel"],
//   // presets: ["@emotion/babel-preset-css-prop"],
//   presets: [["@emotion/babel-preset-css-prop", { runtime: "automatic" }]],
//   plugins: ["preval", "macros"],
//   // plugins: ["preval", "macros", "@emotion"],
// };

// module.exports = {
//   presets: ["next/babel"],
//   plugins: ["preval", "macros"]
// };
