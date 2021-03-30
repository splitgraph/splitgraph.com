const fs = require("fs");
const path = require("path");
const globby = require("globby");

const htmlToMdx = require("./htmlToMdx");
const getMetaForSphinxFile = require("./getMetaForSphinxFile");

// const ROOT_DIR = path.join(path.dirname(__filename), "sgbuild", "json", "api");

// const OUT_DIR = path.join(path.dirname(__filename), "out");
// const OUT_DIR =
//   "/Users/green/_sg/splitgraph-cloud/src/js/splitgraph.com/content/docs/0300_python_api";

const makeMdxFilesFromSphinxJson = ({ inputDir, outputDir }) => {
  const files = globby.sync(path.join(inputDir, "*.fjson"));

  const readJson = (file) => JSON.parse(fs.readFileSync(file));

  for (let file of files) {
    let nameWithoutExtension = path.basename(file).replace(".fjson", "");
    let mdxName = `${nameWithoutExtension}.mdx`;

    let outputMdxFile = path.join(outputDir, mdxName);

    let fileJson = readJson(file);
    let body = fileJson.body;
    let mdxBody = htmlToMdx(body);
    let mdxMeta = getMetaForSphinxFile(fileJson);

    fs.writeFileSync(outputMdxFile, `${mdxMeta}${mdxBody}`);
  }
};

module.exports = makeMdxFilesFromSphinxJson;
