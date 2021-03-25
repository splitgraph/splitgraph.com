/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { linkIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconLink = (props: IIconProps) => {
  return <BaseIcon iconSlug={"link"} svgURI={linkIconURI} {...props} />;
};

export default IconLink;
