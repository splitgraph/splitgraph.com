/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import * as React from "react";

// import { Link } from "../Link"
import { DividedBox } from "../Boxes/DividedBox";
import { NextSeo } from "next-seo";

import { IBlogPostMetadata, BlogPostItem } from "../BlogPostItem";
import { BlogPostHeaderMetadata } from "./BlogPostHeaderMetadata";
import { BlogTopicLink } from "./BlogTopicLink";
import { Breadcrumbs } from "../Breadcrumbs";

import { IconRss } from "@splitgraph/tdesign";

export interface IBlogPostProps {
  children?: React.ReactNode;
  meta: IBlogPostMetadata;
}

const BlogPost = ({ children, meta }: IBlogPostProps) => {
  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          title: meta.title,
          description: meta.description,
        }}
      />
      <DividedBox
        colors={[
          "rgba(13,24,33,1) 0%,rgba(54,102,141,1) 80%,#000000 20%",
          "#fff",
        ]}
        TopComponent={({ ...rest }) => <h1 {...rest}>{meta.title}</h1>}
        MidComponent={({ children, ...rest }) => (
          <div {...rest}>{children}</div>
        )}
        midStyle={{
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <BlogPostHeaderMetadata {...meta} />
      </DividedBox>
      <section>
        <Breadcrumbs
          crumbs={[
            { href: "/blog", anchor: "Blog" },
            { href: null, anchor: meta.title },
          ]}
        />
      </section>
      <section
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {meta.topics &&
          meta.topics.length > 0 &&
          meta.topics.map((topic) => <BlogTopicLink topic={topic} />)}
      </section>
      <section>
        <article className="main-content">{children}</article>
      </section>
      <section
        className="related-posts"
        aria-label="related posts"
        sx={{
          marginTop: "2rem",
          paddingTop: "2rem",
          paddingBottom: "1rem",
          h2: {
            textTransform: "uppercase",
            fontWeight: "normal",
            fontSize: 2,
            borderBottom: "1px solid",
            borderBottomColor: "gray",
          },
        }}
      >
        {meta.related && meta.related.length > 0 && (
          <>
            <h2>Related Posts</h2>
            {meta.related.map(({ url, metadata }) => (
              <BlogPostItem key={url} url={url} metadata={metadata} />
            ))}
          </>
        )}
      </section>
      <section className="subscribe-opts" sx={{ marginBottom: "2rem" }}>
        <a
          href="/feed.xml"
          title="Splitgraph Blog RSS Feed"
          aria-label="Splitgraph Blog RSS Feed"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <IconRss
            size={"2rem"}
            color={"primary"}
            extraStyle={{ display: "inline-flex", marginRight: "1rem" }}
          />
          Subscribe to RSS
        </a>
      </section>
    </>
  );
};

export default BlogPost;
