/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { gitMergeIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconGitMerge = (props: IIconProps) => {
  return <BaseIcon iconSlug={"gitMerge"} svgURI={gitMergeIconURI} {...props} />;
};

export default IconGitMerge;
