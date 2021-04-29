/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";
import { makeDefaultTheme } from "@splitgraph/tdesign";

const defaultTheme = makeDefaultTheme();

const getStyle = (depth) => ({
  paddingLeft: 4,
  paddingRight: 4,
  ...defaultTheme.styles.root,
  a: {
    ...defaultTheme.links.primary,
    textDecoration: "underline",
    ":hover": {
      borderBottom: "1px solid",
      borderBottomColor: "primary",
    },
  },
  ".link-anchor-text": defaultTheme.links.primary,
});

const ContentBody = ({ children, depth }) => {
  return <Box sx={getStyle(depth)}>{children}</Box>;
};

export default ContentBody;
