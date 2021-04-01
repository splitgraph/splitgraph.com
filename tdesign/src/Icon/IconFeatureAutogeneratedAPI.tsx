/** @jsxImportSource theme-ui */
// @ts-ignore

import { featureAutogeneratedAPIIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureAutogeneratedAPI = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureAutogeneratedAPI"}
      svgURI={featureAutogeneratedAPIIconURI}
      {...props}
    />
  );
};

export default IconFeatureAutogeneratedAPI;
