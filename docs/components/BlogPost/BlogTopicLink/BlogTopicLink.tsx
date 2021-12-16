import { Box } from "@mui/material";

import { MuiLink as Link } from "@splitgraph/tdesign";

export interface IBlogTopicLinkProps {
  topic: string;
}

const BlogTopicLink = ({ topic }: IBlogTopicLinkProps) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "gray.main",
        padding: "5px",
        display: "inline",
        marginRight: "1em",
        marginBottom: "1em",
      }}
    >
      <Link href="/blog/topic/[topic]">{topic}</Link>
    </Box>
  );
};

export default BlogTopicLink;
