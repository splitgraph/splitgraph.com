const visit = require("unist-util-visit");
const find = require("unist-util-find");
const remove = require("unist-util-remove");

/*
  sphinx json emits HTML where for some reason, "module contents" is at the end
  of the body. This is not consistent with how it outputs stndalone HTML.

  We want to move the "module contents" to the top of the page, just before body

  Note this should run while body is still body, and has not been transformed
  into rst-content
*/

const moveModuleContentsToTopOfBody = () => (tree, file) => {
  // Looking for <div.section> that is a direct parent of <span#module-contents>
  const moduleContents = find(
    tree,
    node =>
      node.type === "element" &&
      node.tagName === "div" &&
      node.properties &&
      node.properties.className &&
      node.properties.className.includes("section") &&
      node.children &&
      node.children.length > 0 &&
      node.children.find(
        c =>
          c.type === "element" &&
          c.tagName === "span" &&
          c.properties &&
          c.properties.id === "module-contents"
      )
  );

  if (!moduleContents) {
    return tree;
  }

  const withoutModuleContents = remove(tree, node => node === moduleContents);

  visit(withoutModuleContents, node => {
    if (node.tagName !== "body") {
      return;
    }

    node.children = [moduleContents, ...node.children];
  });

  return withoutModuleContents;
};

module.exports = moveModuleContentsToTopOfBody;
