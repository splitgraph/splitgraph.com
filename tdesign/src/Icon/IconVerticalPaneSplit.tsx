/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { verticalPaneSplitIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconVerticalPaneSplit = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"verticalPaneSplit"}
      svgURI={verticalPaneSplitIconURI}
      {...props}
    />
  );
};

export default IconVerticalPaneSplit;
