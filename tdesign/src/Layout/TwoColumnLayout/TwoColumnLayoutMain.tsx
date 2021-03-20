// @jsx jsx
import { jsx } from "theme-ui";
import * as React from "react";

export interface TwoColumnLayoutMainProps {
  children?: React.ReactNode;
}

export default ({ children }: TwoColumnLayoutMainProps) => {
  return <div className="two-col-main">{children}</div>;
};
