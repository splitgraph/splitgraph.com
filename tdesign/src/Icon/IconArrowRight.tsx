import { arrowRightURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconArrowRight = (props: IIconProps) => {
  return <BaseIcon iconSlug={"arrowRight"} svgURI={arrowRightURI} {...props} />;
};

export default IconArrowRight;
