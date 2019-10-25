const preval = require("babel-plugin-preval/macro");

const docs = preval`
  const compiled = require("./compileDocs");
  module.exports = compiled;
  //module.exports = require("./compileDocs");
`;

module.exports = docs;
