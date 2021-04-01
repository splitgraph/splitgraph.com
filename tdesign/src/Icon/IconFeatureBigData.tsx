/** @jsxImportSource theme-ui */
// @ts-ignore

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
