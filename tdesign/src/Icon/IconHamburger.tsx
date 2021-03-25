/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { hamburgerIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconHamburger = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"hamburger"} svgURI={hamburgerIconURI} {...props} />
  );
};

export default IconHamburger;
