import * as React from "react";
import { Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

export interface IContentHeaderProps {
  children?: React.ReactNode;
  extraStyle?: object;
}

const ContentHeader = ({ children, extraStyle = {} }: IContentHeaderProps) => {
  const theme = useTheme();

  const headerContainerStyle: SxProps<Theme> = {
    marginBottom: "2rem",
    ...extraStyle,
    ".content-header--banner": {
      display: "flex",
      flexWrap: "wrap",
      marginBottom: "1rem",
      justifyContent: "space-between",
      alignContent: "flex-start",
      alignItems: "center",
      h2: {
        color: "flambeeDarkGray.light",
        letterSpacing: "0.005em",
        fontWeight: "600",
        display: "inline",
        margin: 0,
      },
      ...(extraStyle.hasOwnProperty(".content-header--banner")
        ? extraStyle[".content-header--banner"]
        : {}),
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
  };

  return (
    <Paper elevation={0} sx={headerContainerStyle}>
      <Box className="content-header--banner">{children}</Box>
    </Paper>
  );
};

export default ContentHeader;
