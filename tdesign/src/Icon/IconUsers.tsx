/** @jsxImportSource theme-ui */
// @ts-ignore

import { usersIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconUsers = (props: IIconProps) => {
  return <BaseIcon iconSlug={"users"} svgURI={usersIconURI} {...props} />;
};

export default IconUsers;
