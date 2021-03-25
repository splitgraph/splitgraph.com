/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

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
