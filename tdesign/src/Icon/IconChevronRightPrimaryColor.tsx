/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { chevronRightPrimaryColorIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronRightPrimaryColor = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"chevronRightPrimaryColor"}
      svgURI={chevronRightPrimaryColorIconURI}
      {...props}
    />
  );
};

export default IconChevronRightPrimaryColor;
