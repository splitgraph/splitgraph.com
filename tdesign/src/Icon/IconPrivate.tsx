import { privateIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconPrivate = (props: IIconProps) => {
  return <BaseIcon iconSlug={"private"} svgURI={privateIconURI} {...props} />;
};

export default IconPrivate;
