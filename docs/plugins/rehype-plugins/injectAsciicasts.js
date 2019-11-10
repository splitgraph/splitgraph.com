const visit = require("unist-util-visit");

const CAST_TAGNAME = "cast";

const makeCastNode = ({ castManifest, inputNode }) => {
  const inputSrc =
    inputNode && inputNode.properties && inputNode.properties.src
      ? inputNode.properties.src
      : null;

  if (!inputSrc) {
    return {
      type: "text",
      value: "Error: cast has no src"
    };
  }

  if (!Object.keys(castManifest).includes(inputSrc)) {
    return {
      type: "text",
      value: "Error: Invalid cast src"
    };
  }

  const { embedHttpPath, metadata } = castManifest[inputSrc];

  if (!metadata.height) {
    console.warn("Warning: No height in metadata for cast:", embedHttpPath);
    console.warn("         -> Set to default height of 20");
    metadata.height = 20;
  }

  const intHeight = parseInt(metadata.height, 10) + 1;
  const fontSize = 12;
  const lineHeight = 1.3;
  const toolbarSize = 47; // 32 height, 15 padding
  const iframePxHeight = fontSize * lineHeight * intHeight + toolbarSize;

  // Render a background ahead of time, so there is less of a white flash
  // Use linear-gradient trick to render background to expected height exactly
  const background = `linear-gradient(to bottom, #36678d ${iframePxHeight}px, transparent 0)`;

  const newNode = {
    type: "element",
    tagName: "iframe",
    properties: {
      src: embedHttpPath,
      className: "asciinema-embed",
      style: `min-width:100%;min-height:${iframePxHeight}px;border:none;background:${background};`
    }
  };

  return newNode;
};

const injectAsciicasts = ({ castManifest }) => (tree, file) => {
  /*
  For some reason, we get the node as a raw HTML (sometimes JSX?) node,
  instead of a parsed node that can be used with the usual unist utilities.
  But we only need the src, so that's fine. Extract it with a regex, and make
  a fake node to give to the makeCastNode() function.
  */

  visit(
    tree,
    node => node.type === "jsx" || node.type == "html",
    node => {
      const isRawCastHtml =
        node.value && node.value.includes(`<${CAST_TAGNAME}`);

      if (!isRawCastHtml) {
        return;
      }

      const srcRegex = /(?<=\bsrc=")[^"]*/gm;
      const extractedSrc = (`${node.value}`.match(srcRegex) || []).pop();

      const inputNode = {
        nodeType: "element",
        tagName: "cast",
        properties: {
          src: extractedSrc
        }
      };

      let newNode = makeCastNode({
        castManifest,
        inputNode
      });

      Object.assign(node, newNode);

      node.value = undefined;
    }
  );
};

module.exports = injectAsciicasts;
