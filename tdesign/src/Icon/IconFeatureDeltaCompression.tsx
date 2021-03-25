/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { featureDeltaCompressionIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureDeltaCompression = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureDeltaCompression"}
      svgURI={featureDeltaCompressionIconURI}
      {...props}
    />
  );
};

export default IconFeatureDeltaCompression;
