import { chevronLeftIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronLeft = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"chevronLeft"} svgURI={chevronLeftIconURI} {...props} />
  );
};

export default IconChevronLeft;
