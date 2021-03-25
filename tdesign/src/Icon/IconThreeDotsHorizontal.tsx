/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { threeDotsHorizontalIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconThreeDotsHorizontal = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"threeDotsHorizontal"}
      svgURI={threeDotsHorizontalIconURI}
      {...props}
    />
  );
};

export default IconThreeDotsHorizontal;
