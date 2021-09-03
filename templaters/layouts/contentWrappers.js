import { Children, cloneElement } from "react";
import { Box } from "@material-ui/core";
import { tocStyles } from "@splitgraph/tdesign";

const TocStyle = {
  ...tocStyles,
  "ol.toc-level": {
    ...tocStyles["ol.toc-level"],
    // fontSize: 1,
    lineHeight: 1.15,
    padding: "0.75em !important",
    listStyleType: "none",
    li: {
      marginBottom: "0.5em",
    },
  },
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
        ? findMatchingElement(Children.toArray(child.props.children), matchFunc)
        : null;

    if (maybeMatch) {
      return maybeMatch;
    }
  }

  return null;
};

export const OnlyTOC = ({ children, ...rest }) => {
  const originalToc = findMatchingElement(Children.toArray(children), (el) => {
    return el.props && el.props.className === "toc";
  });

  const extractedToc = originalToc ? cloneElement(originalToc) : null;

  return <Box sx={TocStyle}>{extractedToc}</Box>;
};
