import { featureCommandLineClientIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureCommandLineClient = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureCommandLineClient"}
      svgURI={featureCommandLineClientIconURI}
      {...props}
    />
  );
};

export default IconFeatureCommandLineClient;
