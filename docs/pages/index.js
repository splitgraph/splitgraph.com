// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import React from "react";

import withTheme from "../hocs/withTheme";
import { LandingPageLayout } from "../components/LandingPageLayout";
import { HeroBox } from "../components/HeroBox";

import { keyframes, css } from "@emotion/core";

import LandingPageSplitfile from "@splitgraph/content/marketing/LandingPageSplitfile.mdx";

/*
  TODO / temp:

    Pasting the marketing theme in here because hot reload is broken
    for top level files like defaultTheme.js. Need to move it somewhere else.

  (This whole file is too big and needs to be refactored)
*/

const prismTheme = {
  color: "#e0ffff",
  // backgroundColor: "#36678d",
  backgroundColor: "red",
  ".changed,.operator": { color: "#ffd700" },
  ".deleted": { color: "#ffa07a77" },
  ".inserted": { color: "#66cc99" },
  ".comment": { color: "#81cfe0", fontStyle: "italic" },
  ".punctuation": { color: "#e0ffff" },
  ".constant": { color: "#dcc6e0" },
  ".string,.url": { color: "#00ff7f" },
  ".variable": { color: "#36d7b7" },
  ".number,.boolean,.attr-value": { color: "#ffecdb" },
  ".attr-name": { color: "#ffb454" },
  ".keyword,.key,.property,.namespace,.tag,.selector,.doctype": {
    color: "#00ffff",
  },
  ".builtin,.char,.constant,.function,.class-name": {
    color: "#ffa07a",
  },
  // Used by shell-session
  ".output": {
    color: "#e0ffff",
  },
  ".important,.language-bash": {
    color: "#ffa07a",
  },
};

const marketingTheme = {
  styles: {
    pre: {
      ...prismTheme,
      padding: "1ch",
      "@media (max-width: 768px)": {
        // marginLeft: -4,
        // marginRight: -4,
        // paddingLeft: "1ch",
        // paddingRight: "1ch",
        // paddingTop: "1rem",
        // paddingBottom: "1rem",
        // borderTop: "4px solid #efefef",
        // borderBottom: "4px solid #efefef",
      },
      // "@media (min-width: 769px)": {
      //   minWidth: "80ch",
      // },
      fontSize: "0.8rem",
      // padding: 10,
      overflowX: "auto",
      MsOverflowStyle: "none",
      // maxWidth:
      backgroundColor: "primary",
      ".mdx-marker": {
        // backgroundColor: "rgba(255,255,255,0.1)",
        display: "block",
        // marginLeft: "-1em",
        // marginRight: "-1em",
        // paddingRight: "1em",
        // paddingLeft: "1em",
        borderLeft: `.25em solid ${prismTheme[".punctuation"].color}`,
      },
    },
    inlineCode: {
      ...prismTheme,
      "@media (min-width: 749px)": {
        minWidth: "initial",
      },
      // paddingLeft: "0.5ch",
      // paddingRight: "0.5ch",
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: "1rem",
      display: "inline-flex",
      alignContent: "center",
      overflowX: "auto",
      backgroundColor: "primary",
    },
    code: {
      backgroundColor: "primary",
      fontFamily: "monospace",
      fontSize: "inherit",
      span: {
        color: "red",
      },
      ".comment": {
        color: "#f4c1c0",
      },
    },
  },
};

console.log("marketingTheme = ", marketingTheme);

const mdxComponents = {
  pre: ({ children, ...rest }) => (
    <pre sx={marketingTheme.styles.pre} {...rest}>
      {children}
    </pre>
  ),
  code: ({ children, ...rest }) => (
    <code sx={marketingTheme.styles.code} {...rest}>
      {children}
    </code>
  ),
};

const Typewriter = ({ children }) => {
  const typing = keyframes`
    from { width: 0 }
    to { width: 100% }
  `;

  const blinkCaret = keyframes`
    from, to { border-color: transparent }
    50% { border-color: #2b9abe; }
  `;

  const animateBox = css`
    animation: ${typing} 3.5s steps(40, end),
      ${blinkCaret} 0.75s step-end infinite;
  `;

  return (
    <Box
      {...animateBox}
      sx={{
        display: "inline-flex",
        backgroundColor: "light",
        color: "sgdarkblue",
        maxWidth: "90vw",
        ".text-container": {
          paddingLeft: "1ch",
          paddingRight: "1ch",
          fontSize: ["initial", "initial", "2rem"],
          overflow: "hidden",
          borderRight: ".15em solid #113664",
          whiteSpace: "nowrap",
          margin: "0 auto",
          letterSpacing: ".15em",
          animation: `
    ${typing} 3.5s steps(40, end),
    ${blinkCaret} .75s step-end infinite`,
        },
      }}
    >
      <span className="text-container">
        <pre className="inline-code">{children}</pre>
      </span>
    </Box>
  );
};

const LandingPage = () => {
  return (
    <LandingPageLayout>
      <HeroBox>
        <h1>Get your data sorted.</h1>

        <Typewriter>sgr build geonames.splitfile</Typewriter>

        <h2>
          Work with data
          <br className="mobile-line-break" /> like you work with code.
        </h2>

        <Box
          sx={{
            backgroundColor: "sgdarkblue",
            color: "white",
            // width: "80ch",
            maxWidth: "90vw",
            minHeight: "80vh",
            boxShadow: "card",
          }}
        >
          <LandingPageSplitfile components={mdxComponents} />

          {/* <MDXProvider
            components={{
              h1: (props) => <h1 style={{ color: "tomato" }} {...props} />,
            }}
          >
            <Splitfile />
          </MDXProvider> */}
        </Box>

        <h2>
          Data management.
          <br className="mobile-line-break" /> Inspired by Docker and git.
        </h2>

        <h2>
          Create, Share and Extend <br className="mobile-line-break" />{" "}
          Versioned Data, at Scale.
        </h2>

        <h1>sgr clone splitgraph/geonames:latest</h1>
      </HeroBox>
      <Box
        sx={{
          backgroundImage: `url("/static/diagrams/MixMatchRotated2.svg")`,
          minHeight: "30vh",
          backgroundColor: "primary",
          backgroudnRepeat: "no-repeat",
        }}
      >
        Hello
      </Box>
    </LandingPageLayout>
  );
};

export default withTheme(LandingPage);
