/** @jsxImportSource theme-ui */
import { Box, ThemeUIStyleObject } from "theme-ui";

import { NextSeo } from "next-seo";

import withTheme from "@splitgraph/docs/hocs/withTheme";
import { InnerPageLayout } from "@splitgraph/docs/components/InnerPageLayout";
import { BlogPostItem, Breadcrumbs } from "@splitgraph/docs/components";
import allBlogPosts from "@splitgraph/docs/compile/compiledBlogPosts";

if (!allBlogPosts) {
  allBlogPosts = {};
}

const BlogTopicPage = ({ topic = null, blogPosts = [] }) => {
  return (
    <InnerPageLayout>
      <NextSeo title="Blog" />
      <header>
        <h1>Blog</h1>
        <h2 sx={{ marginTop: 0, color: "white" }}>{topic}</h2>
      </header>
      <section>
        <Breadcrumbs
          crumbs={[
            { href: "/blog", anchor: "Blog" },
            { href: null, anchor: "Topics" },
            ...(topic ? [{ href: null, anchor: topic }] : []),
          ]}
        />
      </section>
      <section sx={{ paddingTop: "2rem" }}>
        {blogPosts.map(({ url, slug, metadata }) => (
          <BlogPostItem key={slug} url={url} metadata={metadata} />
        ))}
      </section>
    </InnerPageLayout>
  );
};

const getTopics = (blogPosts) => {
  const topics = blogPosts.reduce(
    (acc, { metadata: { topics } }) =>
      !topics ? acc : Array.from(new Set([...acc, ...topics])),
    []
  );

  return topics;
};

const getBlogPostsByTopic = ({ blogPosts, topic }) => {
  return blogPosts.filter(({ metadata: { topics } }) => topics.includes(topic));
};

export async function getStaticProps({ params: { topic } }) {
  const blogPostsByTopic =
    getBlogPostsByTopic({
      blogPosts: allBlogPosts.children || [],
      topic,
    }) || [];

  const props = {
    topic: topic || null,
    blogPosts: blogPostsByTopic || null,
  };

  // Don't blame me for this grossness. If blog post has children = undefined,
  // then it will trigger error .blogPosts[0].children
  // https://github.com/vercel/next.js/discussions/11209#discussioncomment-35915
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

export async function getStaticPaths() {
  const topics = getTopics(allBlogPosts.children);

  return {
    paths: topics.map((topic) => ({ params: { topic } })),
    fallback: false,
  };
}

export default withTheme(BlogTopicPage);
