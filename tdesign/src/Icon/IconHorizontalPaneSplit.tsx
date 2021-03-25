/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { horizontalPaneSplitIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconHorizontalPaneSplit = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"horizontalPaneSplit"}
      svgURI={horizontalPaneSplitIconURI}
      {...props}
    />
  );
};

export default IconHorizontalPaneSplit;
