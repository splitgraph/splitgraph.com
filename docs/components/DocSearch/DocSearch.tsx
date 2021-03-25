/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx, Box } from "theme-ui";
import * as React from "react";
import { Helmet } from "react-helmet";

import { searchIconURI } from "@splitgraph/tdesign";

export interface IDocSearchProps {}

const DOCSEARCH_JS_URL = process.env.DOCSEARCH_JS_URL;
const DOCSEARCH_CSS_URL = process.env.DOCSEARCH_CSS_URL;
const DOCSEARCH_PUBLIC_CLIENT_API_KEY =
  process.env.DOCSEARCH_PUBLIC_CLIENT_API_KEY;
const DOCSEARCH_INDEX_NAME = process.env.DOCSEARCH_INDEX_NAME;

export interface IWindowWithDocSearch extends Window {
  docsearch: (opts: {
    apiKey: string;
    indexName: string;
    inputSelector: string;
    debug?: boolean;
  }) => void;
}

const mountBodyScript = ({ onLoad }) => {
  const srcURL = DOCSEARCH_JS_URL;

  const bodyScriptElement = document.createElement("script");
  const bodyRefElement = document.getElementsByTagName("body")[0];
  bodyScriptElement.type = "text/javascript";
  bodyScriptElement.async = true;
  bodyScriptElement.defer = true;

  if (srcURL) {
    bodyScriptElement.src = srcURL;
  } else {
    console.warn("No srcURL for docsearch provided");
  }

  // Once the script is ready, call the onLoad() closure to setState in the component
  bodyScriptElement.onload = () => onLoad();

  // TODO: Should maybe add a check to see if it already exists,
  //       but not necessary as long as caller checks if window.docsearch exists
  bodyRefElement.appendChild(bodyScriptElement);
};

const DocSearch = ({}: IDocSearchProps) => {
  const [enabled, setEnabled] = React.useState(true);

  const [windowReady, setWindowReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      setWindowReady(false);
      return;
    }

    if (
      (window as IWindowWithDocSearch & typeof globalThis).docsearch ||
      // @ts-ignore
      windowReady
    ) {
      console.log("✔︎ docsearch already loaded");
      setWindowReady(true);
      return;
    }

    mountBodyScript({
      onLoad: () => {
        setWindowReady(true);
      },
    });
  }, []);

  React.useEffect(() => {
    if (!windowReady) {
      return;
    }

    const docsearch = (window as IWindowWithDocSearch & typeof globalThis)
      ?.docsearch;

    if (!docsearch) {
      console.warn("window.docsearch does not exist");
      return;
    }

    if (!DOCSEARCH_PUBLIC_CLIENT_API_KEY || !DOCSEARCH_INDEX_NAME) {
      console.warn("Missing DocSearch configuration");
      return;
    }

    docsearch({
      apiKey: DOCSEARCH_PUBLIC_CLIENT_API_KEY,
      indexName: DOCSEARCH_INDEX_NAME,
      inputSelector: "#algolia-doc-search",
      debug: false,
    });

    console.log("✔︎ docsearch ready");

    setEnabled(true);
  }, [windowReady]);

  const style = {
    display: ["none", "none", "inline"],
    marginRight: "2rem",
    form: {
      display: "inline",
    },
    input: {
      background: `url(${searchIconURI}) no-repeat 8px 50%`,
      paddingLeft: "3em",
      paddingTop: "0.5em",
      paddingBottom: "0.5em",
      backgroundColor: "white",
      color: "heavy",
      border: "1px solid gray",
      // color: "gray",
      // min 16px font size so iOS does not zoom on focus
      fontSize: ["16px", "inherit", "inherit"],
    },
  };

  return enabled ? (
    <>
      <Helmet>
        <link rel="stylesheet" href={DOCSEARCH_CSS_URL} />
      </Helmet>
      <Box sx={style}>
        <form>
          <input
            type="search"
            placeholder="Search Docs..."
            aria-label="Search Docs"
            id="algolia-doc-search"
          />
        </form>
      </Box>
    </>
  ) : (
    <span>&nbsp;</span>
  );
};

export default DocSearch;
