/** @jsxImportSource theme-ui */
// @ts-ignore

import { gearIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconGear = (props: IIconProps) => {
  return <BaseIcon iconSlug={"gear"} svgURI={gearIconURI} {...props} />;
};

export default IconGear;
