// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

// import { Link } from "../Link"
import { DividedBox } from "../Boxes/DividedBox";
import { NextSeo } from "next-seo";

import { IBlogPostMetadata } from "../BlogPostItem";
import { BlogPostHeaderMetadata } from "./BlogPostHeaderMetadata";

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
          "rgba(13,24,33,1) 0%,rgba(54,102,141,1) 60%,#000000 40%",
          "#fff",
        ]}
        TopComponent={({ ...rest }) => <h1 {...rest}>{meta.title}</h1>}
        MidComponent={({ children, ...rest }) => (
          <div {...rest}>{children}</div>
        )}
        containerStyle={{
          // paddingBottom: "2rem",
          paddingTop: "2rem",
        }}
      >
        <BlogPostHeaderMetadata {...meta} />
      </DividedBox>
      <article className="main-content">{children}</article>
    </>
  );
};

export default BlogPost;
