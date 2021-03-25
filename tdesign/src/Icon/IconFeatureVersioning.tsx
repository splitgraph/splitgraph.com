/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { featureVersioningIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureVersioning = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureVersioning"}
      svgURI={featureVersioningIconURI}
      {...props}
    />
  );
};

export default IconFeatureVersioning;
