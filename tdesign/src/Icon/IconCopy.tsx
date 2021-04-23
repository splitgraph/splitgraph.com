import { copyIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconCopy = (props: IIconProps) => {
  return <BaseIcon iconSlug={"copy"} svgURI={copyIconURI} {...props} />;
};

export default IconCopy;
