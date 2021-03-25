/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

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
