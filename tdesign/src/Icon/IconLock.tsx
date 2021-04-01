/** @jsxImportSource theme-ui */
// @ts-ignore

import { lockIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconLock = (props: IIconProps) => {
  return <BaseIcon iconSlug={"lock"} svgURI={lockIconURI} {...props} />;
};

export default IconLock;
