// This is basically a fork of https://github.com/mapbox/rehype-prism
// but it allows us to register more than just the default supported languages
// Props to this guy for figuring out the tricks:
// https://codedaily.io/tutorials/76/Markdown-Syntax-Highlighting-with-PrismJS-using-Unified-Remark-and-Rehype

const visit = require("unist-util-visit");
const nodeToString = require("hast-util-to-string");

const refractor = require("refractor/core");

const bash = require("refractor/lang/bash");
const diff = require("refractor/lang/diff");
const docker = require("refractor/lang/docker");
const ini = require("refractor/lang/ini");
const javascript = require("refractor/lang/javascript");
const json = require("refractor/lang/json");
const makefile = require("refractor/lang/makefile");
const plsql = require("refractor/lang/plsql");
const python = require("refractor/lang/python");
const shell_session = require("refractor/lang/shell-session");
const sql = require("refractor/lang/sql");
const yaml = require("refractor/lang/yaml");

const splitfile = require("@splitgraph/lib/splitfileLang");

refractor.register(bash);
refractor.register(diff);
refractor.register(docker);
refractor.register(ini);
refractor.register(javascript);
refractor.register(json);
refractor.register(makefile);
refractor.register(plsql);
refractor.register(python);
refractor.register(shell_session);
refractor.register(sql);
refractor.register(yaml);

// Note: splitfile language must be registered last, or there will be build errors
// Please, pay no attention to the man behind the curtain...
refractor.register(splitfile);

const getLanguage = (node) => {
  const className = node.properties.className || [];
  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === "language-") {
      return classListItem.slice(9).toLowerCase();
    }
  }
  return null;
};
const rehypePrism = (options) => {
  options = options || {};
  return (tree) => {
    visit(tree, "element", visitor);
  };
  function visitor(node, index, parent) {
    if (!parent || parent.tagName !== "pre" || node.tagName !== "code") {
      return;
    }
    const lang = getLanguage(node);
    if (lang === null) {
      return;
    }
    let result;
    try {
      parent.properties.className = (parent.properties.className || []).concat(
        "language-" + lang
      );
      result = refractor.highlight(nodeToString(node), lang);
    } catch (err) {
      if (options.ignoreMissing && /Unknown language/.test(err.message)) {
        return;
      }
      throw err;
    }
    node.children = result;
  }
};

module.exports = rehypePrism;
