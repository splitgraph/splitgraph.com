import * as React from "react";
import { Box } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface IContentHeaderProps {
  children?: React.ReactNode;
  extraStyle?: object;
}

const ContentHeader = ({ children, extraStyle = {} }: IContentHeaderProps) => {
  const headerContainerStyle: SxProps<Theme> = {
    marginBottom: "2rem",
    color: (theme: Theme) =>
      theme.palette.getContrastText(
        theme.palette.surfaces.light.background.main
      ),
    ...extraStyle,
    ".content-header--banner": {
      // padding: "0.5em",
      marginBottom: { md: "2rem" },
      display: { md: "flex" },
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "flex-end",
      ...(extraStyle.hasOwnProperty(".content-header--banner")
        ? extraStyle[".content-header--banner"]
        : {}),
      h2: {
        display: "inline",
        margin: 0,
      },
    },
  };

  return (
    <Box sx={headerContainerStyle}>
      <Box className="content-header--banner">{children}</Box>
    </Box>
  );
};

export default ContentHeader;
