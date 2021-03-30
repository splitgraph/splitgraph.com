const unified = require("unified");
const parse = require("rehype-parse");

const slug = require("rehype-slug");
const toc = require("rehype-toc");
const stringify = require("rehype-stringify");

const urls = require("rehype-urls");

const customizeTOC = require("./rehype-plugins/customizeTOC");
const escapeJSXConflicts = require("./rehype-plugins/escapeJSXConflicts");
const extractBodyAsRstContent = require("./rehype-plugins/extractBodyAsRstContent");
const moveModuleContentsToTopOfBody = require("./rehype-plugins/moveModuleContentsToTopOfBody");
const rewriteUrl = require("./rehype-plugins/rewriteUrl");
const stripFirstHeading = require("./rehype-plugins/stripFirstHeading");
const stripParagraphCharacters = require("./rehype-plugins/stripParagraphCharacters");

// TODO: Figure out what's going on here
const preprocessHtml = (html) => {
  return html.replace(/\sclass=\"/gm, ' className="');

  // .replace(/“/gm, '"')
  // .replace(/”/gm, '"')
  // .replace(/\$\{/gm, "\\\\${")
  // .replace(/{/gm, "{'{")
  // .replace(/}/gm, "}'}")
};

const postprocessHtml = (html) => {
  return html.replace(/\sclass=\"/gm, ' className="');
};

const htmlToMdx = (html) => {
  const processor = unified()
    .use(parse)
    .use(stripFirstHeading)
    .use(moveModuleContentsToTopOfBody)
    .use(extractBodyAsRstContent)
    .use(escapeJSXConflicts)
    .use(urls, rewriteUrl)
    .use(slug)
    .use(toc, { customizeTOC })
    .use(stripParagraphCharacters)
    .use(stringify, { entities: { useShortestReferences: true } });

  return postprocessHtml(`${processor.processSync(preprocessHtml(html))}`);
};

module.exports = htmlToMdx;
