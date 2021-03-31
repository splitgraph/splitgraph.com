/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";
import * as React from "react";

export interface IHeaderCenterProps {
  children?: React.ReactNode;
}

const HeaderCenter = ({ children }: IHeaderCenterProps) => {
  return <Box className="header--center">{children}</Box>;
};

export default HeaderCenter;
