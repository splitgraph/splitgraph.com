/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx, Box } from "theme-ui";
import * as React from "react";

export interface IHeaderRightProps {
  children?: React.ReactNode;
}

const HeaderRight = ({ children }: IHeaderRightProps) => {
  return <Box className="header--right">{children}</Box>;
};

export default HeaderRight;
