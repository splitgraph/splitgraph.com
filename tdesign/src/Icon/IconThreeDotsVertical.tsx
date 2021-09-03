import { threeDotsVerticalIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconThreeDotsVertical = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"threeDotsVertical"}
      svgURI={threeDotsVerticalIconURI}
      {...props}
    />
  );
};

export default IconThreeDotsVertical;
