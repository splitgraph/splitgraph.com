/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { chevronUpIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronup = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"chevronUp"} svgURI={chevronUpIconURI} {...props} />
  );
};

export default IconChevronup;
