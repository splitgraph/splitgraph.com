/** @jsxImportSource theme-ui */
// @ts-ignore

import { chevronsDownIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronsDown = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"chevronsDown"}
      svgURI={chevronsDownIconURI}
      {...props}
    />
  );
};

export default IconChevronsDown;
