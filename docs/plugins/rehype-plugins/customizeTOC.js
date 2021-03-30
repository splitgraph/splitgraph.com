const find = require("unist-util-find");

/*

We generate our own TOC out-of-band when creating docs for the python-API
Incidentally, the next.js TOC fails to build anyway, so there is no redundant
TOC tree render. However, there is a redundant, empty TOC tree created.

Let's get rid of that.
*/

const customizeTOC = (toc) => {
  const isEmpty = !find(toc, (node) => node.type === "text" && !!node.value);

  return isEmpty ? false : toc;
};

module.exports = customizeTOC;
