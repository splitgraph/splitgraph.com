import { chevronRightPrimaryColorIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconChevronRightPrimaryColor = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"chevronRightPrimaryColor"}
      svgURI={chevronRightPrimaryColorIconURI}
      {...props}
    />
  );
};

export default IconChevronRightPrimaryColor;
