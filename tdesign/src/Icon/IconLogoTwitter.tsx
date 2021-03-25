/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { logoTwitterIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconLogoTwitter = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"logoTwitter"} svgURI={logoTwitterIconURI} {...props} />
  );
};

export default IconLogoTwitter;
