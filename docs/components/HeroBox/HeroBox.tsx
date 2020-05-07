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
} as SystemStyleObject;

export default ({ children }: IHeroBoxProps) => {
  return (
    <Box className="lp-section" sx={containerStyle}>
      {children}
    </Box>
  );
};
