/** @jsxImportSource theme-ui */
import { Box } from "@theme-ui";

const getStyle = (depth) => ({
  paddingLeft: 4,
  paddingRight: 4,
  "@media (min-width: 769px)": {
    backgroundColor: "white",
  },
  "@media (max-width: 768px)": {
    backgroundColor: "primary",
    color: "white",
    borderRadius: "40px",
    paddingTop: `${4 * (depth - 1)}rem`,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    boxShadow: "0 0 4px rgba(0, 0, 0, .125)",
  },
});

const ContentHeader = ({ children, depth }) => {
  return <Box sx={getStyle(depth)}>{children}</Box>;
};

export default ContentHeader;
