import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PropsWithChildren } from "react";

export const mdxComponents = {
  pre: function Pre(props: PropsWithChildren<{}>) {
    const theme = useTheme();
    return <Box component="pre" sx={theme.palette.pre} {...props} />;
  },
  code: function Code(props: PropsWithChildren<{}>) {
    const theme = useTheme();
    return <Box component="code" sx={theme.palette.code} {...props} />;
  },
  inlineCode: function InlineCode(props: PropsWithChildren<{}>) {
    const theme = useTheme();
    return <Box component="code" sx={theme.palette.inlineCode} {...props} />;
  },
};
export default mdxComponents;
