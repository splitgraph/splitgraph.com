/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

export interface ILogoTextProps {
  text?: string;
}

const LogoText = ({ text = "Splitgraph" }: ILogoTextProps) => {
  return <span className="logo-text">{text}</span>;
};

export default LogoText;
