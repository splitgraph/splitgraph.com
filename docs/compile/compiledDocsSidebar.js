const preval = require("babel-plugin-preval/macro");

const DOCS = preval`
  const sidebar = require("./compileDocsSidebar");
  module.exports = sidebar;
`;

module.exports = DOCS;
