/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx, Text } from "theme-ui";

import { keyIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconKey = (props: IIconProps) => {
  return <BaseIcon iconSlug={"key"} svgURI={keyIconURI} {...props} />;
};

export default IconKey;
