// Enumerate all top level dependencies that should be imported via
// their es6 library. Including a dependency here is required in order
// to be able to import from it via es6 without explicitly specifying
// the es6 directory (which can also cause problems, so best to avoid
// by enumerating here)

const ES6DependencyAliases = {};

module.exports = ES6DependencyAliases;
