/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { composeImagesIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconComposeImages = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"composeImages"}
      svgURI={composeImagesIconURI}
      {...props}
    />
  );
};

export default IconComposeImages;
