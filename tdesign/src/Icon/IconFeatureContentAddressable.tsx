/** @jsxImportSource theme-ui */
// @ts-ignore

import { featureContentAddressableIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureContentAddressable = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureContentAddressable"}
      svgURI={featureContentAddressableIconURI}
      {...props}
    />
  );
};

export default IconFeatureContentAddressable;
