/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { shieldIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconShield = (props: IIconProps) => {
  return <BaseIcon iconSlug={"shield"} svgURI={shieldIconURI} {...props} />;
};

export default IconShield;
