/** @jsxImportSource theme-ui */

import { mdxComponents } from "@splitgraph/tdesign";
import {
  Link,
  BlogPost,
  Footer,
  InnerPageLayout,
  RSSMetaTag,
} from "../../docs/components";
import withTheme from "../../docs/hocs/withTheme";

// Unused import but might actually be necessary to trigger something in the build process?
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
            "section > p a": {
              variant: "links.primary",
              textDecoration: "underline",
              ":hover": {
                borderBottom: "1px solid",
                borderBottomColor: "primary.main",
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
