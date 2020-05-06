// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

export interface IHeroBoxProps {
  children?: React.ReactNode;
}

const containerStyle = {
  variant: "backgrounds.dark2light",
  minHeight: "50vh",
  color: "light",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  h1: {
    fontSize: ["1.75rem", "1.75rem", "3rem"],
  },
  h2: {
    fontSize: ["1.25rem", "1.25rem", "2rem"],
    marginBottom: "2rem",
  },
  ".mobile-line-break": {
    display: ["block", "block", "none"],
  },
  "pre, code": {
    textAlign: "initial",
    // maxWidth: "100%",
  },
} as SystemStyleObject;

export default ({ children }: IHeroBoxProps) => {
  return <Box sx={containerStyle}>{children}</Box>;
};
