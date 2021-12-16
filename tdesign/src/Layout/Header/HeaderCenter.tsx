import * as React from "react";
import { Box } from "@mui/material";

export interface IHeaderCenterProps {
  children?: React.ReactNode;
}

const HeaderCenter = ({ children }: IHeaderCenterProps) => {
  return <Box className="header--center">{children}</Box>;
};

export default HeaderCenter;
