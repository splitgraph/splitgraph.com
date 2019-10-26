// Our modules are managed by yarn workspaces
const ourModules = [
  "@splitgraph/design",
  "@splitgraph/content",
  "@splitgraph/templaters"
];

// Enumerate every dependency with an "es" or "es6" module available
// TODO: Make this programmatic (as in, with javascript, not shell)
// find node_modules -type d -name es -o -name es6

// Note that they *all* need to be enumerated and marked for transpilation,
// even if we are not importing from them directly. If one es module imports
// from the es module of a peer dependency, then both those modules must
// be transpiled. e.g., antd/es depends on most of the rc-*/es modules.
// So it's easier to enumerate all of them ahead of time.

// Keep this up to date with package.json

const es6modules = [];

const transpileModulesConfig = {
  transpileModules: [...es6modules, ...ourModules]
};

module.exports = transpileModulesConfig;
