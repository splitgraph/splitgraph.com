import { featureSplitfilesIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureSplitfiles = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureSplitfiles"}
      svgURI={featureSplitfilesIconURI}
      {...props}
    />
  );
};

export default IconFeatureSplitfiles;
