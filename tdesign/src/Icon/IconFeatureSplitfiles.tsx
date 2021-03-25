/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { featureSplitfilesIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureSplitfiles = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureSplitfiles"}
      svgURI={featureSplitfilesIconURI}
      {...props}
    />
  );
};

export default IconFeatureSplitfiles;
