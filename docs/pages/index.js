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

const featureCardStyle = {
  margin: "1rem",
  backgroundColor: "light",
  padding: "1rem",
  boxShadow: "card",
  minWidth: "90vw",
  maxWidth: "90vw",
  border: "1px solid",
  borderColor: "sgdarkblue",
  color: "heavy",
  textAlign: "left",
  h2: {
    color: "sgdarkblue",
  },
};

const exploreRepoBoxStyle = {
  color: "heavy",
  margin: "5px",
  backgroundColor: "light",
  padding: "5px",
  textAlign: "left",
  ".repo-name": {
    color: "sgdarkblue",
  },
};

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

        <br />
        <h2>
          <del>Dev-ops for Data.</del> <br /> Data-ops.
          <br className="mobile-line-break" /> Inspired by Docker and git.
        </h2>

        <Box sx={{ ...featureCardStyle, textAlign: "center" }}>
          <p sx={{ textAlign: "left" }}>
            Splitgraph is a <strong>data management tool</strong> that allows
            you to work with data like you work with code repositories or docker
            images.
          </p>

          <p sx={{ textAlign: "left" }}>
            <strong>Treat your data like cattle.</strong>
            <br />
            Wrangle your data into <strong>data images</strong>, snapshots of
            SQL tables at a point in time. Version them, push them, or pull
            them.
          </p>

          <p sx={{ textAlign: "left" }}>
            Splitgraph <strong>works with your existing tools</strong>, so you
            can adopt it incrementally without affecting your workflow. It's
            built especially for Postgres, and it speaks SQL. As far as your
            tools are concerned, Splitgraph is just another Postgres database.
          </p>
        </Box>

        <h2>
          Build, Maintain and Share <br className="mobile-line-break" />{" "}
          Versioned Data Images
        </h2>

        <Box sx={featureCardStyle}>
          <h2>Build composable data images.</h2>

          <p>
            Data is at its best when it's joined with other data. Splitgraph
            makes it easy to <strong>compose data images together</strong>
          </p>
        </Box>

        <Box sx={featureCardStyle}>
          <h2>Keep data fresh.</h2>

          <p>
            Nobody likes stale data. It's no fun to spend a day putting together
            a report, only for the upstream data to change the next day.
            Splitgraph gives you tools to keep your data up to date.
          </p>

          <p>
            Mix and mash your data together with open-source, proprietary or
            internal data. Then{" "}
            <strong>keep your data up-to-date with upstream changes.</strong>
          </p>
        </Box>

        <Box sx={featureCardStyle}>
          <h2>Publish data to the cloud.</h2>

          <p>
            <strong>Share your data with others.</strong>
            <br />
            Push your data to splitgraph cloud to share it with others. As a
            bonus, get an <strong>instant REST API</strong> for every version of
            your data, <strong>immediately after publishing it</strong>.
          </p>
        </Box>

        <h2>Explore Data</h2>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "spaceBetween",
            maxWidth: "90vw",
            overflowX: "scroll",
          }}
        >
          <Box flex={1 / 4} sx={exploreRepoBoxStyle}>
            <strong className="repo-name">splitgraph/geonames</strong>
            <br />
            <br />
            An up-to-date database of countries and cities throughout the world.
          </Box>

          <Box flex={1 / 4} sx={exploreRepoBoxStyle}>
            <strong className="repo-name">splitgraph/geonames</strong>
            <br />
            <br />
            An up-to-date database of countries and cities throughout the world.
          </Box>

          <Box flex={1 / 4} sx={exploreRepoBoxStyle}>
            <strong className="repo-name">splitgraph/geonames</strong>
            <br />
            <br />
            An up-to-date database of countries and cities throughout the world.
          </Box>
        </Box>

        <h2>Works with existing tools</h2>

        <Box sx={featureCardStyle}>
          <h2>Powered by Postgres.</h2>

          <p>
            <strong>There's no need to rewrite your existing tools.</strong>
            <br />
            Splitgraph has one core philosophy:{" "}
            <strong>stay out of the way</strong>. It's easy to adopt Splitgraph
            incrementally without changing your workflow.
            <br />
            <br />
            Splitgraph works on top of PostgreSQL, integrating seamlessly with
            anything that uses PostgreSQL.
            <strong>
              You do not need to rewrite any of your tools to use Splitgraph
            </strong>
          </p>
        </Box>

        <Box sx={featureCardStyle}>
          <h2>Ingest data from anywhere.</h2>

          <p>
            <strong>Publish your data from where it lives.</strong>
            It's easy to bring your data into Splitgraph. Whether it lives in
            mongo, postgres, mysql, or a bunch of CSV files, there's a way to
            import your data into splitgraph and query it with SQL.
          </p>
        </Box>
      </HeroBox>
    </LandingPageLayout>
  );
};

export default withTheme(LandingPage);
