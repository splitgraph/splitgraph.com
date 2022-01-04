import { pencilIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconPencil = (props: IIconProps) => {
  return <BaseIcon iconSlug={"pencilGray"} svgURI={pencilIconURI} {...props} />;
};

export default IconPencil;
