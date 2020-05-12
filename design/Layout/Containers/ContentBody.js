import { Box } from "../../index";
import { defaultTheme } from "@splitgraph/design";

const getStyle = (depth) => ({
  paddingLeft: 4,
  paddingRight: 4,
  ...defaultTheme.styles.root,
  a: defaultTheme.links.primary,
  ".link-anchor-text": defaultTheme.links.primary,
});

export default ({ children, depth }) => {
  return <Box sx={getStyle(depth)}>{children}</Box>;
};
