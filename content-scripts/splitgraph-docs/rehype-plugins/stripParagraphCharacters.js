const visit = require("unist-util-visit");

/*
  ¶ is used as an anchor character by sphinx, which is fine, and we want to
  keep that in each anchorlink (where it's visually hidden except on hover). The
  problem is our sluggify then picks it up and uses it in IDs, hrefs, and table
  of contents spans.

  So, strip the thing from everywhere it got polluted; namely, text, links,
  and the IDs that those links reference.
*/

const stripParagraphCharacters = () => (tree, file) => {
  visit(tree, (node, index, parent) => {
    // Strip paragraph character from id= attributes
    // (Assuming we are running this afer sluggify)
    if (
      node.type === "element" &&
      node.properties &&
      node.properties.id &&
      node.properties.id.includes("¶")
    ) {
      node.properties.id = node.properties.id.replace("¶", "");
    }

    // Strip paragraph characters from href= attributes
    // (Assuming we are running this after TOC generation)
    if (
      node.type === "element" &&
      node.properties &&
      node.properties.href &&
      node.properties.href.includes("¶")
    ) {
      node.properties.href = node.properties.href.replace("¶", "");
    }

    // Strip paragraph characters from every text node ending with paragraph character,
    // but not text nodes that are only paragraph character. We want to keep the characters
    // in anchorlinks, which are visually hidden, but remove the trailing paragraph characters
    // appended to the text values of TOC links.
    if (
      node.type === "text" &&
      node.value &&
      node.value.endsWith("¶") &&
      node.value !== "¶"
    ) {
      node.value = node.value.replace("¶", "");
    }
  });
};

module.exports = stripParagraphCharacters;
