/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { chevronLeftPrimaryColorIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronLeftPrimaryColor = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"chevronLeftPrimaryColor"}
      svgURI={chevronLeftPrimaryColorIconURI}
      {...props}
    />
  );
};

export default IconChevronLeftPrimaryColor;
