/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { featurePeerToPeerIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeaturePeerToPeer = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featurePeerToPeer"}
      svgURI={featurePeerToPeerIconURI}
      {...props}
    />
  );
};

export default IconFeaturePeerToPeer;
