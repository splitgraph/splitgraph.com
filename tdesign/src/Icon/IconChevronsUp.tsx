/** @jsxImportSource theme-ui */
// @ts-ignore

import { chevronsUpIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronsUp = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"chevronsUp"} svgURI={chevronsUpIconURI} {...props} />
  );
};

export default IconChevronsUp;
