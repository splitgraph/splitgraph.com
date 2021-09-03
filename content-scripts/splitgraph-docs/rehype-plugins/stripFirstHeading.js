const find = require("unist-util-find");
const remove = require("unist-util-remove");

const stripFirstHeading = () => (tree, file) => {
  const firstHeading = find(
    tree,
    (node) => node.type === "element" && node.tagName === "h1"
  );

  if (!firstHeading) {
    return tree;
  }

  return remove(tree, (node) => node === firstHeading);
};

module.exports = stripFirstHeading;
