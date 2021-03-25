/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { heartIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconHeart = (props: IIconProps) => {
  return <BaseIcon iconSlug={"heart"} svgURI={heartIconURI} {...props} />;
};

export default IconHeart;
