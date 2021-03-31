/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";

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
