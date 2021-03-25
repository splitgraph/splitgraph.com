/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

export interface ILogoImageProps {
  logoURL?: string;
}

const logoImageStyle = {
  minHeight: "2rem",
  height: "2rem",
  maxHeight: "2rem",
  marginLeft: 4,
};

const defaultLogoURL = "/static/splitgraph_logo.svg";

const LogoImage = ({ logoURL = defaultLogoURL }: ILogoImageProps) => {
  return <img src={logoURL} style={logoImageStyle} alt="splitgraph logo" />;
};

export default LogoImage;
