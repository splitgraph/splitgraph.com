/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { activityIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconActivity = (props: IIconProps) => {
  return <BaseIcon iconSlug={"activity"} svgURI={activityIconURI} {...props} />;
};

export default IconActivity;
