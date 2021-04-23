import { chevronUpIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronup = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"chevronUp"} svgURI={chevronUpIconURI} {...props} />
  );
};

export default IconChevronup;
