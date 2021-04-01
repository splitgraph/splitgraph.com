/** @jsxImportSource theme-ui */
// @ts-ignore

import { linkIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconLink = (props: IIconProps) => {
  return <BaseIcon iconSlug={"link"} svgURI={linkIconURI} {...props} />;
};

export default IconLink;
