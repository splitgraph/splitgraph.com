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
