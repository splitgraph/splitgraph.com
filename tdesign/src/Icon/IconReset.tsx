import { resetIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconReset = (props: IIconProps) => {
  return <BaseIcon iconSlug={"reset"} svgURI={resetIconURI} {...props} />;
};

export default IconReset;
