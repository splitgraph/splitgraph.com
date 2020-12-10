// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

export interface ILogoTextProps {
  text?: string;
}

export default ({ text = "Splitgraph" }: ILogoTextProps) => {
  return <span className="logo-text">{text}</span>;
};
