/** @jsxImportSource theme-ui */
// @ts-ignore

import { checkIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconCheck = (props: IIconProps) => {
  return <BaseIcon iconSlug={"check"} svgURI={checkIconURI} {...props} />;
};

export default IconCheck;
