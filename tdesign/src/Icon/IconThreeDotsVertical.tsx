/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { threeDotsVerticalIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconThreeDotsVertical = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"threeDotsVertical"}
      svgURI={threeDotsVerticalIconURI}
      {...props}
    />
  );
};

export default IconThreeDotsVertical;
