/** @type {import('eslint').Linter.Config} */
module.exports = {
  // NOTE: this disables ESLint in the docs directory
  // The directory will be deleted soon™ so we don't care
  // about the code quality here.
  ignorePatterns: ["**/*"],
};
