/** @jsxImportSource theme-ui */
// @ts-ignore

import { closeIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconClose = (props: IIconProps) => {
  return <BaseIcon iconSlug={"close"} svgURI={closeIconURI} {...props} />;
};

export default IconClose;
