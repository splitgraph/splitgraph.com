import { arrowCircleRightURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

export const IconArrowCircleRight = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"arrowCircleRight"}
      svgURI={arrowCircleRightURI}
      {...props}
    />
  );
};
