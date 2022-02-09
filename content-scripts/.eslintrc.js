/** @type {import("eslint").Linter.Config} */
module.exports = {
  rules: {
    // NOTE: this directory contains code that should run on Node
    // without transpilation, meaning we're stuck with `require` for now
    "@typescript-eslint/no-var-requires": "off",
  },
};
