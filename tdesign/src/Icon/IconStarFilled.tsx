/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { starFilledIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconStarFilled = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"starFilled"} svgURI={starFilledIconURI} {...props} />
  );
};

export default IconStarFilled;
