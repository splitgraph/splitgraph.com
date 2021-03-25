/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { starOutlineIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconStarOutline = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"starOutline"} svgURI={starOutlineIconURI} {...props} />
  );
};

export default IconStarOutline;
