/** @jsxImportSource theme-ui */
// @ts-ignore

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
