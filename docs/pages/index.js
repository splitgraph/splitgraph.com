// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";

import { Link } from "@splitgraph/tdesign";
import React from "react";

import withTheme from "../hocs/withTheme";
import { LandingPageLayout } from "../components/LandingPageLayout";
import { HeroBox } from "../components/HeroBox";

import { keyframes, css } from "@emotion/core";

import LandingPageSplitfile from "@splitgraph/content/marketing/LandingPageSplitfile.mdx";

import {
  IconPostgresLogo,
  IconComposeImages,
  IconUpdateImages,
  IconUploadDatabase,
} from "@splitgraph/tdesign";

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

const featurePanelStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  width: "90vw",
  maxWidth: "90vw",
  "-webkit-box-pack": "center",
  ".feature": {
    margin: "2rem",
    padding: "1rem",
    width: ["100%", "50%", "25%"],
    flexGrow: 0,
    flexShrink: 1,
    // padding: "0.75em 3em",
    // border: "1px solid #000",
    minHeight: "200px",
    h3: {
      marginTop: "2rem",
    },
    a: {
      variant: "links.primary",
      textDecoration: "underline",
      color: "sgdarkblue",
      borderBottom: "2px solid",
      borderBottomColor: "accent",
      alignSelf: "flex-end",
      ":hover": {
        borderBottom: "3px solid",
      },
    },
  },
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
      </HeroBox>

      <section
        className="lp-section"
        sx={{
          color: "sgdarkblue",
          background:
            "linear-gradient(180deg, rgba(221,221,223,1) 0%, rgba(255,255,255,1) 72%)",
        }}
      >
        <h2>
          <del>Dev-ops for Data.</del> <br /> Data-ops.
          <br className="mobile-line-break" />{" "}
          <span sx={{ fontWeight: "200" }}>Inspired by Docker and git.</span>
        </h2>

        <Box sx={featurePanelStyle}>
          <Box className="feature">
            <IconComposeImages
              size={"6rem"}
              extraStyle={{ display: "inline-flex" }}
            />
            <h3>Build composable data images.</h3>
            <p>
              Splitgraph makes it easy to compose data, so you can mix{" "}
              <Link href="/explore">public data</Link> and internal data
              together into a single, <strong>versioned data image</strong>.
              Harness the declarative syntax of Splitfiles to describe your data
              in terms of SQL.
            </p>
            <Link href="/docs/concepts/splitfiles">
              Learn more about splitfiles.
            </Link>
          </Box>

          <Box className="feature">
            <IconUpdateImages
              size={"6rem"}
              extraStyle={{ display: "inline-flex" }}
            />
            <h3>Keep data fresh and reproducible.</h3>
            <p>
              Rebuild your data when the upstream changes (and know when it
              doesn't). <strong>Keeping your data up-to-date</strong> is as
              simple as running one command, on your laptop or in CI.
            </p>
            <Link href="/docs/working_with_data/inspecting_provenance">
              Learn more about data provenance and rebuilding data images.
            </Link>
          </Box>

          <Box className="feature">
            <IconUploadDatabase
              size={"6rem"}
              extraStyle={{ display: "inline-flex", color: "red" }}
            />
            <h3>Share data with peers.</h3>
            <p>
              Like git, Splitgraph is peer-to-peer. You can push data to other
              splitgraph instances. And you can push it to Splitgraph Cloud,
              where you get an{" "}
              <strong>instant REST API for every version of your data</strong>.
            </p>
            <Link href="/docs/splitgraph_cloud/introduction">
              Learn more about Splitgraph cloud.
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            margin: "1rem",
            // backgroundColor: "white",
            // borderRadius: "2rem",
            padding: "1rem",
            // boxShadow: "card",
            // minWidth: "90vw",
            // maxWidth: "90vw",
            // border: "1px solid",
            boxShadow: "card",
            borderColor: "sgdarkblue",
            color: "sgdarkblue",
            textAlign: "center",
            ".feature-box--header": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            ".sg-icon-postgresLogo": {
              marginRight: ["initial", "initial", "1rem"],
            },
          }}
        >
          <Box className="feature-box--header">
            <h2
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconPostgresLogo
                size={"3em"}
                extraStyle={{
                  display: "inline-flex",
                }}
              />
              &nbsp;Built with Postgres
            </h2>
          </Box>

          <Box sx={featurePanelStyle}>
            <Box className="feature">
              <h3>Keep your existing tools.</h3>
              <p>
                Splitgraph tries to{" "}
                <strong>enhance existing abstractions</strong> without breaking
                them, so you can adopt it incrementally while keeping your
                existing workflows. As far as your tools are concerned, a
                Splitgraph image is{" "}
                <strong>just another Postgres database</strong>.
              </p>
              <Link href="/docs/architecture/splitgraph_engine">
                Learn more about the Splitgraph engine.
              </Link>
            </Box>

            <Box className="feature">
              <h3>Don't sacrifice speed.</h3>
              <p>
                Benefit from the performance of a nearly 30 year old,
                battle-tested database. Gain features without sacrificing speed.
                Splitgraph leverages the{" "}
                <strong>power of Postgres and cstore_fdw</strong> so that you
                can write blazing-fast queries against versioned data.
              </p>
              <Link href="/docs/getting-started/frequently_asked_questions">
                Read more about speed in the FAQ.
              </Link>
            </Box>

            <Box className="feature">
              <h3>Benefit from the Postgres ecosystem.</h3>
              <p>
                Because Splitgraph images are Postgres databases, the whole
                ecosystem of Postgres is available to you. Splitgraph works with
                all your favorite Postgres tools and extensions, including
                PostGIS, pgcli, and postgrest.
              </p>
              <Link href="/docs/integrating_splitgraph/jupyter_notebooks">
                Get started with integrations.
              </Link>
            </Box>
          </Box>
        </Box>
      </section>

      <section
        className="lp-section lp-cta"
        sx={{
          minWidth: "100vw",
          maxWidth: "100vw",
          width: "100vw",
          backgroundColor: "heavy",
          paddingTop: "3rem",
          paddingBottom: "3rem",
          paddingLeft: ["1rem", "1rem", "3rem"],
          paddingRight: ["1rem", "1rem", "3rem"],
          ".button-link": {
            marginBottom: "2rem",
            fontSize: ["1.5rem", "1.5rem", "2rem"],
          },
          ".muted-link": {
            variant: "links.muted",
          },
        }}
      >
        <Link
          className="button-link"
          href="/docs/getting-started/five_minute_demo"
        >
          Try it in five minutes
        </Link>

        <Link className="muted-link" href="#">
          Read our introductory blog post &raquo;
        </Link>
      </section>

      <section
        className="lp-section lp-section--darkgrad"
        sx={{
          background:
            "linear-gradient(180deg, rgba(13,24,33,1) 0%, rgba(54,103,141,1) 50%)",
          color: "light",
        }}
      >
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
      </section>

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
        <h2>
          <IconPostgresLogo /> Powered by Postgres.
        </h2>

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

      <Box sx={{ ...featureCardStyle, textAlign: "center" }}>
        <p sx={{ textAlign: "left" }}>
          Splitgraph is a <strong>data management tool</strong> that allows you
          to work with data like you work with code repositories or docker
          images.
        </p>

        <p sx={{ textAlign: "left" }}>
          <strong>Treat your data like cattle.</strong>
          <br />
          Wrangle your data into <strong>data images</strong>, snapshots of SQL
          tables at a point in time. Version them, push them, or pull them.
        </p>

        <p sx={{ textAlign: "left" }}>
          Splitgraph <strong>works with your existing tools</strong>, so you can
          adopt it incrementally without affecting your workflow. It's built
          especially for Postgres, and it speaks SQL. As far as your tools are
          concerned, Splitgraph is just another Postgres database.
        </p>

        <Box className="feature-card--link-row">
          <Link href="#">Learn more about xxx</Link>
        </Box>
      </Box>
    </LandingPageLayout>
  );
};

export default withTheme(LandingPage);
