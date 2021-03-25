/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx, Box } from "theme-ui";

import { Link } from "../../Link";
import { MarketingNotice } from "../../MarketingNotice";
import formatDate from "../formatDate";

import compiledBlogPosts from "@splitgraph/docs/compile/compiledBlogPosts";

export interface IBlogPostMarketingNoticeProps {}

const BlogPostMarketingNotice = ({}: IBlogPostMarketingNoticeProps) => {
  const latestBlogPost = {
    title: compiledBlogPosts.children[0].metadata.title,
    date: formatDate(compiledBlogPosts.children[0].metadata.date),
    url: compiledBlogPosts.children[0].url,
  };

  console.log("latestBlogPosts", compiledBlogPosts);

  return (
    <MarketingNotice>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: ["column", "row", "row"],
          ".flex-col": {
            textAlign: "center",
          },
          ".muted": {
            fontWeight: "lighter",
            color: "heavy",
          },
          ".padded": {
            paddingLeft: "1ch",
            paddingRight: "1ch",
          },
        }}
      >
        <span className="flex-col muted">Latest Blog&nbsp;&nbsp;</span>
        <strong className="flex-col padded">
          "<Link href={latestBlogPost.url}>{latestBlogPost.title}</Link>"
        </strong>
        <strong
          className="flex-col muted"
          title={latestBlogPost.date.hoverValue}
        >
          {latestBlogPost.date.value}
        </strong>
      </Box>
    </MarketingNotice>
  );
};

export default BlogPostMarketingNotice;
