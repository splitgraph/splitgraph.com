import { Box } from "@mui/material";

import { NextSeo } from "next-seo";

import { withMUITheme } from "@splitgraph/tdesign";
import { InnerPageLayout } from "@splitgraph/docs/components/InnerPageLayout";
import { BlogPostItem, RSSMetaTag } from "@splitgraph/docs/components";

import blogPosts from "../../compile/compiledBlogPosts";

const BlogIndexPage = () => {
  return (
    <InnerPageLayout>
      <NextSeo
        title="Blog"
        description="Splitgraph Blog - Work with data like you work with code."
      />
      <RSSMetaTag />
      <header>
        <h1>Blog</h1>
      </header>
      <Box component="section" sx={{ paddingTop: "2rem" }}>
        {blogPosts.children.map(({ url, slug, metadata }) => (
          <BlogPostItem key={slug} url={url} metadata={metadata} />
        ))}
      </Box>
    </InnerPageLayout>
  );
};

export default withMUITheme(BlogIndexPage);
