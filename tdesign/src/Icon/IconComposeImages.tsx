import { composeImagesIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconComposeImages = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"composeImages"}
      svgURI={composeImagesIconURI}
      {...props}
    />
  );
};

export default IconComposeImages;
