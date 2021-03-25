/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { emailIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconEmail = (props: IIconProps) => {
  return <BaseIcon iconSlug={"email"} svgURI={emailIconURI} {...props} />;
};

export default IconEmail;
