/**
 * disclaimer:
 *
 * THIS PLUGIN IS A F*CKING BIG HACK.
 *
 * don't even try to reason about the quality of the following lines of code.
 */

const path = require("path");
const process = require("process");

const enhancedResolve = require("enhanced-resolve");
const escalade = require("escalade/sync");

// Use me when needed
// const util = require('util');
// const inspect = (object) => {
//   console.log(util.inspect(object, { showHidden: false, depth: null }));
// };

const CWD = process.cwd();

/**
 * Our own Node.js resolver that can ignore symlinks resolution and  can support
 * PnP
 */
const resolve = enhancedResolve.create.sync({
  symlinks: false,
  extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs", ".css", ".scss", ".sass"],
  mainFields: ["main", "module", "source"],
  // Is it right? https://github.com/webpack/enhanced-resolve/issues/283#issuecomment-775162497
  conditionNames: ["require"],
});

/**
 * Check if two regexes are equal
 * Stolen from https://stackoverflow.com/questions/10776600/testing-for-equality-of-regular-expressions
 *
 * @param {RegExp} x
 * @param {RegExp} y
 * @returns {boolean}
 */
const regexEqual = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  );
};

/**
 * Return the root path (package.json directory) of a given module
 * @param {string} module
 * @returns {string}
 */
const getPackageRootDirectory = (module) => {
  let packageDirectory;
  let packageRootDirectory;

  try {
    // Get the module path
    packageDirectory = resolve(CWD, module);

    if (!packageDirectory) {
      throw new Error(
        `next-transpile-modules - could not resolve module "${module}". Are you sure the name of the module you are trying to transpile is correct?`
      );
    }

    // Get the location of its package.json
    const pkgPath = escalade(packageDirectory, (dir, names) => {
      if (names.includes("package.json")) {
        return "package.json";
      }
      return false;
    });
    if (pkgPath == null) {
      throw new Error(
        `next-transpile-modules - an error happened when trying to get the root directory of "${module}". Is it missing a package.json?\n${err}`
      );
    }
    packageRootDirectory = path.dirname(pkgPath);
  } catch (err) {
    throw new Error(
      `next-transpile-modules - an unexpected error happened when trying to resolve "${module}"\n${err}`
    );
  }

  return packageRootDirectory;
};

/**
 * Resolve modules to their real paths
 * @param {string[]} modules
 * @returns {string[]}
 */
const generateModulesPaths = (modules) => {
  const packagesPaths = modules.map(getPackageRootDirectory);

  return packagesPaths;
};

/**
 * Logger for the debug mode
 * @param {boolean} enable enable the logger or not
 * @returns {(message: string, force: boolean) => void}
 */
const createLogger = (enable) => {
  return (message, force) => {
    if (enable || force) console.info(`next-transpile-modules - ${message}`);
  };
};

/**
 * Matcher function for webpack to decide which modules to transpile
 * @param {string[]} modulesToTranspile
 * @param {function} logger
 * @returns {(path: string) => boolean}
 */
const createWebpackMatcher = (
  modulesToTranspile,
  logger = createLogger(false)
) => {
  return (filePath) => {
    const isNestedNodeModules =
      (filePath.match(/node_modules/g) || []).length > 1;

    if (isNestedNodeModules) {
      return false;
    }

    return modulesToTranspile.some((modulePath) => {
      const transpiled = filePath.startsWith(modulePath);
      if (transpiled) logger(`transpiled: ${filePath}`);
      return transpiled;
    });
  };
};

const paths = generateModulesPaths(process.argv.slice(2));
console.log(paths);

// console.log(process.argv.slice(2));
