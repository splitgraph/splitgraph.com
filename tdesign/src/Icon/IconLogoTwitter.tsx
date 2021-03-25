/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { logoTwitterIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconLogoTwitter = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"logoTwitter"} svgURI={logoTwitterIconURI} {...props} />
  );
};

export default IconLogoTwitter;
