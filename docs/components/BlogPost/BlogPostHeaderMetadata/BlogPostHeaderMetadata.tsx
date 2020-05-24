// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { IBlogPostMetadata } from "../../BlogPostItem";

dayjs.extend(relativeTime, {
  // thresholds: [{ l: "dd", r: -23, d: "day" }],
});
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "today",
    past: "%s",
    s: "today",
    m: "today",
    mm: "today",
    h: "today",
    hh: "today",
    d: "yesterday",
    dd: "%d days ago",
    M: "a month ago",
    MM: "%d months ago",
    y: "a year ago",
    yy: "%d years ago",
  },
});

type IBlogPostHeaderMetadataProps = Pick<
  IBlogPostMetadata,
  "date" | "authors" | "topics" | "description"
>;

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  ".description": {},
  ".bot-row": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  const dateValue = dayjs(date).fromNow();
  const dateHoverValue = `Published on ${dayjs(date).format("MMMM D, YYYY")}`;

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
          title={dateHoverValue}
        >
          <span className="metadata-label date-label">Published</span>
          <span className="date-value">{dateValue}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogPostHeaderMetadata;
