/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx, Box, ThemeUIStyleObject } from "theme-ui";
import * as React from "react";

export interface IHeroBoxProps {
  children?: React.ReactNode;
  extraStyle?: ThemeUIStyleObject;
}

const containerStyle = {
  variant: "backgrounds.dark2light",
  minHeight: "50vh",
  color: "light",
} as ThemeUIStyleObject;

const HeroBox = ({ children, extraStyle = {} }: IHeroBoxProps) => {
  return <Box sx={{ ...containerStyle, ...extraStyle }}>{children}</Box>;
};

export default HeroBox;
