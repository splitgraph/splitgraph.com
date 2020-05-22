// @jsx jsx
import { jsx } from "theme-ui";
import React, { useMemo } from "react";

import { defaultTheme, mdxComponents } from "@splitgraph/design";

import { Link, DividedBox } from "@splitgraph/docs/components";
import { InnerPageLayout } from "@splitgraph/docs/components/InnerPageLayout";
import withTheme from "@splitgraph/docs/hocs/withTheme";

import { NextSeo } from "next-seo";

const withBlogLayout = ({ MdxPage, meta = {}, contentTree }) => {
  mdxComponents.a = Link;

  const WithBlogLayout = () => {
    return (
      <InnerPageLayout
        charWidth={80}
        extraStyle={{
          ".main-content": {
            backgroundColor: "#fff",
            a: {
              variant: "links.primary",
            },
          },
          "nav.toc": {
            display: "none",
          },
        }}
      >
        <NextSeo title={meta.title} />
        <DividedBox
          colors={[
            "rgba(13,24,33,1) 0%,rgba(54,102,141,1) 60%,#000000 40%",
            "#fff",
          ]}
          TopComponent={({ ...rest }) => <h1 {...rest}>{meta.title}</h1>}
          MidComponent={({ children, ...rest }) => (
            <div {...rest}>{children}</div>
          )}
          containerStyle={{
            // paddingBottom: "2rem",
            paddingTop: "2rem",
          }}
        >
          {meta.description}
        </DividedBox>
        <article className="main-content">
          <MdxPage components={mdxComponents} />
        </article>
      </InnerPageLayout>
    );
  };

  WithBlogLayout.displayName = `WithBlogLayout`;

  return withTheme(WithBlogLayout);
};

export default withBlogLayout;
