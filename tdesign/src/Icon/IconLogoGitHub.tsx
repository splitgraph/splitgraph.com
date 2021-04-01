/** @jsxImportSource theme-ui */
// @ts-ignore

import { logoGitHubIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconLogoGitHub = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"logoGitHub"} svgURI={logoGitHubIconURI} {...props} />
  );
};

export default IconLogoGitHub;
