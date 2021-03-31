/** @jsxImportSource theme-ui */
import { Box, ThemeUIStyleObject } from "theme-ui";
import * as React from "react";

export interface IMainContentProps {
  children: React.ReactNode;
  extraStyle?: ThemeUIStyleObject;
}

const mainContentStyle = {} as ThemeUIStyleObject;

const MainContent = ({ children, extraStyle = {} }: IMainContentProps) => {
  const outerContainerStyle = {
    backgroundColor: "white",
    minHeight: "100vh",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
    ...extraStyle,
  } as ThemeUIStyleObject;

  return (
    <Box className="main-content" sx={outerContainerStyle}>
      <Box sx={mainContentStyle}>{children}</Box>
    </Box>
  );
};

export default MainContent;
