/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { dollarSignIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconDollarSign = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"dollarSign"} svgURI={dollarSignIconURI} {...props} />
  );
};

export default IconDollarSign;
