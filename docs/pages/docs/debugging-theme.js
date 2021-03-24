// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";

import { Helmet } from "react-helmet";

import withTheme from "@splitgraph/docs/hocs/withTheme";

import defaultTheme from "@splitgraph/design/themes/defaultTheme";
import { makeDefaultTheme } from "@splitgraph/tdesign";

import { ThemeProvider } from "theme-ui";

const designTheme = defaultTheme;

const tdesignTheme = makeDefaultTheme();

// Hacky code, found some getLeaves() and paths() functions on the internet
// Also we're loading underscore here, super hacky. Do not ship

var getLeaves = function (tree, sep = ".") {
  var leaves = [];
  var walk = function (obj, path) {
    path = path || "";
    for (var n in obj) {
      if (obj.hasOwnProperty(n)) {
        if (typeof obj[n] === "object" || obj[n] instanceof Array) {
          walk(obj[n], path + `${sep}` + n);
        } else {
          leaves.push(path + `${sep}` + n);
        }
      }
    }
  };
  walk(tree, "tree");
  return leaves;
};

const paths = (tree) => {
  const treeCopy = { ...tree };

  return getLeaves(tree, "&&&")
    .sort()
    .map((x) => x.split("&&&").slice(1).join("&&&"))
    .map((x) => `${x}&&&${valueAt(tree, x)}`)
    .map(
      (x) =>
        `${x.split("&&&").slice(0, -1).join(" ")} = ${x.split("&&&").slice(-1)}`
    );
};

function valueAt(obj, path) {
  var _paths = path.split("&&&"),
    current = obj,
    i;

  for (i = 0; i < _paths.length; ++i) {
    if (current[_paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[_paths[i]];
    }
  }
  return current;
}

const DebuggingThemeDuplication = () => {
  const [tab, setTab] = React.useState("only");
  const onClickAll = (_) => setTab("all");
  const onClickOnly = (_) => setTab("only");

  const allPaths = {
    tdesign: paths(tdesignTheme),
    design: paths(designTheme),
  };

  const [onlyPaths, setOnlyPaths] = React.useState({
    tdesign: [],
    design: [],
  });

  React.useEffect(() => {
    if (!_) {
      return;
    }

    setOnlyPaths({
      // only in tdesign
      tdesign: _.difference(allPaths.tdesign, allPaths.design),
      design: _.difference(allPaths.design, allPaths.tdesign),
    });
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "100%",
        minWidth: "100%",
        maxHeight: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "row",
        pre: {
          minWidth: "100%",
        },
        ".container": {
          minWidth: "50%",
          h3: {
            textAlign: "center",
          },
          pre: {
            overflowX: "scroll",
            minWidth: "100%",
            minHeight: "80vh",
          },
        },
      }}
    >
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/underscore@1.12.1/underscore-min.js" />
      </Helmet>
      {tab === "all" && (
        <>
          <Box className="container">
            <button onClick={onClickOnly}>only</button>
            <h3>{allPaths.tdesign.length} tdesign (index)</h3>
            <pre>{JSON.stringify(allPaths.tdesign, null, 2)}</pre>
          </Box>
          <Box className="container">
            <h3>{allPaths.design.length} in design (defaultTheme)</h3>
            <pre>{JSON.stringify(allPaths.design, null, 2)}</pre>
          </Box>
        </>
      )}
      {tab === "only" && (
        <>
          <Box className="container">
            <button onClick={onClickAll}>all</button>
            <h3>{onlyPaths.tdesign.length} In only tdesign</h3>
            <pre>{JSON.stringify(onlyPaths.tdesign, null, 2)}</pre>
          </Box>
          <Box className="container">
            <h3>{onlyPaths.design.length} In only design</h3>
            <pre>{JSON.stringify(onlyPaths.design, null, 2)}</pre>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DebuggingThemeDuplication;
