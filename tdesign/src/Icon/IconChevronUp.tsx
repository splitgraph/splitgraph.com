import { chevronUpIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronUp = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"chevronUp"} svgURI={chevronUpIconURI} {...props} />
  );
};

export default IconChevronUp;
