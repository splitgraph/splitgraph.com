/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { featureProvenanceIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureProvenance = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureProvenance"}
      svgURI={featureProvenanceIconURI}
      {...props}
    />
  );
};

export default IconFeatureProvenance;
