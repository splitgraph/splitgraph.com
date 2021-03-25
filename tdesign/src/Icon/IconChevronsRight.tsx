/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

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
