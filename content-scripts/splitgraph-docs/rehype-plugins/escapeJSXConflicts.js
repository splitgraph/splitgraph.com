const visit = require("unist-util-visit");

/*
 Escape markup that the processor confuses with JSX, namely left and right
 braces: { }

 TODO: This doesn't actually work atm (it renders literal &lbrace; to the screen),
       but at least it stops the build errors.
*/

const escapeJSXConflicts = () => (tree, file) => {
  visit(tree, "text", node => {
    node.value = node.value
      .replace(/{/gm, "&lbrace;")
      .replace(/}/gm, "&rbrace;");

    // .replace(/{/gm, "{'{").replace(/}/gm, "}'}");

    // replace(/\${/gm, "{'${");
    // .replace(/{/gm, "&lbrace;")
    // .replace(/}/gm, "&rbrace;");
  });
};

module.exports = escapeJSXConflicts;
