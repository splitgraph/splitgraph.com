import { updateImagesIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconUpdateImages = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"updateImages"}
      svgURI={updateImagesIconURI}
      {...props}
    />
  );
};

export default IconUpdateImages;
