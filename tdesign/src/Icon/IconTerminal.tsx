/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { terminalIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconTerminal = (props: IIconProps) => {
  return <BaseIcon iconSlug={"terminal"} svgURI={terminalIconURI} {...props} />;
};

export default IconTerminal;
