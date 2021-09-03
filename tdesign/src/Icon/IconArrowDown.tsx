import { arrowDownURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconArrowDown = (props: IIconProps) => {
  return <BaseIcon iconSlug={"arrowDown"} svgURI={arrowDownURI} {...props} />;
};

export default IconArrowDown;
