import { starOutlineIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconStarOutline = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"starOutline"} svgURI={starOutlineIconURI} {...props} />
  );
};

export default IconStarOutline;
