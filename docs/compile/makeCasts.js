const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf").sync;
const ContentTree = require("./ContentTree");

const CONTENT_DIR = path.dirname(require.resolve("@splitgraph/content"));

const PUBLIC_DIR = path.resolve(
  path.join(path.dirname(require.resolve(__filename)), "../public")
);

const EMBED_HTTP_DIR = "/static/asciinema/embed";
const CAST_HTTP_DIR = "/static/asciinema/casts";
const PLAYER_HTTP_DIR = "/static/asciinema/player";

const EMBED_SYS_DIR = path.join(PUBLIC_DIR, EMBED_HTTP_DIR);
const CAST_SYS_DIR = path.join(PUBLIC_DIR, CAST_HTTP_DIR);

const ASCIINEMA_PLAYER_VERSION = "v2.6.1";

const dirTree = require("directory-tree");

const { md5sumSync } = require("@splitgraph/lib/util");

const getCastMetadata = castSysPath => {
  const headerLine = fs
    .readFileSync(castSysPath)
    .toString()
    .split("\n")[0];

  try {
    return JSON.parse(headerLine);
  } catch (e) {
    console.warn(
      "Warning: Error gathering metadata for cast file:",
      castSysPath
    );
    console.warn(e);
    console.trace(e);
    return {};
  }
};

const getCastStyle = ({ metadata }) => {
  const intWidth = parseInt(metadata.width, 10);
  const intHeight = parseInt(metadata.height, 10);

  const minComfortableFontSize = 12;

  const responsiveFontSize = `calc(100vw / ${intWidth} * 1.6)`;
  const heightResponsiveFontSize = `calc(100vh / ${intHeight * 1.1}})`;
  const minComfortableWidth = minComfortableFontSize * intWidth * 1.1;

  const style = `
<style type="text/css">
@media (max-width: ${minComfortableWidth - 1}px) {
  .asciinema-terminal.font-small {
    font-size: ${responsiveFontSize};
  }
}

@media (min-width: ${minComfortableWidth}px) {
  .asciinema-terminal.font-small {
    font-size: ${heightResponsiveFontSize};
  }
}
</style>
`;

  return style;
};

const getCastEmbedHtml = ({ castHttpPath, metadata }) => {
  const playerName = `asciinema-player-${ASCIINEMA_PLAYER_VERSION}`;
  const extensionName = `asciinema-plus-plus-${ASCIINEMA_PLAYER_VERSION}`;
  const asciinemaPlayerJs = path.join(PLAYER_HTTP_DIR, `${playerName}.js`);
  const asciinemaPlusPlus = path.join(PLAYER_HTTP_DIR, `${extensionName}.js`);
  const asciinemaPlayerCss = path.join(PLAYER_HTTP_DIR, `${playerName}.css`);
  const style = getCastStyle({ metadata });

  // TODO: Can we pick a start time when we are making the cast files?
  const defaultStartTime = "npt:0:01";

  return `
  <html>
  <head>
  <link rel="stylesheet" type="text/css" href="${asciinemaPlayerCss}" />
  ${style}
  </head>
  <body>
  <asciinema-player class="asciinema-theme-splitgraph"
                    cols="${metadata.width}"
                    rows="${metadata.height}"
                    style="max-height: 100% !important;"
                    poster="${defaultStartTime}"
                    src="${castHttpPath}"></asciinema-player>
  </body>
  <script src="${asciinemaPlayerJs}"></script>
  <script src="${asciinemaPlusPlus}"></script>
  </html>
  `;
};

const getCastManifest = () => {
  const castManifest = {};

  dirTree(CONTENT_DIR, { extensions: /\.cast$/ }, item => {
    // This needs to be deterministic in order to work with nextjs export
    let versionHash = md5sumSync(item.path);

    let originSystemPath = item.path;
    let contentPath = item.path.replace(CONTENT_DIR, "") || "/";
    let requirePath = path.join("@splitgraph", "content", contentPath);
    let manifestKey = requirePath;
    let castBasename = path.basename(item.path);
    let slug = castBasename.replace(".cast", "");
    let outputCastName = `${slug}.${versionHash}`;

    let embedHttpPath = path.join(EMBED_HTTP_DIR, `${outputCastName}.html`);
    let castHttpPath = path.join(CAST_HTTP_DIR, `${outputCastName}.cast`);

    let embedSysPath = path.join(EMBED_SYS_DIR, `${outputCastName}.html`);
    let castSysPath = path.join(CAST_SYS_DIR, `${outputCastName}.cast`);

    let metadata = getCastMetadata(item.path);

    castManifest[manifestKey] = {
      originSystemPath,
      embedHttpPath,
      castHttpPath,
      embedSysPath,
      castSysPath,
      slug,
      metadata
    };
  });

  return castManifest;
};

const createStaticEmbedPageForCast = ({
  embedSysPath,
  castHttpPath,
  metadata
}) => {
  const html = getCastEmbedHtml({ castHttpPath, metadata });
  return fs.writeFileSync(embedSysPath, html);
};

const copyCastToStaticDir = ({ originSystemPath, castSysPath }) => {
  return fs.copyFileSync(originSystemPath, castSysPath);
};

const createStaticPagesForCast = ({
  originSystemPath,
  embedSysPath,
  embedHttpPath,
  castHttpPath,
  castSysPath,
  metadata
}) => {
  console.log("    create embed:", embedHttpPath);
  createStaticEmbedPageForCast({ embedSysPath, castHttpPath, metadata });

  console.log("    copy cast to:", castSysPath);
  copyCastToStaticDir({ originSystemPath, castSysPath });
};

const cleanStaticDirs = () => {
  console.log("Cleanup static dirs");

  if (!EMBED_SYS_DIR || !CAST_SYS_DIR) {
    console.error(
      "ERROR: EMBED_SYS_DIR or CAST_SYS_DIR constants are not assigned"
    );
    return;
  }

  console.log("    delete:", EMBED_SYS_DIR);
  rimraf(EMBED_SYS_DIR);
  console.log("    make:", EMBED_SYS_DIR);
  fs.mkdirSync(EMBED_SYS_DIR);
  fs.writeFileSync(path.join(EMBED_SYS_DIR, ".gitkeep"), "");

  console.log("    delete:", CAST_SYS_DIR);
  rimraf(CAST_SYS_DIR);
  console.log("    make:", CAST_SYS_DIR);
  fs.mkdirSync(CAST_SYS_DIR);
  fs.writeFileSync(path.join(CAST_SYS_DIR, ".gitkeep"), "");
};

const createStaticPages = () => {
  const manifest = getCastManifest();
  const castKeys = Object.keys(manifest);

  cleanStaticDirs();

  for (let castKey of castKeys) {
    let cast = manifest[castKey];

    console.log("Create static pages for", castKey, "...");
    createStaticPagesForCast({ ...cast });
  }

  return { castManifest: manifest };
};

const makeCasts = () => createStaticPages();

module.exports = {
  getCastManifest,
  makeCasts
};
