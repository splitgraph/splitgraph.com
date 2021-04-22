import * as React from "react";
import { Box } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface IMainContentProps {
  children: React.ReactNode;
  extraStyle?: SxProps<Theme>;
}

const mainContentStyle: SxProps<Theme> = {};

const MainContent = ({ children, extraStyle = {} }: IMainContentProps) => {
  const outerContainerStyle: SxProps<Theme> = {
    backgroundColor: "white",
    minHeight: "100vh",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
    ...extraStyle,
  };

  return (
    <Box className="main-content" sx={outerContainerStyle}>
      <Box sx={mainContentStyle}>{children}</Box>
    </Box>
  );
};

export default MainContent;
