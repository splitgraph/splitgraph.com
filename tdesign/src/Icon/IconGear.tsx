/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { gearIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconGear = (props: IIconProps) => {
  return <BaseIcon iconSlug={"gear"} svgURI={gearIconURI} {...props} />;
};

export default IconGear;
