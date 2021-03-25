// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

export interface IMainContentProps {
  children: React.ReactNode;
  extraStyle?: SystemStyleObject;
}

const mainContentStyle = {} as SystemStyleObject;

const MainContent = ({ children, extraStyle = {} }: IMainContentProps) => {
  const outerContainerStyle = {
    backgroundColor: "white",
    minHeight: "100vh",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
    ...extraStyle,
  } as SystemStyleObject;

  return (
    <Box className="main-content" sx={outerContainerStyle}>
      <Box sx={mainContentStyle}>{children}</Box>
    </Box>
  );
};

export default MainContent;
