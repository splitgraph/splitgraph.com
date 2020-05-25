// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

import { Link } from "../../Link";

export interface IBlogTopicLinkProps {
  topic: string;
}

const BlogTopicLink = ({ topic }: IBlogTopicLinkProps) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "gray",
        padding: "5px",
        display: "inline",
        marginRight: "1em",
        marginBottom: "1em",
      }}
    >
      <Link href="/blog/topic/[topic]" as={`/blog/topic/${topic}`}>
        {topic}
      </Link>
    </Box>
  );
};

export default BlogTopicLink;
