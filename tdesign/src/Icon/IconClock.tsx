import { clockURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconClock = (props: IIconProps) => {
  return <BaseIcon iconSlug={"clock"} svgURI={clockURI} {...props} />;
};

export default IconClock;
