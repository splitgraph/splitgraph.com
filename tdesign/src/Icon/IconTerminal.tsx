import { terminalIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconTerminal = (props: IIconProps) => {
  return <BaseIcon iconSlug={"terminal"} svgURI={terminalIconURI} {...props} />;
};

export default IconTerminal;
