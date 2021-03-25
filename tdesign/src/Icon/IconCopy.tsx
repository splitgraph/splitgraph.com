/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { copyIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconCopy = (props: IIconProps) => {
  return <BaseIcon iconSlug={"copy"} svgURI={copyIconURI} {...props} />;
};

export default IconCopy;
