/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { userIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconUser = (props: IIconProps) => {
  return <BaseIcon iconSlug={"user"} svgURI={userIconURI} {...props} />;
};

export default IconUser;
