/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

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
