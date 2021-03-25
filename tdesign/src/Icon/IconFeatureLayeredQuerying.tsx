/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { featureLayeredQueryingIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureLayeredQuerying = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureLayeredQuerying"}
      svgURI={featureLayeredQueryingIconURI}
      {...props}
    />
  );
};

export default IconFeatureLayeredQuerying;
