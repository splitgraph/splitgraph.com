/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { chevronsLeftIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronsLeft = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"chevronsLeft"}
      svgURI={chevronsLeftIconURI}
      {...props}
    />
  );
};

export default IconChevronsLeft;
