/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";
import { useMemo } from "react";

import { defaultTheme, mdxComponents } from "@splitgraph/design";

import { Link } from "@splitgraph/docs/components";
import { InnerPageLayout } from "@splitgraph/docs/components/InnerPageLayout";
import withTheme from "@splitgraph/docs/hocs/withTheme";

import { NextSeo } from "next-seo";

const withBasicLayout = ({ MdxPage, meta = {}, contentTree }) => {
  mdxComponents.a = Link;

  const WithBasicLayout = () => {
    return (
      <InnerPageLayout
        charWidth={80}
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
          "nav.toc": {
            display: "none",
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
