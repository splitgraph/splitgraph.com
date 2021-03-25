/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { chevronRightIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronRight = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"chevronRight"}
      svgURI={chevronRightIconURI}
      {...props}
    />
  );
};

export default IconChevronRight;
