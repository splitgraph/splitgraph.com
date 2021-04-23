import { Box, BoxProps } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

// MUI supports variants but not for the default <Box> component;
// https://github.com/mui-org/material-ui/issues/25759
// Thus to support previous <Box variant="paddedContentArea"> we manually inject the style

export interface BoxOverrideProps extends BoxProps {
  variant?: "paddedContentArea" | "basicWhite" | "errorNotice" | "errorText";
  sx?: SxProps<Theme>;
}

const paddedContentAreaStyle = {
  paddingLeft: ["2rem", "2rem", "10%"],
  paddingRight: ["2rem", "2rem", "10%"],
};

const BoxOverride = (props: BoxOverrideProps) => {
  const { variant, sx, ...rest } = props;
  if (variant === "paddedContentArea") {
    return <Box sx={{ ...sx, ...paddedContentAreaStyle }} {...rest} />;
  }
  return <Box {...rest} />;
};

export default BoxOverride;
