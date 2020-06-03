// @jsx jsx
// @ts-ignore
import { jsx, Box } from "theme-ui";

import React from "react";

import { NextSeo } from "next-seo";

import withTheme from "../hocs/withTheme";
import { LandingPageLayout } from "../components/LandingPageLayout";
import { HeroBox } from "../components/HeroBox";
import { Footer } from "../components/Footer";

import { keyframes, css } from "@emotion/core";

import LandingPageSplitfile from "@splitgraph/content/marketing/LandingPageSplitfile.mdx";

import {
  IconConceptContainerCrane,
  IconConceptDataInPalmOfHand,
  IconConceptCow,
  IconConceptMoneyDatabase,
  IconConceptWorkflowGantChart,
  IconPostgresLogo,
  IconComposeImages,
  IconUpdateImages,
  IconUploadDatabase,
  IconFeatureAutogeneratedAPI,
  IconFeatureBigData,
  IconFeatureCommandLineClient,
  IconFeatureContentAddressable,
  IconFeatureCloudStorage,
  IconFeatureCache,
  IconFeatureDeltaCompression,
  IconFeatureExtractTransformTransform,
  IconFeatureIntegrateOtherDatabases,
  IconFeatureLayeredQuerying,
  IconFeaturePeerToPeer,
  IconFeaturePythonLogo,
  IconFeatureProvenance,
  IconFeatureSplitfiles,
  IconFeatureVersioning,
} from "@splitgraph/tdesign";

import { Link } from "@splitgraph/docs/components";

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
      "@media (max-width: 768px)": {},
      fontSize: "0.8rem",
      overflowX: "auto",
      MsOverflowStyle: "none",
      backgroundColor: "primary",
      ".mdx-marker": {
        display: "block",
        borderLeft: `.25em solid ${prismTheme[".punctuation"].color}`,
      },
    },
    inlineCode: {
      ...prismTheme,
      "@media (min-width: 749px)": {
        minWidth: "initial",
      },
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

const ctaSectionStyle = {
  minWidth: "100%",
  maxWidth: "100%",
  width: "100%",
  backgroundColor: "heavy",
  paddingTop: "3rem",
  paddingBottom: "3rem",
  paddingLeft: ["1rem", "1rem", "3rem"],
  paddingRight: ["1rem", "1rem", "3rem"],
  borderTop: "0.5ch solid",
  borderTopColor: "primary",
  borderBottom: "0.5ch solid",
  borderBottomColor: "primary",
  h2: {
    color: "white",
  },
  ".button-link": {
    marginBottom: "2rem",
    fontSize: ["1.5rem", "1.5rem", "2rem"],
  },
  ".muted-link": {
    variant: "links.muted",
  },
  ".mobile-shrink": {
    fontSize: ["1.2rem", "1.5rem", "2rem"],
  },
};

// todo: rename to benefitPanelStyle, and .feature -> .benefit
const featurePanelStyle = {
  display: "flex",
  color: "primary",
  flexWrap: "wrap",
  justifyContent: "center",
  maxWidth: "90vw",
  WebkitBoxPack: "center",
  ".feature:nth-child(even)": {
    marginRight: [0, "2rem", "4rem"],
    marginLeft: [0, "2rem", "4rem"],
  },
  ".feature": {
    marginBottom: ["4rem", "4rem", 0],
    width: ["100%", "calc(50% - 4rem)", "25%"],
    flexGrow: 0,
    flexShrink: 1,
    minHeight: "200px",
    h3: {
      marginTop: "2rem",
      color: "primary",
    },
    p: {
      textAlign: "justify",
      color: "primary",
    },
    a: {
      variant: "links.primary",
      textDecoration: "underline",
      color: "sgdarkblue",
      alignSelf: "flex-end",
      ":hover": {
        borderBottom: "2px solid",
        borderBottomColor: "accent",
        borderBottom: "3px solid",
      },
    },
  },
};

const featureSectionStyle = {
  color: "primary",
  display: ["inherit", "inherit", "flex"],
  paddingTop: "4rem",
  paddingBottom: "4rem",

  // Note: this is even/odd of all <section> on the page, so which one is first
  // depends on how many sections come before it. If adding a section, may
  // want to flip "odd" and "even" here to make sure first section is gray

  // left list, right header
  ":nth-child(odd)": {
    backgroundColor: "#ebebeb",
    flexDirection: ["inherit", "inherit", "row-reverse"],
    ".feature-section-header": {
      justifyContent: ["center", "center", "flex-end"],
      paddingRight: [
        "inherit",
        "inherit",
        "max(3rem, calc((100vw - 120ch)/2))",
      ],
    },
    ul: {
      paddingRight: ["1rem", "1rem", "inherit"],
      paddingLeft: ["1rem", "1rem", "max(3rem, calc((100vw - 120ch)/2))"],
    },
  },

  // left header, right list
  ":nth-child(even)": {
    backgroundColor: "white",
    flexDirection: ["inherit", "inherit", "row"],
    ".feature-section-header": {
      justifyContent: ["center", "center", "flex-start"],
      paddingLeft: ["inherit", "inherit", "max(3rem, calc((100vw - 120ch)/2))"],
    },
    ul: {
      paddingLeft: ["1rem", "1rem", "inherit"],
      paddingRight: ["1rem", "1rem", "max(3rem, calc((100vw - 120ch)/2))"],
    },
  },
  ".feature-section-header": {
    paddingBottom: ["4rem", "4rem", "inherit"],
    color: ["inherit", "inherit", "primary"],
    width: ["inherit", "inherit", "50%"],
    display: "flex",
    alignItems: "center",
    h2: {
      margin: 0,
    },
    // TODO I added this to get line breaks in feature subheadings but it broke the layout
    //   (no longer vertically centred)
    flexDirection: "column",
  },
  ul: {
    width: ["inherit", "inherit", "50%"],
    paddingTop: 0,
    paddingBottom: 0,
    padding: 0,
    margin: 0,
    textAlign: "left",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    li: {
      width: "100%",
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      flexGrow: 0,
      flexShrink: 1,
      marginBottom: "1rem",
      marginTop: "1rem",
    },
    ".feature-icon": {
      display: "inline-flex",
      alignItems: "center",
      marginRight: "2rem",
      marginTop: "-1.75rem", // don't count the CTA row in centering
      minWidth: "3rem", // must be size of icon
      'div[class^="sg-icon-"]': {
        display: "inline-flex",
      },
    },
    ".feature-body": {
      display: "flex",
      flexDirection: "column",
      ".feature-heading": {
        fontWeight: "bold",
      },
      ".feature-description": {
        textAlign: "justify",
      },
      ".feature-cta": {
        variant: "links.primary",
        marginTop: "1rem",
        textAlign: "left",
        // fontWeight: "bold",
        // textTransform: "uppercase",
        fontSize: "small",
      },
      ".feature-cta:after": {
        paddingLeft: "1ch",
        paddingRight: "1ch",
        content: '"\\27F6"',
      },
    },
  },
};

const LandingPage = () => {
  return (
    <LandingPageLayout>
      <NextSeo title="Work with data like you work with code" />

      <HeroBox>
        <h1>Get your data sorted.</h1>

        <Typewriter>sgr build votes.splitfile</Typewriter>

        <h2>
          Work with data
          <br className="mobile-line-break" /> like you work with code.
        </h2>

        <Box
          sx={{
            backgroundColor: "sgdarkblue",
            color: "white",
            maxWidth: "90vw",
            boxShadow: "card",
          }}
        >
          <LandingPageSplitfile components={mdxComponents} />
        </Box>

        <br />
      </HeroBox>

      <section
        className="lp-section"
        sx={{
          color: "sgdarkblue",
          background:
            "linear-gradient(180deg, rgba(221,221,223,1) 0%, rgba(255,255,255,1) 72%)",
          paddingLeft: ["1rem", "1rem", "3rem"],
          paddingRight: ["1rem", "1rem", "3rem"],
          paddingBottom: "4rem",
        }}
      >
        <h2>
          Build, combine and share data. <br />
          <br className="mobile-line-break" />{" "}
          <span sx={{ fontWeight: "200" }}>Powered by Postgres.</span>
          <br className="mobile-line-break" />{" "}
          <span sx={{ fontWeight: "200" }}>Inspired by Docker and Git.</span>
          <br />
          <br />
        </h2>

        <Box sx={featurePanelStyle}>
          <Box className="feature">
            <IconComposeImages
              size={"6rem"}
              extraStyle={{ display: "inline-flex" }}
            />
            <h3>Build composable datasets</h3>
            <p>
              Splitfiles allow you to use familiar SQL to build versioned
              datasets, or "data images," which are snapshots of a database
              similar to how a Docker image is a snapshot of a filesystem.
              Merging public data with internal datasets is as simple as
              referencing them through a <tt>JOIN</tt>.
            </p>
            <Link href="/docs/concepts/splitfiles">
              Learn more about Splitfiles
            </Link>
          </Box>

          <Box className="feature">
            <IconUpdateImages
              size={"6rem"}
              extraStyle={{ display: "inline-flex" }}
            />
            <h3>Keep data fresh and reproducible</h3>
            <p>
              With Splitgraph's provenance tracking, you know exactly where your
              data came from. Keep data images up-to-date with a single command
              when the sources change. Easily integrate Splitgraph into your CI
              pipeline to stay on top of changes to your data sources.
            </p>
            <Link href="/docs/working-with-data/inspecting-provenance">
              Learn more about data provenance and rebuilding data images.
            </Link>
          </Box>

          <Box className="feature">
            <IconUploadDatabase
              size={"6rem"}
              extraStyle={{ display: "inline-flex", color: "red" }}
            />
            <h3>Share data with peers</h3>
            <p>
              Like Git, Splitgraph is peer-to-peer. Push data to any other
              Splitgraph instance or publish it to the catalog at Splitgraph
              Cloud, where you get bonus features like an instant,
              OpenAPI-compatible REST API for every version of your data.
            </p>
            <Link href="/docs/splitgraph-cloud/introduction">
              Learn more about Splitgraph Cloud.
            </Link>
          </Box>
        </Box>
      </section>

      <section className="lp-section lp-cta" sx={ctaSectionStyle}>
        <Link
          className="button-link"
          href="/docs/getting-started/five-minute-demo"
        >
          Try it in five minutes
        </Link>

        <Link className="muted-link" href="/blog/introduction">
          Read our introductory blog post &raquo;
        </Link>
      </section>

      <section
        className="lp-section"
        sx={{
          color: "primary",
          background:
            "linear-gradient(180deg, rgba(221,221,223,1) 0%, rgba(255,255,255,1) 72%)",
          paddingLeft: ["1rem", "1rem", "3rem"],
          paddingRight: ["1rem", "1rem", "3rem"],
          paddingBottom: "4rem",
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

        <Box sx={{ ...featurePanelStyle, color: "initial" }}>
          <Box className="feature">
            <IconConceptWorkflowGantChart
              color="primary"
              size={"6rem"}
              extraStyle={{ display: "inline-flex" }}
            />
            <h3>Keep your existing tools</h3>
            <p>
              Anything that works with Postgres will work with Splitgraph. As
              far as your tools are concerned, a Splitgraph image is just
              another Postgres database. You can adopt Splitgraph incrementally
              while keeping your existing workflows and benefitting from the
              Postgres ecosystem.
            </p>
            <Link href="/product/splitgraph/integrations">
              See examples of common integrations
            </Link>
          </Box>

          <Box className="feature">
            <IconFeatureIntegrateOtherDatabases
              color="primary"
              size={"6rem"}
              extraStyle={{ display: "inline-flex" }}
            />
            <h3>Ingest data from anywhere</h3>
            <p>
              Forget ETL and BI connectors. Splitgraph leverages the native
              PostgreSQL feature of Foreign Data Wrappers. Use any FDW to import
              data from common databases, or thousands of open government
              datasets. Or, write a custom mount handler to import data from
              wherever you need.
            </p>
            <Link href="/docs/ingesting-data/foreign-data-wrappers/introduction">
              Read more about ingesting data with FDWs
            </Link>
          </Box>

          <Box className="feature">
            <IconConceptMoneyDatabase
              color="primary"
              size={"6rem"}
              extraStyle={{ display: "inline-flex" }}
            />
            <h3>Save on costs</h3>
            <p>
              Stop paying for a bulky, always-on data warehouse. Splitgraph data
              can be stored in any S3-compatible object storage and downloaded
              on demand when it needs to be queried.
            </p>
            <Link href="/docs/large-datasets/layered-querying">
              Read about layered querying
            </Link>
          </Box>
        </Box>
      </section>

      <section
        className="lp-section lp-section--darkgrad"
        sx={{
          background:
            "linear-gradient(180deg, rgba(13,24,33,1) 0%, rgba(54,103,141,1) 50%)",
          color: "light",
          h2: {
            color: "light",
          },
          borderTop: "0.5ch solid",
          borderTopColor: "primary",
          borderBottom: "0.5ch solid",
          borderBottomColor: "rgba(13,24,33,1)",
          paddingTop: "2rem",
          paddingBottom: "2rem",
          paddingLeft: "max(3rem, calc((100vw - 120ch)/2))",
          paddingRight: "max(3rem, calc((100vw - 120ch)/2))",
        }}
      >
        <h2>Explore Public Data</h2>

        <iframe
          src="/explore?embed=1"
          allowtransparency="true"
          style={{
            left: 0,
            top: 0,
            minWidth: "100%",
            width: "100%",
            maxHeight: "calc(200px + 1rem)",
            height: "calc(200px + 1rem)",
            border: "none",
            background: "none",
            overflowY: "hidden",
          }}
        />
      </section>

      <section
        className="lp-section"
        sx={{
          color: "primary",
          backgroundColor: "light",
          textAlign: "center",
          paddingTop: "4rem",
          // paddingBottom: "4rem",
          margin: 0,
          h2: {
            marginBottom: "1rem !important",
            marginTop: "0 !important",
          },
        }}
      >
        <h2>Enhance every stage of the data lifecycle</h2>

        <h2 sx={{ marginTop: "2rem !important", fontWeight: "200" }}>
          Adopt Splitgraph incrementally,{" "}
          <br sx={{ display: ["block", "block", "none"] }} /> where and when you
          need it.
        </h2>
      </section>

      <section className="lp-feature-section" sx={featureSectionStyle}>
        <Box className="feature-section-header">
          <h2>Ingestion</h2>
          <Link href="/product/data-lifecycle/ingestion">
            <p>Go beyond ETL and query other databases directly from Splitgraph.</p>
          </Link>
        </Box>

        <ul>
          <li>
            <Box className="feature-icon">
              <IconFeatureIntegrateOtherDatabases
                color="primary"
                size={"3rem"}
              />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Ingest data from anywhere</span>
              <span className="feature-description">
                Import data from all major databases, setup Splitgraph as a
                Postgres replication client, or write a custom mount handler to
                cover your unique use case. Transform the data into a Splitgraph
                image, or leave it as-is and query it on demand.
              </span>
              <Link
                href="/docs/ingesting-data/foreign-data-wrappers/introduction"
                className="feature-cta"
              >
                Read the FDW Documentation
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconFeatureLayeredQuerying color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Layered querying</span>
              <span className="feature-description">
                Don't download the whole dataset just to run one <tt>SELECT</tt>
                . Splitgraph lets your software query remote data by lazily
                downloading only the required fragments.
              </span>
              <Link
                href="/docs/large-datasets/layered-querying"
                className="feature-cta"
              >
                Learn about Layered Querying
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconConceptDataInPalmOfHand color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">
                Instantly access thousands of open datasets
              </span>
              <span className="feature-description">
                Splitgraph comes bundled with a mount handler for Socrata, an
                open data platform that hosts tens of thousands of government
                datasets. You can use Splitgraph to mount any Socrata dataset as
                a Postgres table. You can even write <tt>JOIN</tt> queries
                across different data portals.
              </span>
              <Link href="/splitgraph/socrata" className="feature-cta">
                Explore the Socrata repository
              </Link>

              <Link href="/docs/ingesting-data/socrata" className="feature-cta">
                Try joining data from two Socrata data portals
              </Link>
            </Box>
          </li>
        </ul>
      </section>

      <section className="lp-feature-section" sx={featureSectionStyle}>
        <Box className="feature-section-header">
          <h2>Storage</h2>
          <Link href="/product/data-lifecycle/storage">
            <p>Save on storage costs with a columnar format and delta compression.</p>
          </Link>
        </Box>

        <ul>
          <li>
            <Box className="feature-icon">
              <IconFeatureDeltaCompression color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Delta Compression</span>
              <span className="feature-description">
                Splitgraph tables are composed of delta compressed objects. Keep
                track of how your data changed through history at low storage
                cost and bring your datasets up to date without redownloading
                them.
              </span>
              <Link href="/docs/concepts/objects" className="feature-cta">
                Learn how Splitgraph stores objects
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconFeatureContentAddressable color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">
                Content addressable chunks
              </span>
              <span className="feature-description">
                Splitgraph objects are immutable and content-addressable,
                allowing Splitgraph to automatically deduplicate data and store
                multiple versions efficiently. Focus on what to put into your
                data warehouse, not how to store it.
              </span>
              <Link
                href="/docs/working-with-data/inspecting-images#example"
                className="feature-cta"
              >
                See content addressability in action
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconFeatureCloudStorage color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">
                S3 Compatible Blob Storage
              </span>
              <span className="feature-description">
                Splitgraph stores your data as columnar chunks in any
                S3-compatible object store, and Postgres only needs to keep
                track of lightweight metadata until you're ready to query it.
                Download data only when you need it, without the need for a
                bulky always-on warehouse.
              </span>
              <Link
                href="https://github.com/splitgraph/splitgraph/tree/master/examples/push-to-object-storage"
                className="feature-cta"
              >
                Try an example of pushing to object storage
              </Link>
            </Box>
          </li>
        </ul>
      </section>

      <section className="lp-feature-section" sx={featureSectionStyle}>
        <Box className="feature-section-header">
          <h2>Research and Reporting</h2>
          <Link href="/product/data-lifecycle/research">
            <p>Work on data with familiar tools and paradigms.</p>
          </Link>
        </Box>

        <ul>
          <li>
            <Box className="feature-icon">
              <IconFeatureVersioning color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Data Versioning</span>
              <span className="feature-description">
                Switch between different versions of your data, capture changes,
                send and receive revisions and do it without rewriting any of
                your tools &mdash; just like Git.
              </span>
              <Link
                href="/docs/working-with-data/tracking-changes"
                className="feature-cta"
              >
                Discover how change tracking works
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconFeatureCommandLineClient color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Command Line Client</span>
              <span className="feature-description">
                Manage Splitgraph data using a familiar command line interface
                inspired by Docker and Git.
              </span>
              <Link
                href="/docs/architecture/sgr-client"
                className="feature-cta"
              >
                Discover the <tt>sgr</tt> CLI
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconFeaturePythonLogo color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Python Library</span>
              <span className="feature-description">
                Interact with Splitgraph repositories and images using the full
                suite of Python data science tools, including Jupyter notebooks
                and Pandas DataFrames.
              </span>
              <Link
                href="/docs/integrating-splitgraph/jupyter-notebooks"
                className="feature-cta"
              >
                Try an example Jupyter notebook
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconFeatureBigData color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Big-data Ready</span>
              <span className="feature-description">
                Splitgraph uses a columnar storage format for its data, offering
                a smaller (5x-10x) on-disk footprint and faster read performance
                than native PostgreSQL tables. Keep your data in S3-compatible
                storage, and only download it when you need it.
              </span>
              <Link
                href="https://github.com/splitgraph/splitgraph/blob/master/examples/benchmarking/benchmarking_real_data.ipynb"
                className="feature-cta"
              >
                See benchmarking data on GitHub
              </Link>
            </Box>
          </li>
        </ul>
      </section>

      <section className="lp-feature-section" sx={featureSectionStyle}>
        <Box className="feature-section-header">
          <h2>Transformations</h2>
          <Link href="/product/data-lifecycle/transformation">
            Build datasets in a composable and maintainable way, suitable for research or production.
          </Link>
        </Box>

        <ul>
          <li>
            <Box className="feature-icon">
              <IconFeatureSplitfiles color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Splitfiles</span>
              <span className="feature-description">
                Define transformations on data using a declarative syntax that
                will be familiar to anyone who has written a Dockerfile. Enjoy
                full access to the <tt>SQL</tt> language, and reference other
                Splitgraph data images or foreign tables with a simple{" "}
                <tt>JOIN</tt>.
              </span>
              <Link href="/docs/concepts/splitfiles" className="feature-cta">
                Discover Splitfiles
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconFeatureProvenance color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Provenance</span>
              <span className="feature-description">
                Datasets built with Splitfiles have all their sources recorded,
                meaning Splitgraph knows exactly where your data came from and
                when to rebuild it. Easily stay on top of your data, without
                drifting out of date when upstream data sources change.
              </span>
              <Link
                href="/mildbyte/complex_dataset/latest/-/provenance"
                className="feature-cta"
              >
                See an example of provenance in the catalog
              </Link>
              <Link
                href="/docs/working-with-data/inspecting-provenance"
                className="feature-cta"
              >
                Learn more about provenance
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconFeatureCache color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Caching</span>
              <span className="feature-description">
                Rebuild data only if the sources have changed. Easily integrate
                Splitfiles into your CI pipeline to keep your data up to date
                and only download the changes to upstream datasets.
              </span>
              <Link
                href="/docs/working-with-data/using-splitfiles"
                className="feature-cta"
              >
                See how Splitfiles can fit in your CI pipeline
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconFeatureExtractTransformTransform
                color="primary"
                size={"3rem"}
              />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">
                Extract, transform, transform
              </span>
              <span className="feature-description">
                Spend less time loading. Spend more time defining
                transformations between self-contained, immutable data images.
                Let Splitgraph worry about dependency graphs, so you can focus
                on results.
              </span>
              <Link
                href="/docs/splitfiles/splitfile-sql"
                className="feature-cta"
              >
                Read about <tt>SQL</tt> layers in Splitfiles
              </Link>
            </Box>
          </li>
        </ul>
      </section>

      <section className="lp-feature-section" sx={featureSectionStyle}>
        <Box className="feature-section-header">
          <h2>Sharing</h2>
          <p>Go beyond one machine and collaborate on data with others.</p>
        </Box>

        <ul>
          <li>
            <Box className="feature-icon">
              <IconFeaturePeerToPeer color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Peer-to-Peer</span>
              <span className="feature-description">
                Any Splitgraph engine can act as a remote peer. Push and pull
                data between Splitgraph installations, or publish it to
                Splitgraph Cloud using the same protocol.
              </span>
              <Link
                href="/docs/getting-started/decentralized-demo"
                className="feature-cta"
              >
                Try a decentralized demo
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconFeatureAutogeneratedAPI color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">Auto-generated REST API</span>
              <span className="feature-description">
                Get an instant, auto-generated OpenAPI-compatible REST API for
                every version of your data when you push to Splitgraph Cloud,
                thanks to the power of PostgREST. Query any version of your data
                with a simple HTTP request. More tools coming soon.
              </span>
              <Link
                href="/splitgraph/socrata/latest/-/api-schema"
                className="feature-cta"
              >
                Try the <tt>splitgraph/socrata</tt> REST API
              </Link>
            </Box>
          </li>

          <li>
            <Box className="feature-icon">
              <IconConceptDataInPalmOfHand color="primary" size={"3rem"} />
            </Box>
            <Box className="feature-body">
              <span className="feature-heading">
                Access an ever-growing library of data
              </span>
              <span className="feature-description">
                Splitgraph Cloud is like GitHub is to git, a place where you can
                share and find public data. Enrich your private reports by
                joining your internal data with public data. Give back to the
                community by sharing your data, whether it's a brand-new
                dataset, or a fresh take on public data.
              </span>
              <Link href="/explore" className="feature-cta">
                Explore the Splitgraph catalog
              </Link>
            </Box>
          </li>
        </ul>
      </section>

      <section className="lp-section lp-cta" sx={ctaSectionStyle}>
        <Link className="button-link" href="/docs/">
          Read the Docs
        </Link>

        <Link
          className="muted-link"
          href="https://www.github.com/splitgraph/splitgraph"
        >
          Visit Splitgraph at GitHub &raquo;
        </Link>
      </section>

      <section
        className="lp-section"
        sx={{
          color: "primary",
          background:
            "linear-gradient(180deg, rgba(221,221,223,1) 0%, rgba(255,255,255,1) 72%)",
          paddingLeft: ["1rem", "1rem", "3rem"],
          paddingRight: ["1rem", "1rem", "3rem"],
          paddingBottom: "4rem",
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
            Why Splitgraph?
          </h2>
        </Box>

        <Box sx={featurePanelStyle}>
          <Box className="feature">
            <IconConceptContainerCrane
              color="primary"
              size={"6rem"}
              extraStyle={{ display: "inline-flex" }}
            />
            <h3>Work with data like code</h3>
            <p>
              Benefit from familiar conventions and concepts. We took the best
              ideas from our favorite development tools and applied them to the
              domain of data science.
            </p>
            <Link href="/blog/introduction">
              Read our introductory blog post
            </Link>
          </Box>

          <Box className="feature">
            {/* Already has a color set */}
            <IconComposeImages
              size={"6rem"}
              extraStyle={{ display: "inline-flex" }}
            />
            <h3>Build composable data images</h3>
            <p>
              Write familiar SQL with simple <tt>JOIN</tt>s to combine public
              and private datasets into versioned data images with provenance
              tracking.
            </p>
            <Link href="/docs/concepts/splitfiles">
              Read more about Splitfiles
            </Link>
          </Box>

          <Box className="feature">
            <IconConceptCow
              color="primary"
              size={"6rem"}
              extraStyle={{ display: "inline-flex" }}
            />
            <h3>Treat your data like cattle</h3>
            <p>
              Stop treating your datasets like pets. Use Splitgraph to gain confidence
              about where data in your warehouse came from and how to rebuild it from scratch.
            </p>
            <Link href="/product/splitgraph/philosophy#data-as-cattle">Read about our philosophy</Link>
          </Box>
        </Box>
      </section>

      <section className="lp-section lp-cta" sx={ctaSectionStyle}>
        <h2 sx={{ textTransform: "uppercase" }}>
          <span sx={{ fontWeight: 200 }}>Data scientists</span>
          <br />
          <br />
          spend 80% of their time
          <br />
          <br />
          <span sx={{ fontWeight: 200 }}>cleaning and preparing data</span>
        </h2>

        <Link
          className="button-link mobile-shrink"
          href="/docs/getting-started/five-minute-demo"
        >
          Time to try something new?
        </Link>

        <Link className="muted-link" href="/explore">
          Explore public data &raquo;
        </Link>
      </section>

      <Footer />
    </LandingPageLayout>
  );
};

export default withTheme(LandingPage);
