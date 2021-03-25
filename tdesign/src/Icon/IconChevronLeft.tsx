/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { chevronLeftIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronLeft = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"chevronLeft"} svgURI={chevronLeftIconURI} {...props} />
  );
};

export default IconChevronLeft;
