/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { checkCircleIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconCheckCircle = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"checkCircle"} svgURI={checkCircleIconURI} {...props} />
  );
};

export default IconCheckCircle;
