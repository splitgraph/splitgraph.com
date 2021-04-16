/** @jsxImportSource @emotion/react */
import * as React from "react";
import { Box } from "@material-ui/core";

export interface IHeaderRightProps {
  children?: React.ReactNode;
}

const HeaderRight = ({ children }: IHeaderRightProps) => {
  return <Box className="header--right">{children}</Box>;
};

export default HeaderRight;
