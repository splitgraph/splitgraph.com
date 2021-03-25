/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { chevronsUpIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronsUp = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"chevronsUp"} svgURI={chevronsUpIconURI} {...props} />
  );
};

export default IconChevronsUp;
