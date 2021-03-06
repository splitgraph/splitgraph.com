import { Box } from "../../index";
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

export default ({ children, depth }) => {
  return <Box sx={getStyle(depth)}>{children}</Box>;
};
