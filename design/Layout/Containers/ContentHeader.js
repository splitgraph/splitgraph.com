import { Box } from "../../index";
import { useMemo } from "react";

const getStyle = depth => ({
  paddingLeft: 4,
  paddingRight: 4,
  "@media (min-width: 769px)": {
    backgroundColor: "white"
  },
  "@media (max-width: 768px)": {
    backgroundColor: "gray",
    paddingTop: `${4 * (depth - 1)}rem`
  }

  // overflowX: "hidden"
});

export default ({ children, depth }) => {
  return <Box sx={getStyle(depth)}>{children}</Box>;
};
