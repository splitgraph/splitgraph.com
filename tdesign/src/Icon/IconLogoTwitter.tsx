/** @jsxImportSource theme-ui */
// @ts-ignore

import { logoTwitterIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconLogoTwitter = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"logoTwitter"} svgURI={logoTwitterIconURI} {...props} />
  );
};

export default IconLogoTwitter;
