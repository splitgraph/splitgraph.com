/** @jsxImportSource theme-ui */
// @ts-ignore

import { logoDiscordIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconLogoDiscord = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"logoDiscord"} svgURI={logoDiscordIconURI} {...props} />
  );
};

export default IconLogoDiscord;
