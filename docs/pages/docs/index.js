/** @jsxImportSource theme-ui */
import { Box, ThemeUIStyleObject } from "theme-ui";

import { NextSeo } from "next-seo";

import withTheme from "@splitgraph/docs/hocs/withTheme";
import { InnerPageLayout } from "@splitgraph/docs/components/InnerPageLayout";
import {
  Link,
  DividedBox,
  BoxSet,
  BoxTwo,
  BoxThree,
} from "@splitgraph/docs/components";

import { Octicon } from "@splitgraph/tdesign";

const DocsBox = ({ header, body, anchor, href }) => {
  return (
    <BoxThree
      renderHeading={() => header}
      renderBody={() => body}
      renderFooter={() => <Link href={href}>{anchor}</Link>}
      footerStyle={{
        a: {
          backgroundColor: "primary",
          width: "100%",
          textAlign: "center",
        },
      }}
    />
  );
};

const DocsIndexPage = () => {
  return (
    <InnerPageLayout
      extraStyle={{
        ".splitgraph-footer": {
          borderTop: 0,
        },
      }}
    >
      <NextSeo title="Documentation" />
      <header>
        <h1>Documentation</h1>
      </header>
      <section>
        <h2>Orientation</h2>
        <BoxSet>
          <DocsBox
            header={"Introduction"}
            body={
              "Learn the basics of Splitgraph, and how you can use it to work with data like you work with code."
            }
            anchor={"Read the Intro"}
            href={"/docs/getting-started/introduction"}
          />

          <DocsBox
            header={"Five Minute Demo"}
            body={
              "In the five minute demo, you'll learn the most important features" +
              " of Splitgraph. Start with ingesting some data, then build a derivative " +
              " dataset from it using Splitfiles. Learn about provenance and how you" +
              " can push data back upstream."
            }
            anchor={"Try it in Five Minutes"}
            href={"/docs/getting-started/five-minute-demo"}
          />

          <DocsBox
            header={"Frequently Asked Questions"}
            body={
              "Get answers to frequently asked questions about Splitgraph." +
              " Learn what Splitgraph is, why and when to use it, and about its performance."
            }
            anchor={"See the FAQ"}
            href={"/docs/getting-started/frequently-asked-questions"}
          />
        </BoxSet>
      </section>
      <section>
        <h2>Reference</h2>
        <BoxSet>
          <BoxTwo
            renderHeading={() => (
              <>
                <code>sgr</code> Command Line Interface
              </>
            )}
            renderBody={() =>
              "sgr is the main command line tool used to work with" +
              " splitgraph images. Use it to ingest data, work with splitfiles," +
              " and push data to splitgraph cloud."
            }
            renderFooter={() => (
              <Link href="/docs/sgr/image-management-creation/checkout">
                <code>sgr</code> CLI reference
              </Link>
            )}
          />
          <BoxTwo
            renderHeading={() => "Python API"}
            renderBody={() =>
              "All Splitgraph functionality is available in the Python API," +
              " offering first-class support for data science workflows including" +
              " Jupyter notebooks and Pandas dataframes."
            }
            renderFooter={() => (
              <Link href="/docs/python-api/splitgraph.core">
                Python API Docs
              </Link>
            )}
          />
        </BoxSet>
      </section>
      <section
        sx={{ paddingLeft: "0 !important", paddingRight: "0 !important" }}
      >
        <DividedBox
          colors={["#fff", "#36678d"]}
          MidComponent={({ children, ...rest }) => (
            <Box {...rest}>{children}</Box>
          )}
          containerStyle={{
            paddingBottom: "2rem",
            paddingTop: "2rem",
          }}
          midStyle={{
            paddingTop: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            a: {
              variant: "links.primary",
            },
          }}
        >
          <h2>Community</h2>
          <Box
            sx={{
              padding: "1rem",
              border: "1px solid",
              borderColor: "gray",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Octicon />
            <Link href="https://www.github.com/splitgraph/splitgraph">
              Splitgraph on GitHub
            </Link>
          </Box>
        </DividedBox>
      </section>
    </InnerPageLayout>
  );
};

export default withTheme(DocsIndexPage);
