import { blankCircleURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

export const IconBlankCircle = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"blankCircle"} svgURI={blankCircleURI} {...props} />
  );
};
