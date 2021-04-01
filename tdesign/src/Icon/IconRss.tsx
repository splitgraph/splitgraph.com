/** @jsxImportSource theme-ui */
// @ts-ignore

import { rssIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconRss = (props: IIconProps) => {
  return <BaseIcon iconSlug={"rss"} svgURI={rssIconURI} {...props} />;
};

export default IconRss;
