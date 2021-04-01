/** @jsxImportSource theme-ui */
// @ts-ignore

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
