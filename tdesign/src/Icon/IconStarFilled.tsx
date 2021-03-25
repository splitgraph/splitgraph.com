/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { starFilledIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconStarFilled = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"starFilled"} svgURI={starFilledIconURI} {...props} />
  );
};

export default IconStarFilled;
