/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

import { Link } from "../Link";

import { formatDate } from "../BlogPost";

interface IBlogPostMetadata {
  id: string;
  title: string;
  authors: string[];
  date: string;
  topics?: string[];
  description: string;
  related?: {
    url: string;
    metadata: Omit<IBlogPostMetadata, "related">;
  }[];
}

export type { IBlogPostMetadata };

export interface IBlogPostItemProps {
  url: string;
  metadata: IBlogPostMetadata;
}

const itemBoxStyle = {
  variant: "links.unstyled",
  backgroundColor: "white !important",
  padding: "1rem",
  boxShadow: "card",
  display: "flex",
  width: "100%",
  flexDirection: "column",
  marginBottom: "2rem",
  ":hover": {
    boxShadow: "cardHover",
    textDecoration: "none !important",
  },
  ".top-row": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "2rem",
  },
  ".blog-title": {
    fontWeight: "bold",
    color: "primary",
    fontSize: "1.5rem",
    paddingRight: "1rem",
  },
  ".blog-byline": {
    color: "heavy",
    opacity: "0.5",
    fontStyle: "italic",
    textTransform: "uppercase",
    fontSize: "small",
    minWidth: "15ch",
    textAlign: "right",
  },
  ".blog-description": {
    color: "heavy",
  },
} as SystemStyleObject;

const BlogPostItem = ({ url, metadata }: IBlogPostItemProps) => {
  const formattedDate = formatDate(metadata.date);

  return (
    <Link href={url} sx={itemBoxStyle}>
      <Box className="top-row">
        <Box className="blog-title">{metadata.title}</Box>
        <Box className="blog-byline" title={formattedDate.hoverValue}>
          {formattedDate.value}
        </Box>
      </Box>
      <Box className="bot-row blog-description">{metadata.description}</Box>
    </Link>
  );
};

export default BlogPostItem;
