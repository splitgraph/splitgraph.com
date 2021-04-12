/** @jsxImportSource @emotion/react */

import { allIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconAll = (props: IIconProps) => {
  return <BaseIcon iconSlug={"all"} svgURI={allIconURI} {...props} />;
};

export default IconAll;
