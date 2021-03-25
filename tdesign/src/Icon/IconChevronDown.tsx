/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { chevronDownIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronDown = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"chevronDown"} svgURI={chevronDownIconURI} {...props} />
  );
};

export default IconChevronDown;
