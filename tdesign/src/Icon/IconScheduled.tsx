import { scheduledURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconScheduled = (props: IIconProps) => {
  return <BaseIcon iconSlug={"scheduled"} svgURI={scheduledURI} {...props} />;
};

export default IconScheduled;
