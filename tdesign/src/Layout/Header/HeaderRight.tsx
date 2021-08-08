import * as React from "react";
import { Box } from "@splitgraph/tdesign";

export interface IHeaderRightProps {
  children?: React.ReactNode;
}

const HeaderRight = ({ children }: IHeaderRightProps) => {
  return <Box className="header--right">{children}</Box>;
};

export default HeaderRight;
