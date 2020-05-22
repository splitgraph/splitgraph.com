// @jsx jsx
import { jsx } from "theme-ui";
import React, { useMemo } from "react";

import { defaultTheme } from "@splitgraph/design";

import { Link } from "@splitgraph/docs/components";
import { InnerPageLayout } from "@splitgraph/docs/components/InnerPageLayout";
import withTheme from "@splitgraph/docs/hocs/withTheme";

import { NextSeo } from "next-seo";

const mdxComponents = {
  pre: ({ children, ...rest }) => (
    <pre sx={defaultTheme.styles.pre} {...rest}>
      {children}
    </pre>
  ),
  code: ({ children, ...rest }) => (
    <code sx={defaultTheme.styles.code} {...rest}>
      {children}
    </code>
  ),
  inlineCode: ({ children, ...rest }) => (
    <code sx={defaultTheme.styles.inlineCode} {...rest}>
      {children}
    </code>
  ),
};

const withBasicLayout = ({ MdxPage, meta = {}, contentTree, Link }) => {
  mdxComponents.a = Link;

  const WithBasicLayout = ({ router }) => {
    return (
      <InnerPageLayout
        extraStyle={{
          ".main-content": {
            backgroundColor: "white",
            a: {
              variant: "links.primary",
            },
          },
          "header, article": {
            paddingLeft: "calc((100vw - 100ch)/2)",
            paddingRight: "calc((100vw - 100ch)/2)",
          },
        }}
      >
        <NextSeo title={meta.title} />
        <header>
          <h1>{meta.title}</h1>
        </header>
        <article>
          <MdxPage components={mdxComponents} />
        </article>
      </InnerPageLayout>
    );
  };

  WithBasicLayout.displayName = `WithBasicLayout`;

  return withTheme(WithBasicLayout);
};

export default withBasicLayout;
