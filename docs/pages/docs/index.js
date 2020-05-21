// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";

import React from "react";

import { NextSeo } from "next-seo";

import withTheme from "@splitgraph/docs/hocs/withTheme";
import { InnerPageLayout } from "@splitgraph/docs/components/InnerPageLayout";
import {
  Link,
  DividedBox,
  BoxSet,
  BoxOne,
  BoxTwo,
  BoxThree,
} from "@splitgraph/docs/components";

const DocsIndexPage = () => {
  return (
    <InnerPageLayout
      extraStyle={{
        minHeight: "100vh",
        ".main-content": {
          maxWidth: "100vw",
        },
        header: {
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
          width: "100%",
          maxWidth: "100vw",
          paddingLeft: ["1rem", "1rem", "calc((100% - 100ch)/2)"],
          paddingRight: ["1rem", "1rem", "calc((100% - 100ch)/2)"],
          background:
            "linear-gradient(to bottom,rgba(13,24,33,1) 0%,rgba(54,102,141,1) 60%,#000000 40%,#dddddf 40%,#dddddf 60%)",
          h1: {
            color: "light",
            fontSize: [5, 5, 6],
            paddingLeft: ["1rem", "1rem", "4rem"],
            paddingRight: "4rem",
            marginBottom: "0",
          },
          h2: {
            backgroundColor: "white",
            color: "primary",
            paddingTop: "4rem",
            paddingBottom: "4rem",
            marginLeft: ["0.5rem", "0.5rem", "2rem"],
            marginRight: ["0.5rem", "0.5rem", "2rem"],
            paddingLeft: "1rem",
            paddingRight: "1rem",
            width: [
              "calc(100% - 1rem)",
              "calc(100% - 1rem)",
              "calc(100% - 4rem)",
            ],
            borderRadius: 8,
            border: "1px solid heavy",
            boxShadow: "0 0 1rem rgba(0, 0, 0, .25)",
          },
        },
        section: {
          paddingLeft: ["0.5rem", "2rem", "calc((100% - 120ch)/2)"],
          paddingRight: ["0.5rem", "2rem", "calc((100% - 120ch)/2)"],
          maxWidth: "100vw",
        },
      }}
    >
      <NextSeo title="Documentation" />
      {/* <header>
        <h1>Documentation</h1>
        <h2>
          Learn how to use Splitgraph <br /> <br /> to work with data like you
          work with code
        </h2>
      </header> */}

      <section>
        <h2>Box 3</h2>

        <BoxSet>
          <BoxThree
            renderHeading={() =>
              "Header of varying length, sometimes really long"
            }
            renderBody={() =>
              "Some blurb about doing things and being nice about them and stuff"
            }
            renderFooter={() => <a href="#">Learn more about the thing</a>}
          />

          <BoxThree
            renderHeading={() =>
              "Header of varying length, sometimes really long"
            }
            renderBody={() =>
              "Some blurb about doing things and being nice about them and stuff"
            }
            renderFooter={() => <a href="#">Learn more about the thing</a>}
          />

          <BoxThree
            renderHeading={() =>
              "Header of varying length, sometimes really long"
            }
            renderBody={() =>
              "Some blurb about doing things and being nice about them and stuff"
            }
            renderFooter={() => <a href="#">Learn more about the thing</a>}
          />
        </BoxSet>
      </section>

      <DividedBox
        topColor={"yellow"}
        botColor={"red"}
        colors={[
          "rgba(13,24,33,1) 0%,rgba(54,102,141,1) 60%,#000000 40%",
          "red",
        ]}
        renderMid={({ children }) => <h2>{children}</h2>}
        containerStyle={{
          paddingBottom: "2rem",
          paddingTop: "2rem",
        }}
      >
        Learn how to use Splitgraph <br /> <br /> to work with data like you
        work with code
      </DividedBox>

      {/* "linear-gradient(to bottom,rgba(13,24,33,1) 0%,rgba(54,102,141,1) 60%,#000000 40%,#dddddf 40%,#dddddf 60%)", */}

      <section>
        <h2>Box 2</h2>

        <BoxSet>
          <BoxTwo
            renderHeading={() =>
              "Header of varying length, sometimes really long"
            }
            renderBody={() =>
              "Some blurb about doing things and being nice about them and stuff"
            }
            renderFooter={() => <a href="#">Learn more about the thing</a>}
          />

          <BoxTwo
            renderHeading={() =>
              "Header of varying length, sometimes really long"
            }
            renderBody={() =>
              "Some blurb about doing things and being nice about them and stuff"
            }
            renderFooter={() => <a href="#">Learn more about the thing</a>}
          />

          <BoxTwo
            renderHeading={() =>
              "Header of varying length, sometimes really long"
            }
            renderBody={() =>
              "Some blurb about doing things and being nice about them and stuff"
            }
            renderFooter={() => <a href="#">Learn more about the thing</a>}
          />

          <BoxTwo
            renderHeading={() =>
              "Header of varying length, sometimes really long"
            }
            renderBody={() =>
              "Some blurb about doing things and being nice about them and stuff"
            }
            renderFooter={() => <a href="#">Learn more about the thing</a>}
          />
        </BoxSet>
      </section>

      <section>
        <h2>Box 1</h2>

        <BoxSet>
          <BoxOne
            renderHeading={() =>
              "Header of varying length, sometimes really long"
            }
            renderBody={() =>
              "Some blurb about doing things and being nice about them and stuff"
            }
            renderFooter={() => <a href="#">Learn more about the thing</a>}
          />

          <BoxOne
            renderHeading={() =>
              "Header of varying length, sometimes really long"
            }
            renderBody={() =>
              "Some blurb about doing things and being nice about them and stuff"
            }
            renderFooter={() => <a href="#">Learn more about the thing</a>}
          />
        </BoxSet>
      </section>
    </InnerPageLayout>
  );
};

export default withTheme(DocsIndexPage);
