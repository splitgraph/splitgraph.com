const express = require("express");
const next = require("next");
const path = require("path");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // custom route for posts
  server.get("/post/:id", (req, res) => {
    const contentImportPath = path
      .join(
        path.dirname(require.resolve("@splitgraph/content")),
        "docs/0000_getting-started/0200_installation.mdx"
      )
      .replace(
        "/Users/green/_sg/splitgraph-cloud/src/js/splitgraph.com/content/",
        "@splitgraph/content/"
      );

    console.log("source path:", contentImportPath);

    return app.render(req, res, "/index", {
      id: req.params.id,
      contentImportPath:
        req.params.id === "1"
          ? "./docs/0200_sgr/0100_image_management_creation.mdx"
          : req.params.id === "2"
          ? "./docs/0200_sgr/0300_image_information.mdx"
          : "./docs/0200_sgr/0400_data_import_export.mdx"
    });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
