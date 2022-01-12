import * as React from "react";
import { Box } from "@mui/material";

export interface IHeaderLeftProps {
  children?: React.ReactNode;
}

const HeaderLeft = ({ children }: IHeaderLeftProps) => {
  return <Box className="header--left">{children}</Box>;
};

export default HeaderLeft;
