/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { clipboardIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconClipboard = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"clipboard"} svgURI={clipboardIconURI} {...props} />
  );
};

export default IconClipboard;
