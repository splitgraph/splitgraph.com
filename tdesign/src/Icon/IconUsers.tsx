/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { usersIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconUsers = (props: IIconProps) => {
  return <BaseIcon iconSlug={"users"} svgURI={usersIconURI} {...props} />;
};

export default IconUsers;
