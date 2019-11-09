import React from "react";
import { Box } from "@splitgraph/design";

export const TocStyle = {
  "ol.toc-level": {
    fontSize: 1,
    color: "primary",
    listStyleType: "none",
    padding: "1em",
    padding: "0.5em !important",
    whiteSpace: "nowrap",
    overflowX: "hidden"
  },

  ".toc-item": {
    color: "green"
  },

  ".toc-item a": {
    textDecoration: "none"
  },

  ".toc-item a:hover": {
    textDecoration: "underline"
  },

  ".toc-level": {},

  ".toc-link": {}
};

const findMatchingElement = (children = [], matchFunc) => {
  if (!children) {
    return null;
  }

  const match = children.find(matchFunc);

  if (match) {
    return match;
  }

  for (let child of children) {
    let maybeMatch =
      !!child.props && child.props.children
        ? findMatchingElement(
            React.Children.toArray(child.props.children),
            matchFunc
          )
        : null;

    if (maybeMatch) {
      return maybeMatch;
    }
  }

  return null;
};

export const OnlyTOC = ({ children, ...rest }) => {
  const originalToc = findMatchingElement(
    React.Children.toArray(children),
    el =>
      el.props &&
      (el.props.name === "nav" ||
        (el.type === "nav" && el.props.className === "toc"))
  );

  const extractedToc = originalToc ? React.cloneElement(originalToc) : null;

  return <Box sx={TocStyle}>{extractedToc}</Box>;
};
