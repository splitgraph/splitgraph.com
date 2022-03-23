import { calendarURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconCalendar = (props: IIconProps) => {
  return <BaseIcon iconSlug={"calendar"} svgURI={calendarURI} {...props} />;
};

export default IconCalendar;
