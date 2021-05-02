import { eraseIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconErase = (props: IIconProps) => {
  return <BaseIcon iconSlug={"erase"} svgURI={eraseIconURI} {...props} />;
};

export default IconErase;
