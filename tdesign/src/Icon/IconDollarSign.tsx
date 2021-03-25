/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { dollarSignIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconDollarSign = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"dollarSign"} svgURI={dollarSignIconURI} {...props} />
  );
};

export default IconDollarSign;
