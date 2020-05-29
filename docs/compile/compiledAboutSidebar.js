const preval = require("babel-plugin-preval/macro");

const ABOUT_SIDEBAR = preval`
  const sidebar = require("./compileAboutSidebar");
  module.exports = sidebar;
`;

module.exports = ABOUT_SIDEBAR;
