/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { userIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconUser = (props: IIconProps) => {
  return <BaseIcon iconSlug={"user"} svgURI={userIconURI} {...props} />;
};

export default IconUser;
