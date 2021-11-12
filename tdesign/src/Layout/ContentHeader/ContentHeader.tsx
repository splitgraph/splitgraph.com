import * as React from "react";
import { Box, Paper } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface IContentHeaderProps {
  children?: React.ReactNode;
  extraStyle?: object;
}

const ContentHeader = ({ children, extraStyle = {} }: IContentHeaderProps) => {
  const theme = useTheme();

  const contentHeaderBannerStyle: SxProps<Theme> = {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "1rem",
    justifyContent: "space-between",
    alignContent: "flex-start",
    alignItems: "flex-end",
    h2: {
      color: "flambeeDarkGray.light",
      letterSpacing: "0.005em",
      fontWeight: "600",
      display: "inline",
      margin: 0,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start !important",
    },
    ".repo-list-title": {
      color: "flambeeDarkGray.dark",
      fontWeight: "600",
      fontSize: "20px",
      lineHeight: "20px",
      letterSpacing: "0.005em",
      display: "inline",
      margin: 0,
      marginBottom: "1rem",
      [theme.breakpoints.up("sm")]: { flex: "1 0 50%" },
    },
    ".repo-list-link": {
      color: "flambeeRed.main",
      [theme.breakpoints.down("sm")]: { order: 99 },
      [theme.breakpoints.up("sm")]: {
        flex: "1 0 50%",
        textAlign: "end",
      },
    },
    ".repo-list-subtitle": {
      color: "flambeeDarkGray.light",
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: "normal",
      [theme.breakpoints.up("sm")]: { flex: "0 1 100%" },
    },
  };

  const headerContainerStyle: SxProps<Theme> = {
    marginBottom: "2rem",
    ...extraStyle,
    ".content-header--banner": {
      ...contentHeaderBannerStyle,
    },
  };

  return (
    <Paper elevation={0} sx={headerContainerStyle}>
      <Box className="content-header--banner">{children}</Box>
    </Paper>
  );
};

export default ContentHeader;
