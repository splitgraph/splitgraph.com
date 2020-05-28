const preval = require("babel-plugin-preval/macro");

const PRODUCT_SIDEBAR = preval`
  const sidebar = require("./compileProductSidebar");
  module.exports = sidebar;
`;

module.exports = PRODUCT_SIDEBAR;
