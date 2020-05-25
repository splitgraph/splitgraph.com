// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

import { IBlogPostMetadata } from "../../BlogPostItem";

import formatDate from "../formatDate";

type IBlogPostHeaderMetadataProps = Pick<
  IBlogPostMetadata,
  "date" | "authors" | "topics" | "description"
>;

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  ".description": {
    marginBottom: "2rem",
  },
  ".bot-row": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: "0.5",
  },
  ".metadata-container": {
    display: "flex",
    flexDirection: "column",
  },
  ".metadata-label": {
    textTransform: "uppercase",
    fontSize: "small",
  },
} as SystemStyleObject;

const BlogPostHeaderMetadata = ({
  date,
  authors,
  // topics,
  description,
}: IBlogPostHeaderMetadataProps) => {
  const authorsLabel = authors.length > 1 ? "Authors" : "Author";
  const authorsValue = authors.join(", ");

  const formattedDate = formatDate(date);

  return (
    <Box sx={containerStyle}>
      <p className="description" area-label="description">
        {description}
      </p>
      <Box className="bot-row">
        <Box className="metadata-container authors-container">
          <span className="metadata-label authors-label">{authorsLabel}</span>
          <span className="authors-value">{authorsValue}</span>
        </Box>
        <Box
          className="metadata-container date-container"
          title={formattedDate.hoverValue}
        >
          <span className="metadata-label date-label">Published</span>
          <span className="date-value">{formattedDate.value}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogPostHeaderMetadata;
