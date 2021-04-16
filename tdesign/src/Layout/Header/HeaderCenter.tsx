/** @jsxImportSource @emotion/react */
import * as React from "react";
import { Box } from "@material-ui/core";

export interface IHeaderCenterProps {
  children?: React.ReactNode;
}

const HeaderCenter = ({ children }: IHeaderCenterProps) => {
  return <Box className="header--center">{children}</Box>;
};

export default HeaderCenter;
