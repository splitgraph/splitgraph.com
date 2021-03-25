/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { helpCircleIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconHelpCircle = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"helpCircle"} svgURI={helpCircleIconURI} {...props} />
  );
};

export default IconHelpCircle;
