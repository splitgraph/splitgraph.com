import React from "react";
import { Box } from "@splitgraph/design";
import { tocStyles } from "@splitgraph/design";

const TocStyle = {
  ...tocStyles,
  "ol.toc-level": {
    ...tocStyles["ol.toc-level"],
    fontSize: 1,
    padding: "0.5em !important",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    listStyleType: "none"
  }
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
