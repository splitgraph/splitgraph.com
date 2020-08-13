const preval = require("babel-plugin-preval/macro");

const INSTRUCTIONS = preval`
  const { BASE_DIR, components } = require("./compileSqlClientInstructions.js");
  module.exports = { BASE_DIR, components };
`;

module.exports = INSTRUCTIONS;
