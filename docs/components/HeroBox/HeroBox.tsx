// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

export interface IHeroBoxProps {
  children?: React.ReactNode;
  extraStyle?: SystemStyleObject;
}

const containerStyle = {
  variant: "backgrounds.dark2light",
  minHeight: "50vh",
  color: "light",
} as SystemStyleObject;

export default ({ children, extraStyle = {} }: IHeroBoxProps) => {
  return <Box sx={{ ...containerStyle, ...extraStyle }}>{children}</Box>;
};
