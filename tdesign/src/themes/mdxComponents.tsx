import { Box } from "@material-ui/core";
import { makeDefaultTheme } from "./legacyTheme";

const defaultTheme = makeDefaultTheme();

export const mdxComponents = {
  pre: ({ children, ...rest }) => (
    <Box component="pre" sx={defaultTheme.styles.pre} {...rest}>
      {children}
    </Box>
  ),
  code: ({ children, ...rest }) => (
    <Box component="code" sx={defaultTheme.styles.code} {...rest}>
      {children}
    </Box>
  ),
  inlineCode: ({ children, ...rest }) => (
    <Box component="code" sx={defaultTheme.styles.inlineCode} {...rest}>
      {children}
    </Box>
  ),
};
export default mdxComponents;
