import { Box } from "@mui/material";
// import { makeDefaultTheme } from "./legacyTheme";
import { useTheme } from "@mui/material/styles";

// const defaultTheme = makeDefaultTheme();

export const mdxComponents = {
  pre: ({ children, ...rest }) => {
    const theme = useTheme();
    return (
      <Box component="pre" sx={theme.palette.pre} {...rest}>
        {children}
      </Box>
    );
  },
  code: ({ children, ...rest }) => {
    const theme = useTheme();
    return (
      <Box component="code" sx={theme.palette.code} {...rest}>
        {children}
      </Box>
    );
  },
  inlineCode: ({ children, ...rest }) => {
    const theme = useTheme();
    return (
      <Box component="code" sx={theme.palette.inlineCode} {...rest}>
        {children}
      </Box>
    );
  },
};
export default mdxComponents;
