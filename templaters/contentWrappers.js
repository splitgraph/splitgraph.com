import React from "react";
import { Box } from "@splitgraph/design";

const TocWrapperStyle = {
  "ol.toc-level": {
    fontSize: 1,
    color: "primary",
    listStyleType: "none",
    padding: "1em"
  },

  ".toc-item": {
    color: "green"
  },

  ".toc-level": {},

  ".toc-link": {}
};

export const OnlyTOC = ({ children, ...rest }) => {
  // TODO: Not guaranteed to always be the first child. need to filter on type

  return <Box sx={TocWrapperStyle}>{React.cloneElement(children[0])}</Box>;
};
