/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { featureBigDataIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureBigData = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureBigData"}
      svgURI={featureBigDataIconURI}
      {...props}
    />
  );
};

export default IconFeatureBigData;
