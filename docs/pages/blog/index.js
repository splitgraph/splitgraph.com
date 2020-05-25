// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";

import React from "react";

import { NextSeo } from "next-seo";

import withTheme from "@splitgraph/docs/hocs/withTheme";
import { InnerPageLayout } from "@splitgraph/docs/components/InnerPageLayout";
import { BlogPostItem } from "@splitgraph/docs/components";

import blogPosts from "../../compile/compiledBlogPosts";

const BlogIndexPage = () => {
  return (
    <InnerPageLayout>
      <NextSeo title="Blog" />
      <header>
        <h1>Blog</h1>
      </header>
      <section sx={{ paddingTop: "2rem" }}>
        {blogPosts.children.map(({ url, slug, metadata }) => (
          <BlogPostItem key={slug} url={url} metadata={metadata} />
        ))}
      </section>
      {/* TODO: footer */}
      <Box sx={{ padding: "8rem", backgroundColor: "heavy" }}>&nbsp;</Box>
    </InnerPageLayout>
  );
};

export default withTheme(BlogIndexPage);
