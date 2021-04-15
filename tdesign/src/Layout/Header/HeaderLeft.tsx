/** @jsxImportSource @emotion/react */
import { Box } from "@material-ui/core";
import * as React from "react";

export interface IHeaderLeftProps {
  children?: React.ReactNode;
}

const HeaderLeft = ({ children }: IHeaderLeftProps) => {
  return <Box className="header--left">{children}</Box>;
};

export default HeaderLeft;
