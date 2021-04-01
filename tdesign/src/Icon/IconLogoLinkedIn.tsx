/** @jsxImportSource theme-ui */
// @ts-ignore

import { logoLinkedInIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconLogoLinkedIn = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"logoLinkedIn"}
      svgURI={logoLinkedInIconURI}
      {...props}
    />
  );
};

export default IconLogoLinkedIn;
