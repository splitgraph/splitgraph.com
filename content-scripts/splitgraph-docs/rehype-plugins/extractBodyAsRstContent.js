const find = require("unist-util-find");

/*
  Change the body element to a <div.rst-content> element, so the page does not
  have two body elements, and so CSS can use .rst-content as a scoping mechanism.
*/
const extractBodyAsRstContent = () => (tree, file) => {
  const body = find(tree, node => node.tagName === "body");

  body.tagName = "div";

  if (!body.properties) {
    body.properties = {};
  }

  if (!body.properties.className) {
    body.properties.className = "";
  }

  body.properties.className = [body.properties.className, "rst-content"].join(
    " "
  );

  return body;
};

module.exports = extractBodyAsRstContent;
