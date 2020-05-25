// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

// import { Link } from "../Link"
import { DividedBox } from "../Boxes/DividedBox";
import { NextSeo } from "next-seo";

import { IBlogPostMetadata, BlogPostItem } from "../BlogPostItem";
import { BlogPostHeaderMetadata } from "./BlogPostHeaderMetadata";
import { Breadcrumbs } from "../Breadcrumbs";

export interface IBlogPostProps {
  children?: React.ReactNode;
  meta: IBlogPostMetadata;
}

const BlogPost = ({ children, meta }: IBlogPostProps) => {
  return (
    <>
      <NextSeo title={meta.title} description={meta.description} />
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
      <article className="main-content">{children}</article>
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
    </>
  );
};

export default BlogPost;
