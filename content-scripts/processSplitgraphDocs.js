const makeMdxFilesFromSphinxJson = require("./splitgraph-docs/makeMdxFilesFromSphinxJson.js");

const yargs = require("yargs").command(
  "$0 inputDir outputDir",
  `
Convert sphinx .fjson files (created by running "make json"
in the splitgraph repository) to mdx files formatted for documentation.
Directories must be absolute paths.
  `,
  (yargs) => {
    yargs
      .positional("inputDir", {
        describe: "Input directory, immediate parent of .fjson files",
      })
      .positional("outputDir", {
        describe:
          "Output directory, destination of .mdx files. Overwrite existing files.",
      });
  }
);

const { argv } = yargs;

console.log(argv);

console.log("Make .mdx files for splitgraph documentation...");
console.log("   inputDir:", argv.inputDir);
console.log("   outputDir:", argv.inputDir);
makeMdxFilesFromSphinxJson({
  inputDir: argv.inputDir,
  outputDir: argv.outputDir,
});
console.log("Done making splitgraph documentation.");
