/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { featureCacheIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureCache = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureCache"}
      svgURI={featureCacheIconURI}
      {...props}
    />
  );
};

export default IconFeatureCache;
