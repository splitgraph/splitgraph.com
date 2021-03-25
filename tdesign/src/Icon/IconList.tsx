/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { listIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconList = (props: IIconProps) => {
  return <BaseIcon iconSlug={"list"} svgURI={listIconURI} {...props} />;
};

export default IconList;
