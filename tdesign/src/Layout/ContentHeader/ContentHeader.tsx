/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

export interface IContentHeaderProps {
  children?: React.ReactNode;
  extraStyle?: SystemStyleObject;
}

const ContentHeader = ({ children, extraStyle = {} }: IContentHeaderProps) => {
  const headerContainerStyle = {
    marginBottom: "2rem",
    color: "primary",
    ...extraStyle,
    ".content-header--banner": {
      // padding: "0.5em",
      marginBottom: "2rem",
      display: "flex",
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
  } as SystemStyleObject;

  return (
    <Box sx={headerContainerStyle}>
      <Box className="content-header--banner">{children}</Box>
    </Box>
  );
};

export default ContentHeader;
