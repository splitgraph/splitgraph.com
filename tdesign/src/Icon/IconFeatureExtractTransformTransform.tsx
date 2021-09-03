import { featureExtractTransformTransformIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureExtractTransformTransform = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureExtractTransformTransform"}
      svgURI={featureExtractTransformTransformIconURI}
      {...props}
    />
  );
};

export default IconFeatureExtractTransformTransform;
