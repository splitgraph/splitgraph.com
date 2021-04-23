import { featureVersioningIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureVersioning = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureVersioning"}
      svgURI={featureVersioningIconURI}
      {...props}
    />
  );
};

export default IconFeatureVersioning;
