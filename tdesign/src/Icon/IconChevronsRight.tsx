/** @jsxImportSource theme-ui */
// @ts-ignore

import { chevronsRightIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronsRight = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"chevronsRight"}
      svgURI={chevronsRightIconURI}
      {...props}
    />
  );
};

export default IconChevronsRight;
