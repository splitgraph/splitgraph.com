const find = require("unist-util-find");
const findAllAfter = require("unist-util-find-all-after");
const remove = require("unist-util-remove");

/*
  Sphinx sets "submodules" to h2, but every submodule is also "h2", so
  by default the TOC generator thinks they are the same depth
  So, customize the TOC by moving all nodes after submodule to below it

  Specifically:
    Make a new <ol> element, insert it as a child on the Submodules <li> element

  Note this is before we've stripped the ¶ characters
*/

const customizeTOC = (tocTree) => {
  const submodulesItem = find(
    tocTree,
    (node) =>
      node.type === "element" &&
      node.tagName === "li" &&
      find(node, (c) => c.value && c.value === "Submodules¶")
  );

  if (!submodulesItem) {
    return tocTree;
  }

  const rootList = find(
    tocTree,
    (node) => node.type === "element" && node.tagName === "ol"
  );

  const itemsToMove = findAllAfter(
    rootList,
    submodulesItem,
    (node) => node.type === "element" && node.tagName === "li"
  );

  const nextTree = remove(tocTree, (node) => itemsToMove.includes(node));

  submodulesItem.children = [
    ...submodulesItem.children,
    {
      type: "element",
      tagName: "ol",
      properties: {
        className: "toc-level toc-level-2",
      },
      children: itemsToMove,
    },
  ];

  return nextTree;
};

module.exports = customizeTOC;
