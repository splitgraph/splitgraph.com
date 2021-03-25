/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";

import { mdxComponents } from "@splitgraph/design";
import {
  Link,
  BlogPost,
  Footer,
  InnerPageLayout,
  RSSMetaTag,
} from "../../docs/components";
import withTheme from "../../docs/hocs/withTheme";

// import blogPosts from "@splitgraph/docs/compile/compiledBlogPosts";

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
            "section > p a": {
              variant: "links.primary",
              textDecoration: "underline",
              ":hover": {
                borderBottom: "1px solid",
                borderBottomColor: "primary",
              },
            },
            img: {
              maxWidth: "100%",
            },
          },
          "nav.toc": {
            display: "none",
          },
        }}
      >
        <RSSMetaTag />
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
