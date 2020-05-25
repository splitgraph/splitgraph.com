// @jsx jsx
import { jsx } from "theme-ui";
import React from "react";

import { mdxComponents } from "@splitgraph/design";
import { Link, BlogPost, InnerPageLayout } from "@splitgraph/docs/components";
import withTheme from "@splitgraph/docs/hocs/withTheme";

import blogPosts from "@splitgraph/docs/compile/compiledBlogPosts";

const withBlogLayout = ({ MdxPage, item: { metadata } }) => {
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
        <BlogPost meta={metadata}>
          <MdxPage components={mdxComponents} />
        </BlogPost>
      </InnerPageLayout>
    );
  };

  WithBlogLayout.displayName = `WithBlogLayout`;

  return withTheme(WithBlogLayout);
};

export default withBlogLayout;
