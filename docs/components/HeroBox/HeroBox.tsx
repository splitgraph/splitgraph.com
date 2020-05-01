// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

export interface IHeroBoxProps {
  children?: React.ReactNode;
}

const containerStyle = {
  backgroundColor: "heavy",
  minHeight: "50vh",
  color: "light",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
} as SystemStyleObject;

export default ({ children }: IHeroBoxProps) => {
  return <Box sx={containerStyle}>{children}</Box>;
};
