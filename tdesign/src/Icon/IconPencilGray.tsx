import { pencilGrayIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconPencilGray = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"pencilGray"} svgURI={pencilGrayIconURI} {...props} />
  );
};

export default IconPencilGray;
