import { Box, BoxProps } from "@material-ui/core";
// import type { SxProps } from "@material-ui/system";
// import type { Theme } from "@material-ui/core/styles/createMuiTheme";

// MUI supports variants but not for the default <Box> component;
// https://github.com/mui-org/material-ui/issues/25759
// The purpose of this file is to support previous <Box variant="paddedContentArea"> and other variants

export interface BoxOverrideProps extends BoxProps {
  variant?:
    | "paddedContentArea"
    | "basicWhite"
    | "errorNotice"
    | "errorText"
    | "notice";
  // sx?: SxProps<Theme>;
}

const paddedContentAreaStyle = {
  paddingLeft: "2rem",
  paddingRight: "2rem",
};
const errorNoticeStyle = {
  display: "flex",
  alignItems: "center",
  '[class^="sg-icon-"]': {
    display: "inline-block",
    marginRight: "1em",
  },
  borderWidth: "1px",
  borderStyle: "solid",
  padding: ".5em",
  a: {
    variant: "links.primary",
  },
  backgroundColor: "errorBackground.main",
  borderColor: "danger.main",
};
const errorTextStyle = {
  color: (theme) => theme.palette.danger.main,
};
const basicWhiteStyle = {
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: (theme) => theme.palette.primary.main,
  backgroundColor: "white",
  padding: "1rem",
};
const noticeStyle = {
  display: "flex",
  alignItems: "center",
  '[class^="sg-icon-"]': {
    display: "inline-block",
    marginRight: "1em",
  },
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "primary.main",
  backgroundColor: "sglightblue.light",
  padding: ".5em",
  a: {
    backgroundColor: "transparent",
    cursor: "pointer",
    outline: 0,
    color: "primary.main",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
    "&[disabled]": {
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },
};

const BoxOverride = (props: BoxOverrideProps) => {
  const { variant, sx, ...rest } = props;
  if (variant === "paddedContentArea") {
    return <Box sx={{ ...sx, ...paddedContentAreaStyle }} {...rest} />;
  } else if (variant === "errorNotice") {
    return <Box sx={{ ...sx, ...errorNoticeStyle }} {...rest} />;
  } else if (variant === "errorText") {
    return <Box sx={{ ...sx, ...errorTextStyle }} {...rest} />;
  } else if (variant === "basicWhite") {
    return <Box sx={{ ...sx, ...basicWhiteStyle }} {...rest} />;
  } else if (variant === "notice") {
    return <Box sx={{ ...sx, ...noticeStyle }} {...rest} />;
  }
  return <Box sx={sx} {...rest} />;
};

export default BoxOverride;
