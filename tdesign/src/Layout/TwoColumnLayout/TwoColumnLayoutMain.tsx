/** @jsxImportSource theme-ui */
import * as React from "react";

export interface TwoColumnLayoutMainProps {
  children?: React.ReactNode;
}

const TwoColumnLayoutMain = ({ children }: TwoColumnLayoutMainProps) => {
  return <div className="two-col-main">{children}</div>;
};

export default TwoColumnLayoutMain;
