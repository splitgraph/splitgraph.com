/** @jsxImportSource theme-ui */
// @ts-ignore

import { heartIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconHeart = (props: IIconProps) => {
  return <BaseIcon iconSlug={"heart"} svgURI={heartIconURI} {...props} />;
};

export default IconHeart;
